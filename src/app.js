import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productM = new ProductManager()

const getProducts= productM.getProducts()

console.log(await getProducts)

//const port = 8080;


