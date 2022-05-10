using Stockaccino.Models;
using Stockaccino.Services;
using Microsoft.AspNetCore.Mvc;
using System.Security.Claims;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Authorization;

namespace Stockaccino.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;
    private readonly IConfiguration _configuration;

    public UsersController(UsersService usersService, IConfiguration configuration)
    {
        _usersService = usersService;
        _configuration = configuration;
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenDto>> Login(UserDto pUser)
    {
        User? user = await _usersService.GetAsync(pUser.Email, pUser.Password);
        if (user == null)
            return NoContent();
        return CreateToken(user);
    }

    [Authorize]
    [HttpGet("userId")]
    public ActionResult<string> GetUserId()
    {
        string id = User?.Identity?.Name!;
        return Ok(id);
    }

    private TokenDto CreateToken(User user)
    {
        List<Claim> claims = new List<Claim>
        {
            new Claim(ClaimTypes.Email, user.Email!),
            new Claim(ClaimTypes.Name, user.Id!)
        };

        var key = new SymmetricSecurityKey(System.Text.Encoding.UTF8.GetBytes(
            _configuration.GetSection("Secret").Value));

        var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);

        var token = new JwtSecurityToken(
            claims: claims,
            expires: DateTime.Now.AddDays(1),
            signingCredentials: cred
            );

        var jwt = new JwtSecurityTokenHandler().WriteToken(token);
        TokenDto tokenDto = new TokenDto { Token = jwt };
        return tokenDto;
    }

    [Authorize]
    [HttpGet]
    public async Task<List<User>> Get()
    {
        return await _usersService.GetAsync();
    }

    [HttpGet("{email}")]
    public async Task<ActionResult<User>> Get(string email)
    {
        User? user = await _usersService.GetAsync(email);

        if (user is null)
        {
            return NoContent();
        }

        return user;
    }

    [HttpGet("verify/{email}")]
    public async Task<ActionResult<User>> Get(string email, [FromHeader] string password)
    {
        User? user = await _usersService.GetAsync(email, password);

        if (user is null)
        {
            return NoContent();
        }

        return user;
    }

    [Authorize]
    [HttpGet("findById")]
    public async Task<ActionResult<User>> GetById()
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null)
        {
            return NoContent();
        }

        return user;
    }

    [HttpPost]
    public async Task<IActionResult> Post(User newUser)
    {
        await _usersService.CreateAsync(newUser);

        return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
    }

    [Authorize]
    [HttpPut("update")]
    public async Task<IActionResult> Update(User updatedUser)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null)
        {
            return NoContent();
        }

        updatedUser.Id = user.Id;

        await _usersService.UpdateAsync(User?.Identity?.Name!, updatedUser);

        if (updatedUser.Email != user.Email)
        {
            foreach (string ami in user.Amis)
            {
                User? uAmi = await _usersService.GetAsync(ami);
                if (uAmi!.Amis.Contains(user.Email))
                {
                    List<string> amis = uAmi.Amis.ToList();
                    amis.Remove(user.Email);
                    amis.Add(updatedUser.Email);
                    uAmi.Amis = amis.ToArray();
                    await _usersService.UpdateAsync(uAmi.Id!, uAmi);
                }
            }
        }

        return NoContent();
    }

    [Authorize]
    [HttpPut("watch/{symbol}")]
    public async Task<IActionResult> WatchStock(string symbol)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null) return NoContent();

        if (!user.Stocks.Contains(symbol))
        {
            List<string> watchlist = user.Stocks.ToList();
            watchlist.Add(symbol);
            user.Stocks = watchlist.ToArray();
        }
        await _usersService.UpdateAsync(User?.Identity?.Name!, user);

        return NoContent();
    }

    [Authorize]
    [HttpPut("unwatch/{symbol}")]
    public async Task<IActionResult> RemoveStock(string symbol)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null) return NoContent();

        if (user.Stocks.Contains(symbol))
        {
            List<string> watchlist = user.Stocks.ToList();
            watchlist.Remove(symbol);
            user.Stocks = watchlist.ToArray();
        }
        await _usersService.UpdateAsync(User?.Identity?.Name!, user);

        return NoContent();
    }

    [Authorize]
    [HttpPut("sendRequest/{receiverEmail}")]
    public async Task<IActionResult> SendRequest(string receiverEmail)
    {
        User? sendingUser = await _usersService.GetAsyncById(User?.Identity?.Name!);
        User? receivingUser = await _usersService.GetAsync(receiverEmail);

        if (sendingUser is null || receivingUser is null) return NoContent();

        if (sendingUser.Email == receiverEmail) return NoContent();

        if (receivingUser.Requetes.Contains(sendingUser.Email) || receivingUser.Amis.Contains(sendingUser.Email)) return NoContent();

        List<string> requestList = receivingUser.Requetes.ToList();
        requestList.Add(sendingUser.Email);
        receivingUser.Requetes = requestList.ToArray();

        await _usersService.UpdateAsync(receivingUser.Id!, receivingUser);

        return NoContent();
    }

    [Authorize]
    [HttpPut("accept/{requestEmail}")]
    public async Task<IActionResult> AcceptRequest(string requestEmail)
    {
        User? receivingUser = await _usersService.GetAsyncById(User?.Identity?.Name!);
        User? requestingUser = await _usersService.GetAsync(requestEmail);

        if (requestingUser is null || receivingUser is null) return NoContent();


        if (receivingUser.Amis.Contains(requestEmail) || requestingUser.Amis.Contains(receivingUser.Email)) return NoContent();

        List<string> friendList = receivingUser.Amis.ToList();
        friendList.Add(requestEmail);
        receivingUser.Amis = friendList.ToArray();

        friendList = requestingUser.Amis.ToList();
        friendList.Add(receivingUser.Email);
        requestingUser.Amis = friendList.ToArray();

        if (requestingUser.Requetes.Contains(receivingUser.Email))
        {
            List<string> requestList = requestingUser.Requetes.ToList();
            requestList.Remove(receivingUser.Email);
            requestingUser.Requetes = requestList.ToArray();
        }

        List<string> requestListReceiver = receivingUser.Requetes.ToList();
        requestListReceiver.Remove(requestEmail);
        receivingUser.Requetes = requestListReceiver.ToArray();

        await _usersService.UpdateAsync(User?.Identity?.Name!, receivingUser);
        await _usersService.UpdateAsync(requestingUser.Id!, requestingUser);

        return NoContent();
    }

    [Authorize]
    [HttpPut("refuse/{requestEmail}")]
    public async Task<IActionResult> RefuseRequest(string requestEmail)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null) return NoContent();

        List<string> requestList = user.Requetes.ToList();
        requestList.Remove(requestEmail);
        user.Requetes = requestList.ToArray();

        await _usersService.UpdateAsync(User?.Identity?.Name!, user);

        return NoContent();
    }

    [Authorize]
    [HttpPut("removeFriend/{email}")]
    public async Task<IActionResult> RemoveFriend(string email)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);
        User? removedFriend = await _usersService.GetAsync(email);

        if (user is null || removedFriend is null) return NoContent();

        List<string> amis = user.Amis.ToList();
        amis.Remove(email);
        user.Amis = amis.ToArray();

        amis = removedFriend.Amis.ToList();
        amis.Remove(user.Email);
        removedFriend.Amis = amis.ToArray();

        await _usersService.UpdateAsync(User?.Identity?.Name!, user);
        await _usersService.UpdateAsync(removedFriend.Id!, removedFriend);

        return NoContent();
    }

    [Authorize]
    [HttpPost("notification/notify/{email}")]
    public async Task<IActionResult> Notify(string email, Notification notification)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);
        User? target = await _usersService.GetAsync(email);

        if (user is null || target is null) return NoContent();

        if (!user.Amis.Contains(email) || !target.Amis.Contains(user.Email)) return Unauthorized();

        if (target.Notifications.Contains(notification)) return Ok();

        target.Notifications.Add(notification);

        await _usersService.UpdateAsync(target.Id!, target);

        return Ok();
    }


    [Authorize]
    [HttpPut("notification/update")]
    public async Task<IActionResult> UpdateNotification(Notification notification)
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null) return NoContent();

        user.Notifications.ForEach(x => { if (x.Message == notification.Message) x.Read = notification.Read; });

        await _usersService.UpdateAsync(user.Id!, user);

        return Ok();
    }

    [Authorize]
    [HttpDelete("delete")]
    public async Task<IActionResult> Delete()
    {
        User? user = await _usersService.GetAsyncById(User?.Identity?.Name!);

        if (user is null)
        {
            return NoContent();
        }

        foreach (string ami in user.Amis)
        {
            User? uAmi = await _usersService.GetAsync(ami);
            if (uAmi!.Amis.Contains(user.Email))
            {
                List<string> amis = uAmi.Amis.ToList();
                amis.Remove(user.Email);
                uAmi.Amis = amis.ToArray();
                await _usersService.UpdateAsync(uAmi.Id!, uAmi);
            }
        }

        await _usersService.RemoveAsync(User?.Identity?.Name!);

        return NoContent();
    }
}
