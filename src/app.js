import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productM = new ProductManager();
const readProductos= productM.readProducts();


app.get("/productos", async (req, res) => { 
  let all= await readProductos; // me trae de la class productManager todos los productos
  return res.json({
    status: "200",
    msg: "todos lo productos encontrados",
    data: all,
    });
  });
 
app.get("/productos/:id", async (req, res) => {
  let id =parseInt(req.params.id);  //uso el parseInt para trasformarlo en numero.
  let all= await readProductos;
  
  let getProductById = all.find(prod => prod.id === id); // me trae de la class productManager el id que quiero
  return res.json({
    status: "200",
    msg: "Id encontrado",
    data: getProductById,
    });
  });
 
app.get("*", (req, res) => {
  return res.status(404).json({
    status: "error",
    msg: "error esa ruta no existe",
    data: {},
    });
  });
  
app.listen(8080, () => {
    console.log("Example app listening on port", 8080);
  });