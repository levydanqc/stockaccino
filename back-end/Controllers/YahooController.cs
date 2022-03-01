﻿using Microsoft.AspNetCore.Mvc;
using Stockaccino.Services;

namespace Stockaccino.Controllers;

[ApiController]
[Route("[controller]")]
public class YahooController : ControllerBase
{
    private readonly YahooService _yahooService;

    public YahooController(YahooService yahooService) =>
        _yahooService = yahooService;

    [HttpGet("/trending")]
    public async Task<string> Get()
    {
        return await _yahooService.GetTrending();
    }
}