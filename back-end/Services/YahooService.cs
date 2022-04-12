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
        } catch (Exception)
        {
            return ReloadApiKey();
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
        catch (Exception)
        {
            return ReloadApiKey();
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
        catch (Exception)
        {
            return ReloadApiKey();
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
        catch (Exception)
        {
            return ReloadApiKey();
        }
    }

    public string ReloadApiKey()
    {
        _client.GetAsync("https://api.danlevy.ca/webhook/reloadyahooapikey");
        return "";
    }
}
