# url-shortener-api
This is an API which gives an access to stored shortend URLs.

**Stack:** nodejs, express, [lowdb](https://www.npmjs.com/package/lowdb) as a database for simplicity.

## Install
```npm install```

## Start
```npm start```

## API

### Get data by short URL
#### Request
```GET /api/urls?shortUrl=http://short.url/wc41p```
#### Response
```
200 OK
{
   "originalUrl": "https://www.google.com/",
   "shortUrl": "http://short.url/wc41p",
   "statistic": ["date": "2022-06-16", "clicks": 7]
}
```

### Save new URL data
#### Request
```
POST /api/urls
{
   "originalUrl": "https://www.google.com/",
   "shortUrl": "http://short.url/wc41p",
   "statistic": []
}
```
#### Response
```
200 OK
{
   "originalUrl": "https://www.google.com/",
   "shortUrl": "http://short.url/wc41p",
   "statistic": []
}
```

### Update statistic in URL
#### Request
```
PUT /api/urls
{
   "shortUrl": "http://short.url/wc41p",
   "statistic": ["date": "2022-06-16", "clicks": 7]
}
```
#### Response
```
200 OK
{
   "originalUrl": "https://www.google.com/",
   "shortUrl": "http://short.url/wc41p",
   "statistic": ["date": "2022-06-16", "clicks": 7]
}
```

### Delete URL data
#### Request
```DELETE  /api/urls?shortUrl=http://short.url/wc41p```
#### Response
```200 OK```


