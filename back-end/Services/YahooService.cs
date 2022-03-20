using Stockaccino.Models;
using Microsoft.Extensions.Options;
using MongoDB.Driver;
using System.Net.Http.Headers;
using Microsoft.AspNetCore.WebUtilities;

namespace Stockaccino.Services;

public class YahooService
{
    private readonly string _baseUrl = "https://yfapi.net/";
    private HttpClient _client = new HttpClient();

    private readonly Dictionary<string, string> _endPoints =
        new Dictionary<string, string>() {
        {"trending", "v1/finance/trending/CA"},
        {"autocomplete", "v6/finance/autocomplete"},
        {"quote", "v6/finance/quote"}
        };

    public YahooService(string apiKey)
    {
        _client.DefaultRequestHeaders.Accept.Add(new MediaTypeWithQualityHeaderValue("application/json"));
        _client.DefaultRequestHeaders.Add("x-api-key", apiKey);
    }

    public async Task<string> GetTrending()
    {
        return await _client.GetStringAsync(_baseUrl + _endPoints["trending"]);
    }

    internal async Task<string> GetAutocomplete(string input)
    {
        //region=US&lang=en&query=apple
        var query = new Dictionary<string, string?>
        {
            ["region"] = "CA",
            ["lang"] = "fr",
            ["query"] = input,
        };

        return await _client.GetStringAsync(QueryHelpers.AddQueryString(_baseUrl + _endPoints["autocomplete"], query));
    }

    public async Task<string> GetQuote(string[] symbols)
    {
        string uri = _baseUrl + _endPoints["quote"];
        string url = QueryHelpers.AddQueryString(uri, "symbols", String.Join(",", symbols));
        url = QueryHelpers.AddQueryString(url, "lang", "en");
        url = QueryHelpers.AddQueryString(url, "region", "CA");

        return await _client.GetStringAsync(url);
    }

}
