import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productM = new ProductManager();
const readProductos= productM.readProducts();

app.get("/productos", async (req, res) => { 
 return res.json(await readProductos);
  });
 /*  
 app.get("/productos/:id", (req, res) => {
  const id = req.params.id;
  const producto = productos.find((p) => p.id == id);
  if (producto) {
    return res.status(200).json({
      status: "success",
      msg: "producto encontrado con exito",
      data: producto,
    });
  } else {
    return res.status(400).json({
      status: "error",
      msg: "no se encontro el producto",
      data: {},
    });
  }
});
 */

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