import express from "express";
import ProductManager from "./ProductManager.js";

const app = express();
app.use(express.urlencoded({ extended: true }));

const productM = new ProductManager()




const port = 8080;

app.get("/Products", async (req, res) => {
    res.send( productM.getProducts());
    
  });
 

  app.get("*", (req, res) => {
    return res.status(404).json({
      status: "error",
      msg: "error esa ruta no existe",
      data: {},
    });
  });
  
  
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
  });