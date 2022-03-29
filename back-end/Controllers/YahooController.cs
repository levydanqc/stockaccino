using Microsoft.AspNetCore.Mvc;
using Stockaccino.Services;
using Newtonsoft;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace Stockaccino.Controllers;

[ApiController]
[Route("[controller]")]
public class YahooController : ControllerBase
{
    private readonly YahooService _yahooService;

    public YahooController(YahooService yahooService) =>
        _yahooService = yahooService;

    [HttpGet("trending")]
    public async Task<string> Get()
    {
        return await _yahooService.GetTrending();
    }

    [HttpGet("autocomplete")]
    public async Task<string> Get(string input)
    {
        return await _yahooService.GetAutocomplete(input);
    }

    [HttpGet("search")]
    public async Task<string> GetSearchedStock(string input)
    {
        return await _yahooService.GetQuote(input);
    }

    [HttpGet("chart")]
    public async Task<IActionResult> GetStockChart(string symbol, string range, string interval)
    {
        string raw = await _yahooService.GetChart(symbol, range, interval);

        JObject? jObject = JsonConvert.DeserializeObject<JObject>(raw);

        return Ok();
    }
}
