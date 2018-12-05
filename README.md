# Free Food In The Greater College Park Area

---

Name: Drew Jordan

Date: December 5th, 2018

Project Topic: Free Food In the Greater College Park Area

URL: https://drew-jordan-final-project.herokuapp.com/
 ---

### 1. Data Format and Storage

Data point fields:
- `Field 1`: name      `Type: String`
- `Field 2`: price     `Type: Number`
- `Field 3`: location  `Type: String`
- `Field 4`: items     `Type: [String]`
- `Field 5`: starts    `Type: String`
- `Field 6`: ends      `Type: String`
- `Field 7`: catch     `Type: String`
Schema:
```javascript
{
    name: String,
    price: Number,
    location: String,
    items: [String],
    starts: String,
    ends:  String,
    catch: String
}
```

### 2. Add New Data

HTML form route: `/api/create`

POST endpoint route: `/api/deal`

Example Node.js POST request to endpoint:
```javascript
var request = require("request");

var options = {
    method: 'POST',
    url: 'https://drew-jordan-final-project.herokuapp.com/api/deal',
    headers: {
        'content-type': 'application/x-www-form-urlencoded'
    },
    form: {
      name: "Pi Day Pizza",
      price: 3,
      location: "Blaze",
      items: ["Pizza", "Salad", "Dough Knots"],
      starts: "March 14th",
      ends:  "March 14th",
      catch: "Must be okay with waiting outside for an hour potentially in the snow"
    }
};

request(options, function (error, response, body) {
  if (error) throw new Error(error);

  console.log(body);
});
```

### 3. View Data

GET endpoint route: `/api/`

### 4. Search Data

Search Field: `name`
Search Field: `location`
Search Field: `starts`
Search Field: `price`

### 5. Navigation Pages

Navigation Filters
1. Home -> `/api`
2. Only Free -> `api/free`
3. Deals with no catch -> `/api/nocatch`
4. Deals with no time limit -> `/api/alwaysfree`
5. Deals that only last 1 day -> `/api/day`
