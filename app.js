const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose = require('mongoose');
const _ = require('lodash');
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


// get route endpoints

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
            res.json(product);
        }
    })
} );


app.get("/showproducts/:title", (req, res)=>{
    const customTitle = _.capitalize(req.params.title);
    Product.findOne({title: customTitle}, (err, foundItem)=>{
        if(!err){
            if(!foundItem){
                res.json({
                    statusCode: 404,
                    message: "Not found"

                })
            } else{
                res.json(foundItem)
            }
        } else{
            console.log(err)
        }
    })
})


// post route endpoints

app.post("/products", (req, res) =>{
    const newProduct = new Product({
        title: _.capitalize(req.body.productName),
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

            res.json({
                response_code: 201,
                status: "Created",
                message: "Products added successfully."
            })
        }
    });
});


const PORT = process.env.PORT || 80;
app.listen(PORT, () => {
    console.log("listening on port 80");
  });