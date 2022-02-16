const MONGO_URL =
    "mongodb://127.0.0.1:27017/stockaccino";

const BASE_URL = "http://yfapi.net";
const dynamic ROUTES = {
  "trending": "$BASE_URL/v1/finance/trending/CA",
  "autocomplete": "$BASE_URL/v6/finance/autocomplete",
  "recommendations": "$BASE_URL/v6/finance/recommendationsbysymbol",
  "details": "$BASE_URL/v6/finance/quote",
};
