using Stockaccino.Models;
using Stockaccino.Services;

var builder = WebApplication.CreateBuilder(args);

builder.Configuration.AddEnvironmentVariables();

// Add services to the container.
builder.Services.Configure<UserDatabaseSettings>(
    builder.Configuration.GetSection("StockaccinoDatabase"));

builder.Services.Configure<RouteOptions>(options => options.LowercaseUrls = true);

builder.Services.AddSingleton<UsersService>();
YahooService yahooService = new YahooService(builder.Configuration.GetSection("YahooApiKey").Value);
builder.Services.AddSingleton<YahooService>(yahooService);


builder.Services.AddControllers()
    .AddJsonOptions(options => options.JsonSerializerOptions.PropertyNamingPolicy = null);
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();


var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}


app.UseAuthentication();
app.UseAuthorization();

app.UseCors(options => options.AllowAnyOrigin()
    .AllowAnyHeader()
    .AllowAnyMethod()
);


app.MapControllers();

app.Run();
