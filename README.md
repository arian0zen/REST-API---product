# Documentation
# Introduction
Two API endpoints, one shows us all the available products in the database in a json format and another one lets use send a post request mentioning all the products details to add new products to the database
- Also at the end I have explained the possible UI I made for the use case of this API

two API endpoints are:\
  `for get products`
```http
GET //localhost/showproducts
```
```http
GET //localhost/showproducts/${productTitle}
```
  `for add products`
  ```http
POST //localhost/products
```
## The GET request endpoints
The first GET request is `//localhost/showproducts`

This request end points returns and renders an array of json containing `all the products` currently available in the server database `mongodb`
- Here is how a get all products request can be made
![image](https://user-images.githubusercontent.com/68517592/188076138-57c2a44a-312f-4b42-9454-c4cb2844aa81.png)

The second GET request is `//localhost/showproducts/${productTitle}`

This request endpoint is a bit specific, if I am an user wants to see the `only one specific product` of my choice, I tap into the url mentioning the product I want to see.\
for that I need to replace `${productTitle}` with the actual title I am looking for, for example if I am looking for the `laptop` product in the database, I need to send `GET` request to

```http
GET //localhost/showproducts/laptop
```
- Here is an example how can this be done
![image](https://user-images.githubusercontent.com/68517592/188077129-6c441b40-2e5a-421a-b135-e0cb3f72bf8b.png)

Here is `JavaSript` request format for the get all products method

```javascript
fetch("http://localhost/showproducts")
  .then(response => data.json())
  .then(result => console.log(result))
  .catch(error => console.log('error', error));
```

## The POST request endpoint
The only POST request is `//localhost/products` , method `POST` obviously

This request usually can receive data from any `html` form using `body-parser` but for the post request to work without any `html` we have to pass its query (the product details) as json raw object. here is how the raw body json looks like for the post request
```JSON
{
  "productName":"Text Book",
  "productId": 6,
  "productDesc": "Class vi text book, author maheswata devi",
  "productPrice": 199
}
```
suppose I want to add the `Text Book` product to the database through the pose request, I need to pass the details like that.
- Here is a detailed example using `postman`
![image](https://user-images.githubusercontent.com/68517592/188079551-0dcdb845-4def-424d-8a5b-9db144db1b21.png)
- A new product will be added to the database, so after that when we show all products we can find that one there too..
![image](https://user-images.githubusercontent.com/68517592/188079045-6fa57206-e4cb-4697-9b50-fb088aa8616b.png)

## Status Codes

API-products returns the following status codes in its API:

| Status Code | Description |
| :--- | :--- |
| 201 | `CREATED` |
| 400 | `BAD REQUEST` |
| 404 | `NOT FOUND` |

## THE UI for this, though the end points will work as fine without the interface
- home route, you get both the option\
![Screenshot (432)](https://user-images.githubusercontent.com/68517592/188080293-14f23999-2dcc-4b16-a5ea-a6ae3f2de1d5.png)
- in the add add product page you get a form to add the products using the `html form` and then the details goes through  `body-parser` and gets added to the database

![Screenshot (433)](https://user-images.githubusercontent.com/68517592/188080721-ee7dd424-3dd4-4ab9-9f22-db473d4f7281.png)

## here is a video how all the things work using UI
https://user-images.githubusercontent.com/68517592/188080998-1c20c9fa-b8a0-499f-a929-a7aadd66d9dd.mp4

## The mongodb view
![image](https://user-images.githubusercontent.com/68517592/188081765-399c5857-4499-4a51-80c7-8d2b1c226e06.png)


