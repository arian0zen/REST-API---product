const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');

const app = express();

app.set('view engine', 'ejs');


app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(express.static("public"));

mongoose.connect("mongodb://localhost:27017/products_papayaDB");

const productSchema = {
    title: String,
    id: Number,
    description: String,
    price: Number,
    imageURL: String

}

const Product = mongoose.model("Product", productSchema);

app.get('/', (req, res) => {
    res.render("home");
});


app.get('/add', (req, res) => {
    res.render("add");
});


app.get("/showproducts", (req, res) => {
    Product.find((err, product)=>{
        if(err){
            console.log("Product not found", err);
        } else{
            console.log(product);
            res.json(product);
        }
    })
} );

app.post("/products", (req, res) =>{
    const newProduct = new Product({
        title: req.body.productName,
        id:  req.body.productId,
        description: req.body.productDesc,
        price: req.body.productPrice,
        imageURL: "image.png"
    });

    newProduct.save((err)=>{
        if(err){
            console.log(err);
            res.json({
                response_code: 400,
                status: "Bad Request",
                message: "Adding product failed"
            })
        } else{
            console.log(req.body.productName);
            res.json({
                response_code: 201,
                status: "Created",
                message: "Products added successfully."
            })
        }
    });
});



app.listen(80, () => {
    console.log("listening on port 80");
  });
  