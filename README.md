# Stockaccino

## Installer le projet

Cloner le projet: `clone https://github.com/levydanqc/stockApp.git stockaccino`

Entrer dans le dossier du projet: `cd stockaccino`

Installer toutes les dépendances: `npm install`

Lancer l'application: `npm start`

## Ajout des tokens et clées uniques

Le backend nécéssite deux tokens uniques et un URI pour fonctionner:

1. Entrer dans le dossier du projet: `cd back-end`

2. Ajout de l'url de connection à MongoDB:

``` language=bash
dotnet user-secrets set "StockaccinoDatabase:ConnectionString" "mongodb://[username]:[password]@[ip]:[port]/[bdName]"
```

3. Ajout de la clé de l'API de [Yahoo Finance](https://www.yahoofinanceapi.com/):

``` language=bash
dotnet user-secrets set "YahooApiKey" "[YahooApiKey]"
```

4. Ajout du token secret de JWT ([Generator](https://www.grc.com/passwords.htm)):

``` language=bash
dotnet user-secrets set "Secret" "[Secret]"
```
