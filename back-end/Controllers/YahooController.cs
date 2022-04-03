using Microsoft.AspNetCore.Mvc;
using Stockaccino.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Stockaccino.Models;
using System.Collections.Generic;

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
    public async Task<IActionResult> GetStockChart(string symbol)
    {
        string[] ranges = new string[] { "10y", "1m", "5d" };
        string[] intervals = new string[] { "1d", "5m", "1m" };
        List<Stock> stocks = new List<Stock>();

        for (int i = 0; i < ranges.Length; i++)
        {
            string raw = await _yahooService.GetChart(symbol, ranges[i], intervals[i]);
            JObject? jObject = JsonConvert.DeserializeObject<JObject>(raw);

            if (jObject!["chart"]!["error"]!.HasValues)
                return NoContent();

            for (int j = 0; j < ((JArray)jObject["chart"]!["result"]![0]!["timestamp"]!).Count; j++)
            {
                if (jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["high"]![j] == null ||
                    jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["low"]![j] == null ||
                    jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["close"]![j] == null ||
                    jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["open"]![j] == null ||
                    jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["volume"]![j] == null ||
                    jObject!["chart"]!["result"]![0]!["timestamp"]![j] == null)
                    continue;

                DateTime datetime = DateTimeOffset.FromUnixTimeSeconds(Convert.ToInt64(
                    jObject!["chart"]!["result"]![0]!["timestamp"]![j])).LocalDateTime;
                stocks.Add(new Stock(
                    Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["high"]![j]),
                    Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["low"]![j]),
                    Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["close"]![j]),
                    Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["open"]![j]),
                    Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["volume"]![j]),
                    datetime
                    ));
            }
        }

        return Ok(stocks.OrderBy(o => o.Date).ToList());
    }
}
