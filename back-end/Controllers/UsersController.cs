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

    [HttpGet("{email}")]
    public async Task<ActionResult> Get(string email)
    {
        User? user = await _usersService.GetAsync(email);

        if (user is null)
        {
            return Ok();
        }

        return NoContent();
    }

    [HttpGet("verify/{email}")]
    public async Task<ActionResult> VerifyCredentials(string email, [FromHeader] string password)
    {
        User? user = await _usersService.GetAsync(email, password);

        if (user is null)
        {
            return Unauthorized();
        }

        return Ok(new { id = user.Id });
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

        return CreatedAtAction(nameof(Post), new { id = newUser.Id });
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

        return Ok(new { id = updatedUser.Id });
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

        return Ok();
    }
}
