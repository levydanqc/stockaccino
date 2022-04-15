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
        {"chart", "v6/finance/recommendationsbysymbol" }
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
        catch (Exception)
        {
            return ReloadApiKey();
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
        catch (Exception)
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
        Console.WriteLine("Limit Exceeded. Refreshing Api Key...");
        //_client.GetAsync("https://api.danlevy.ca/webhook/reloadyahooapikey");
        var psi = new ProcessStartInfo();
        psi.FileName = "/bin/bash";
        psi.Arguments = "/Users/danlevy/scripts/kill";
        psi.RedirectStandardOutput = true;
        psi.UseShellExecute = false;
        psi.CreateNoWindow = true;

        using var process = Process.Start(psi);

        return "reached limit";
    }
}
