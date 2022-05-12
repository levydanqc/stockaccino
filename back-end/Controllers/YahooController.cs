using Microsoft.AspNetCore.Mvc;
using Stockaccino.Services;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;
using Stockaccino.Models;

namespace Stockaccino.Controllers;

[ApiController]
[Route("[controller]")]
public class YahooController : ControllerBase
{
    private YahooService _yahooService;

    public YahooController(YahooService yahooService) =>
        _yahooService = yahooService;

    [HttpGet("trending")]
    public async Task<IActionResult> GetTrending()
    {
        string raw = await _yahooService.GetTrending();

        JObject? jObject = JsonConvert.DeserializeObject<JObject>(raw);

        if (jObject!["finance"]!["error"]!.HasValues)
            return NoContent();

        int nbResultat = ((JArray)jObject["finance"]!["result"]![0]!["quotes"]!).Count;

        Trending[] trendings = new Trending[nbResultat];

        string[][] symbols = new string[(nbResultat / 10) + (nbResultat % 10 == 0 ? 0 : 1)][];

        for (int i = 0; i < symbols.Length; i++)
        {
            symbols[i] = i == symbols.Length - 1 ? new string[nbResultat - (10 * i)] : new string[10];
            for (int j = 0; j < symbols[i].Length; j++)
            {
                symbols[i][j] = ((JArray)jObject["finance"]!["result"]![0]!["quotes"]!)[i * 10 + j]["symbol"]!.ToString();
            }
            JObject? quote = JsonConvert.DeserializeObject<JObject>(await _yahooService.GetQuote(symbols[i]));
            for (int j = 0; j < symbols[i].Length; j++)
            {
                trendings[i * 10 + j] = new Trending(symbols[i][j],
                Convert.ToDouble(quote!["quoteResponse"]!["result"]![j]!["regularMarketPrice"]!),
                Convert.ToDouble(quote!["quoteResponse"]!["result"]![j]!["regularMarketChangePercent"]!));
            }
        }

        return Ok(trendings.OrderBy(o => o.Change).ToList());
    }

    [HttpGet("suggestion")]
    public async Task<IActionResult> GetSuggestion([FromQuery] string screener)
    {
        string raw = await _yahooService.GetScreeners(screener);

        if (raw == "reached limit")
            return StatusCode(StatusCodes.Status429TooManyRequests);

        JObject? jObject = JsonConvert.DeserializeObject<JObject>(raw);

        if (jObject!["finance"]!["error"]!.HasValues)
            return NoContent();

        Screener suggestion = new Screener(
            jObject!["finance"]!["result"]![0]!["title"]!.ToString(),
            jObject!["finance"]!["result"]![0]!["description"]!.ToString().Replace("&#39;", "'"));

        for (int i = 0; i < Convert.ToDouble(jObject["finance"]!["result"]![0]!["count"]!); i++)
        {
            JToken? name = jObject!["finance"]!["result"]![0]!["quotes"]![i]!["displayName"];
            JToken? ask = jObject!["finance"]!["result"]![0]!["quotes"]![i]!["ask"];
            suggestion.Suggestions.Add(new Suggestion(
                name != null ? name.ToString() : jObject!["finance"]!["result"]![0]!["quotes"]![i]!["shortName"]!.ToString(),
                jObject!["finance"]!["result"]![0]!["quotes"]![i]!["symbol"]!.ToString(),
                Convert.ToDouble(jObject!["finance"]!["result"]![0]!["quotes"]![i]!["regularMarketChange"]!),
                Convert.ToDouble(jObject!["finance"]!["result"]![0]!["quotes"]![i]!["regularMarketChangePercent"]!),
                ask != null && ask.ToString() != "0" ?
                Convert.ToDouble(ask) :
                Convert.ToDouble(jObject!["finance"]!["result"]![0]!["quotes"]![i]!["regularMarketPrice"])
                ));
        }


        return Ok(suggestion);
    }

    [HttpGet("autocomplete")]
    public async Task<string> GetAutocomplete(string input)
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
        List<Stock> stocks = new();

        for (int i = 0; i < ranges.Length; i++)
        {
            string raw = await _yahooService.GetChart(symbol, ranges[i], intervals[i]);
            JObject? jObject = JsonConvert.DeserializeObject<JObject>(raw);

            if (jObject!["chart"]!["error"]!.HasValues)
                return NoContent();

            if (jObject["chart"]!["result"]![0]!["timestamp"] != null && jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!.HasValues)
            {
                for (int j = 0; j < ((JArray)jObject["chart"]!["result"]![0]!["timestamp"]!).Count; j++)
                {
                    if (jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["high"]![j] == null ||
                        jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["low"]![j] == null ||
                        jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["close"]![j] == null ||
                        jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["open"]![j] == null ||
                        jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["volume"]![j] == null ||
                        jObject!["chart"]!["result"]![0]!["timestamp"]![j] == null ||
                        string.IsNullOrWhiteSpace(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["high"]![j]!.ToString()) ||
                        string.IsNullOrWhiteSpace(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["low"]![j]!.ToString()) ||
                        string.IsNullOrWhiteSpace(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["close"]![j]!.ToString()) ||
                        string.IsNullOrWhiteSpace(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["open"]![j]!.ToString()) ||
                        string.IsNullOrWhiteSpace(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["volume"]![j]!.ToString()))
                        continue;

                    DateTime datetime = DateTimeOffset.FromUnixTimeSeconds(Convert.ToInt64(
                        jObject!["chart"]!["result"]![0]!["timestamp"]![j])).LocalDateTime;
                    stocks.Add(new Stock(
                        Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["high"]![j]),
                        Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["low"]![j]),
                        Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["close"]![j]),
                        Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["open"]![j]),
                        Convert.ToDouble(jObject!["chart"]!["result"]![0]!["indicators"]!["quote"]![0]!["volume"]![j]),
                        datetime));
                }
            }
        }

        return Ok(stocks.OrderBy(o => o.Date).ToList());
    }
}
