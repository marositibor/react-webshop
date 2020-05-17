const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database('./wsdb');

module.exports = class Product{
    constructor({sku,name,price,description,specs,stock,warning_at}={}){
        this.name = name;
        this.price = price;
        this.description = description;
        this.specs = specs;
        this.stock = stock;
        this.warning_at = warning_at
        this.sku = sku ? sku : this.generateSKU();
    }

    generateSKU(){
        const words = this.name.split(" ");
        let sku = "";
        words.forEach(word =>{
            sku += word[0]
        })
        return sku;
     }

     validateProduct(){
         const validationErrors = {};

        if(this.sku.length > 12){
            validationErrors["SKU"] = "must be maximum 12 characters"
        }

        if(!this.name){
            validationErrors["Name"] = "cannot be empty"
        }

        if(!this.price){
            validationErrors["Price"] = "cannot be empty"
        }

        if(isNaN(this.price)){
            validationErrors["Price"] = "must be a number"
        }

        if(this.description.length > 240){
            validationErrors["Description"] = "must be maximum 240 characters"
        }

        if( Object.keys(validationErrors).length === 0){
            return false
        }
        return validationErrors
     }

     lookupSKU(){
        return new Promise((resolve,reject) =>{
            db.get("SElECT * FROM product WHERE sku = ?",this.sku,(err,row)=>{
                if(err){
                     reject(err)
                    }
                resolve(row)
            })
        })
     }

     persist(){
        return new Promise((resolve,reject) =>{
            db.run(`INSERT INTO product (sku,name,price,description,specs,stock,warning_at) VALUES(?,?,?,?,?,?,?)`,[this.sku,this.name,this.price,this.description,this.specs,this.stock,this.warning_at],(err,row)=>{
                if(err){
                     reject(err)
                    }
                resolve(row)
            })
        })
     }

     updateExisting(){
        return new Promise((resolve,reject) =>{
            db.run("UPDATE product SET name = ?, description = ? , price = ? , specs= ?, stock = ?, warning_at = ? WHERE sku = ?",[this.name,this.description,this.price,this.specs,this.stock,this.warning_at,this.sku],(err,row)=>{
                if(err){
                     reject(err)
                    }
                resolve(row)
            })
        })
     }
}