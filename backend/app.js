const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');

const cors = require('cors')

const app = express()
const port = 3050

app.use(cors())
app.set('json spaces', 2)
app.use(express.static('public'))

app.get('/products/:id', (req, res) =>{
    const {id} = req.params
    db.get("SELECT * from product WHERE rowId=?",id,(err,row)=>{
        setTimeout(()=>{res.json(row)},1000)
    })    
})

app.get('/products', (req, res) =>{
    db.all("SELECT * from product",(err,rows)=>{
        setTimeout(()=>{res.json(rows)},1000)
    })
})

db.serialize(function() {
    db.run("CREATE TABLE product (name TEXT,shortSpecs TEXT, image TEXT,qty INTEGER, url TEXT)");
   
    db.run("INSERT INTO product (name,shortSpecs,image,qty,url) VALUES ('Cipofuzo','30 cm rozsaszin','http://localhost:3050/img/shoelaces.jpg',10,'http://localhost:3050/products/1')");
    db.run("INSERT INTO product (name,shortSpecs,image,qty,url) VALUES ('Vonalzo','30 cm rozsaszin','http://localhost:3050/img/ruler.jpg',20,'http://localhost:3050/products/2')");
    db.run("INSERT INTO product (name,shortSpecs,image,qty,url) VALUES ('USB kabel','30 cm rozsaszin','http://localhost:3050/img/usb.jpg',20000,'http://localhost:3050/products/3')");
    db.run("INSERT INTO product (name,shortSpecs,image,qty,url) VALUES ('Televizio','30 cm rozsaszin','http://localhost:3050/img/tv.webp',0,'http://localhost:3050/products/4')");
  });
app.listen(port, () => console.log(`Webshop backend listening at http://localhost:${port}`))