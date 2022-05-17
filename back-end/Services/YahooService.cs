using System.Diagnostics;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;

namespace Stockaccino.Services;

public class YahooService
{
    private readonly string _baseUrl = "https://yfapi.net/";
    private HttpClient _client = new HttpClient();

    private readonly Dictionary<string, string> _endPoints =
        new Dictionary<string, string>() {
        {"trending", "v1/finance/trending/US"},
        {"autocomplete", "v6/finance/autocomplete"},
        {"quote", "v6/finance/quote"},
        {"suggestion", "ws/screeners/v1/finance/screener/predefined/saved"},
        {"chart", "v8/finance/chart/" }
        };

    public YahooService(string apiKey)
    {
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _client.DefaultRequestHeaders.Add("x-api-key", apiKey);
    }

    public async Task<string> GetTrending()
    {
        try
        {
            return await _client.GetStringAsync(_baseUrl + _endPoints["trending"]);
        }
        catch
        {
            throw new Exception();
        }
    }

    public async Task<string> GetScreeners(string screener)
    {
        var query = new Dictionary<string, string?>
        {
            ["count"] = "25",
            ["scrIds"] = screener,
        };

        try
        {
            return await _client.GetStringAsync(QueryHelpers.AddQueryString(_baseUrl + _endPoints["suggestion"], query));
        }
        catch
        {
            throw new Exception();
        }
    }

    internal async Task<string> GetAutocomplete(string input)
    {
        var query = new Dictionary<string, string?>
        {
            ["region"] = "CA",
            ["lang"] = "fr",
            ["query"] = input,
        };
        try
        {
            return await _client.GetStringAsync(QueryHelpers.AddQueryString(_baseUrl + _endPoints["autocomplete"], query));
        }
        catch
        {
            throw new Exception();
        }
    }

    public async Task<string> GetQuote(string symbol)
    {
        var query = new Dictionary<string, string?>
        {
            ["region"] = "CA",
            ["lang"] = "fr",
            ["symbols"] = symbol,
        };


        try
        {
            return await _client.GetStringAsync(QueryHelpers.AddQueryString(_baseUrl + _endPoints["quote"], query));
        }
        catch
        {
            throw new Exception();
        }
    }

    public async Task<string> GetQuote(string[] symbols)
    {
        try
        {
            return await GetQuote(string.Join(",", symbols));
        }
        catch
        {
            throw new Exception();
        }
    }

    public async Task<string> GetChart(string symbol, string range, string interval)
    {
        var query = new Dictionary<string, string?>
        {
            ["region"] = "CA",
            ["lang"] = "fr",
            ["range"] = range,
            ["interval"] = interval,
        };

        try
        {
            return await _client.GetStringAsync(QueryHelpers.AddQueryString(_baseUrl + _endPoints["chart"] + symbol, query));
        }
        catch
        {
            throw new Exception();
        }
    }
}
