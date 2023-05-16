import fs from "fs";
 
export default class ProductManager {
    constructor() { 
        this.patch = "./productos.json"; 
        this.products = []; 
        this.id = 0;   
    };

    createId(){
		return ++this.id;
	};

    addProduct = async ( title, description, price, thumbnail, code, stock)=> {  
       let newproducts= { id: this.createId() , title, description, price, thumbnail, code, stock };
       this.products.push(newproducts) // guardo el objeto en array vacio.
       const productsString = JSON.stringify(this.products);  // guardo en formato string
       await fs.promises.writeFile(this.patch, productsString); // guardo en archivo.JSON
    };

    

    readProducts= async ()=> {
      let resp = await fs.promises.readFile (this.patch, "utf-8");
      return JSON.parse(resp);
    };

    getProducts = async () => {
        const productsFile = await fs.promises.readFile (this.patch, "utf-8");
        const prodRead = JSON.parse(productsFile); // paso el string en formato objeto.
        console.log(prodRead)
    }; 

    getProductById = async(id)=> {
        const productsFile = await fs.promises.readFile(this.patch, "utf-8");  
        const prodRead = JSON.parse(productsFile);
       
        const searching = prodRead.find(prod => prod.id === id); // en busca de UN ID.
        searching??console.log("Not found");  // si no lo encuentra , respuesta no encontrado. Uso ternario.      
    };  

    deleteProduct = async(id) => {
        const productsFile = await fs.promises.readFile(this.patch, "utf-8");  // busco en el archivo
        const prodRead = JSON.parse(productsFile); // parseo
        let filtering= prodRead.filter(prodF => prodF.id != id);  // filtro el id que tengo como parametro par aeliminarlo
       
        const productsString = JSON.stringify(filtering); // lo vuelvo a guardar en formato string.
        await fs.promises.writeFile(this.patch, productsString); // guardo en archivo.JSON sin el id que filtre.
        console.log ( "removed product"); // devuelvo un mesaje que indica que el producto fue eliminado.
    };

    
    updateProduct = async (id) => {
       const productsFile = await fs.promises.readFile(this.patch, "utf-8");  
       const prodRead = JSON.parse(productsFile);
       let searchingf = prodRead.find(prod => prod.id === id);

       const DB= {id:3,title:"blue jean",description:"T. ML",price:8500,thumbnail:"thumbnail 3",code:"abc126",stock:60};

       if(searchingf){
        this.deleteProduct(id);
        } else{console.log("not filtering")}

       await fs.promises.readFile(this.patch, "utf-8");  
       await fs.promises.appendFile(this.patch, JSON.stringify(DB));
    };
};
