using Stockaccino.Models;
using Stockaccino.Services;
using Microsoft.AspNetCore.Mvc;

namespace Stockaccino.Controllers;

[ApiController]
[Route("api/[controller]")]
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
            return NotFound();
        }

        return user;
    }

    [HttpGet("verify/{email}")]
    public async Task<ActionResult<User>> Get(string email,[FromHeader] string password)
    {
        User? user = await _usersService.GetAsync(email, password);

        if (user is null)
        {
            return NotFound();
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
        User? user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        updatedUser.Id = user.Id;

        await _usersService.UpdateAsync(id, updatedUser);

        return NoContent();
    }

    [HttpDelete("{id:length(24)}")]
    public async Task<IActionResult> Delete(string id)
    {
        User? user = await _usersService.GetAsync(id);

        if (user is null)
        {
            return NotFound();
        }

        await _usersService.RemoveAsync(id);

        return NoContent();
    }
}
