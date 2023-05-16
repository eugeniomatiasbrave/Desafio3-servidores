import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productM = new ProductManager();
const readProducts= productM.readProducts();


app.get("/", async (req, res) => { 
  let all= await readProducts; // me trae de la class productManager todos los productos
  return res.json({
    status: "200",
    msg: "All products",
    data: all,
    });
  });
 
app.get("/products/:id", async (req, res) => {
  let id =parseInt(req.params.id);  

  let all= await readProducts;
  
  let getProductById = all.find(prod => prod.id === id); // me trae de la class productManager el id que quiero
  return res.json({
    status: "200",
    msg: "Id found",
    data: getProductById,
    });
  });

  app.get("/products", async (req, res) => {

    const price = parseInt(req.query.price);
    let all= await readProducts; // poner el metodo  de PRODUCTmNAGER...
    
    if (req.query && price) {
      const FilteredByPrice = all.filter(
        (p) => p.price == price
      );
      return res.json({
        status: "success",
        msg: "I pass all the products whose price = " + price,
        data: FilteredByPrice,
      });
    } else {
      return res.json({
        status: "success",
        msg: "I pass all the products",
        data: all,
      });
    }
  });
  
 
app.get("*", (req, res) => {
  return res.json({
    status: "error",
    msg: "error that route does not exist",
    data: {},
    });
  });
  
app.listen(8080, () => {
    console.log("Example app listening on port", 8080);
  });