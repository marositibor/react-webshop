const express = require('express')
const sqlite3 = require('sqlite3').verbose();
const db = new sqlite3.Database(':memory:');


const cors = require('cors')

const app = express()
const port = 3050

app.use(cors())
app.set('json spaces', 2)
app.use(express.static('public'));

app.get('/products/:id', (req, res) =>{
    const {id} = req.params
    db.get("SELECT * from product WHERE rowId=?",id,(err,row)=>{
        setTimeout(()=>{res.json(row)},1000)
    })    
})

app.get('/products', (req, res) =>{
    db.all("SELECT rowId as id, name,shortSpecs,image,qty from product",(err,rows)=>{
        setTimeout(()=>{res.json(rows)},1000)
    })
})

db.serialize(function() {
    db.run("CREATE TABLE product (name TEXT,shortSpecs TEXT, image TEXT,qty INTEGER, price INTEGER,specs TEXT)");
   
    db.run(`INSERT INTO product (name,shortSpecs,image,qty,price,specs) VALUES ('Telefon','gyors 8gb rozsaszin','http://localhost:3050/img/telefon',10,999,'{"szélesség":"6 cm","hosszúság" : "10 cm","vastagság" : "2 cm","kamera megapixel" :"10","belső memória mérete" : "8 GB","processzor" : "gyors"}')`);
    db.run(`INSERT INTO product (name,shortSpecs,image,qty,price,specs) VALUES ('Laptop','i5 8gb rozsaszin','http://localhost:3050/img/laptop',20,1999,'{"szélesség":"20 cm","hosszúság" : "10 cm","vastagság" : "3 cm","processzor" :"i5","RAM" : "8 GB","Háttértár" : "1 TB"}')`);
  });
app.listen(port, () => console.log(`Webshop backend listening at http://localhost:${port}`))

