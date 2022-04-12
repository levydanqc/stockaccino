using Stockaccino.Models;
using Stockaccino.Services;
using Microsoft.AspNetCore.Mvc;

namespace Stockaccino.Controllers;

[ApiController]
[Route("[controller]")]
public class UsersController : ControllerBase
{
    private readonly UsersService _usersService;

    public UsersController(UsersService usersService) =>
        _usersService = usersService;

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

    [HttpGet("findById/{id:length(24)}")]
    public async Task<ActionResult<User>> GetById(string id)
    {
        User? user = await _usersService.GetAsyncById(id);

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

    [HttpPut("{id:length(24)}")]
    public async Task<IActionResult> Update(string id, User updatedUser)
    {
        User? user = await _usersService.GetAsyncById(id);

        if (user is null)
        {
            return NoContent();
        }

        updatedUser.Id = user.Id;

        await _usersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }


    [HttpPut("watch/{symbol}")]
    public async Task<IActionResult> WatchStock([FromBody] string id, string symbol)
    {
        User? user = await _usersService.GetAsyncById(id);

        if (user is null) return NoContent();

        if (!user.Stocks.Contains(symbol))
        {
            List<string> watchlist = user.Stocks.ToList();
            watchlist.Add(symbol);
            user.Stocks = watchlist.ToArray();
        }
        await _usersService.UpdateAsync(id, user);

        return NoContent();
    }

    [HttpPut("unwatch/{symbol}")]
    public async Task<IActionResult> RemoveStock([FromBody] string id, string symbol)
    {
        User? user = await _usersService.GetAsyncById(id);

        if (user is null) return NoContent();

        if (user.Stocks.Contains(symbol))
        {
            List<string> watchlist = user.Stocks.ToList();
            watchlist.Remove(symbol);
            user.Stocks = watchlist.ToArray();
        }
        await _usersService.UpdateAsync(id, user);

        return NoContent();
    }

    [HttpPut("sendRequest/{receiverEmail}")]
    public async Task<IActionResult> SendRequest([FromBody] string id, string receiverEmail)
    {
        User? sendingUser = await _usersService.GetAsyncById(id);
        User? receivingUser = await _usersService.GetAsync(receiverEmail);

        if (sendingUser is null || receivingUser is null) return NoContent();

        if (sendingUser.Email == receiverEmail) return NoContent();

        if (receivingUser.Requetes.Contains(sendingUser.Email) || receivingUser.Amis.Contains(sendingUser.Email)) return NoContent();
        
        List<string> requestList = receivingUser.Requetes.ToList();
        requestList.Add(sendingUser.Email);
        receivingUser.Requetes = requestList.ToArray();

        await _usersService.UpdateAsync(receivingUser.Id, receivingUser);

        return NoContent();
    }

    [HttpPut("accept/{requestEmail}")]
    public async Task<IActionResult> AcceptRequest([FromBody] string id, string requestEmail)
    {
        User? receivingUser = await _usersService.GetAsyncById(id);
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

        await _usersService.UpdateAsync(id, receivingUser);
        await _usersService.UpdateAsync(requestingUser.Id, requestingUser);

        return NoContent();
    }

    [HttpPut("refuse/{requestEmail}")]
    public async Task<IActionResult> RefuseRequest([FromBody] string id, string requestEmail)
    {
        User? user = await _usersService.GetAsyncById(id);

        if (user is null) return NoContent();

        List<string> requestList = user.Requetes.ToList();
        requestList.Remove(requestEmail);
        user.Requetes = requestList.ToArray();

        await _usersService.UpdateAsync(id, user);

        return NoContent();
    }

    [HttpPut("removeFriend/{email}")]
    public async Task<IActionResult> RemoveFriend([FromBody] string id, string email)
    {
        User? user = await _usersService.GetAsyncById(id);
        User? removedFriend = await _usersService.GetAsync(email);

        if (user is null || removedFriend is null) return NoContent();

        List<string> amis = user.Amis.ToList();
        amis.Remove(email);
        user.Amis = amis.ToArray();

        amis = removedFriend.Amis.ToList();
        amis.Remove(user.Email);
        removedFriend.Amis = amis.ToArray();

        await _usersService.UpdateAsync(id, user);
        await _usersService.UpdateAsync(removedFriend.Id, removedFriend);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        User? user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NoContent();
        }

        await _usersService.RemoveAsync(id);

        return NoContent();
    }
}
