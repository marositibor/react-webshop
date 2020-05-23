const express = require("express");
const sqlite3 = require("sqlite3").verbose();
const formidable = require("formidable");
const Product = require("./models/Product");

const fs = require("fs");

const db = new sqlite3.Database("./wsdb");

const cors = require("cors");

const app = express();
const port = 3050;

app.use(cors());
app.set("json spaces", 2);
app.use(express.static("uploads"));

app.get("/files", (req, res) => {
  db.all(
    "SELECT rowId as id,file,product_sku,is_primary FROM image",
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.get("/allproducts", (req, res) => {
  db.all("select * from product", (err, result) => res.json(result));
});

app.get("/products", (req, res) => {
  const selectFrom =
    "SELECT DISTINCT product.sku,product.price,product.name,product.stock,product.warning_at,product.description,product.specs,primaryImage.file as primary_image,allImages.images as images, group_concat(recommended.rec_sku) as recommended FROM product";
  const joinPrimary =
    " LEFT JOIN (SELECT file,product_sku FROM image where is_primary = 1 ) as primaryImage ON product.sku = primaryImage.product_sku";
  const joinImages =
    " LEFT JOIN (SELECT group_concat(file) as images,product_sku FROM image where is_primary = 0 GROUP BY product_sku ) as allImages ON product.sku = allImages.product_sku";
  const joinRecommended =
    " LEFT JOIN recommended ON product.sku = recommended.product_sku";
  const groupBy = " GROUP BY product.sku";

  const QUERY =
    selectFrom + joinPrimary + joinImages + joinRecommended + groupBy;

  db.all(QUERY, (err, rows) => {
    console.log(err);
    rows.forEach((row) => {
      if (row.images) {
        row.images = row.images.split(",");
      }
      if (row.recommended) {
        row.recommended = row.recommended.split(",");
      }
    });
    res.json(rows);
  });
});

app.put("/products/:sku", (req, res) => {
  const { sku } = req.params;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields) => {
    const newProduct = new Product({ sku, ...fields });
    if (newProduct.validateProduct()) {
      return res.json(newProduct.validateProduct());
    }
    await newProduct.updateExisting();
    return res.send("Product updated successfully");
  });
});

app.get("/products/:sku", (req, res) => {
  const { sku } = req.params;
  db.get("SELECT * FROM product WHERE sku = ?", sku, (err, row) => {
    res.json(row);
  });
});

app.get("/products/:sku/images", (req, res) => {
  const { sku } = req.params;
  db.all(
    "SELECT rowId as id,file,product_sku,is_primary FROM image WHERE product_sku = ?",
    sku,
    (err, rows) => {
      res.json(rows);
    }
  );
});

app.delete("/files/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT * FROM image where rowId = ?", id, (err, row) => {
    const filePath = "./uploads/" + row.file;
    const productSku = row.product_sku;
    fs.unlinkSync(filePath);
    db.run("DELETE from image where rowId = ?", id, (err, row) => {
      db.all(
        "SELECT rowId as id, is_primary FROM image WHERE product_sku = ?",
        productSku,
        (err, results) => {
          const primary = results.find((image) => image.is_primary === 1);
          if (!primary) {
            db.run(
              "UPDATE image SET is_primary = 1 WHERE rowId = ?",
              results[0].id
            );
          }
          return res.send("ok");
        }
      );
    });
  });
});

app.delete("/products/:sku", (req, res) => {
  const { sku } = req.params;
  db.all(
    "SELECT rowId as id, file FROM image WHERE product_sku = ?",
    sku,
    (err, results) => {
      results.forEach((image) => {
        const filePath = "./uploads/" + image.file;
        fs.unlinkSync(filePath);
        db.run("DELETE from image where rowId = ?", image.id, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  );
  db.run("DELETE from product where sku = ?", sku, (err) => {
    if (err) {
      console.log(err);
    }
    res.send("Product deleted");
  });
});

app.post("/products/:sku/files", (req, res) => {
  const { sku } = req.params;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    if (!Array.isArray(files.images)) {
      files.images = [files.images];
    }
    try {
      files.images.forEach(
        (
          f,
          index // beolvasott fájlok feldolgozása
        ) => {
          const fileName = `${sku}-${Math.floor(Math.random() * 100000)}.${
            f.name.split(".")[f.name.split(".").length - 1]
          }`;

          fs.rename(f.path, `./uploads/${fileName}`, (err) => console.log(err));

          db.run(
            `INSERT INTO image (file,product_sku,is_primary) VALUES(?,?,?)`,
            [fileName, sku, 0],
            (err, result) => {
              console.log(err);
            }
          );
        }
      );
      res.send("Image uploaded");
    } catch (e) {
      console.log(e.message);
      return res.send(e.message);
    }
  });
});

app.put("/files/:id", (req, res) => {
  const { id } = req.params;
  db.get("SELECT product_sku FROM image WHERE rowId = ?", id, (err, row) => {
    db.serialize(() => {
      db.run(
        "UPDATE image SET is_primary = 0 WHERE product_sku = ? AND is_primary = 1",
        row.product_sku
      );
      db.run("UPDATE image SET is_primary = 1 WHERE rowId = ?", id);
      res.send("ok");
    });
  });
});

app.post("/product", async (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    const product = new Product(fields);

    if (product.validateProduct()) {
      return res.json(product.validateProduct());
    }

    const existingProduct = await product.lookupSKU();
    if (existingProduct) {
      return res.send("product already exists");
    }

    if (!Array.isArray(files.images)) {
      files.images = [files.images];
      console.log(files.images);
    }

    try {
      files.images.forEach(
        (
          f,
          index // beolvasott fájlok feldolgozása
        ) => {
          const fileName = `${product.sku}-${index}.${
            f.name.split(".")[f.name.split(".").length - 1]
          }`;

          fs.rename(f.path, `./uploads/${fileName}`, (err) => console.log(err));

          db.run(
            `INSERT INTO image (file,product_sku,is_primary) VALUES(?,?,?)`,
            [fileName, product.sku, index ? 0 : 1],
            (err, result) => console.log(err)
          );
        }
      );
    } catch (e) {
      console.log(e.message);
      return res.send(e.message);
    }
    try {
      await product.persist();
    } catch (e) {
      console.log(e);
      return res.send(500, e);
    }
    return res.json({ product, files });
  });
});

app.post("/order", (req, res) => {
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields, files) => {
    console.log(fields);
    res.send(fields);
  });
});

app.post("/products/:sku/recommended", (req, res) => {
  const { sku } = req.params;
  const form = formidable({ multiples: true });
  form.parse(req, async (err, fields) => {
      console.log(fields.rec_sku)
    fields.rec_sku = fields.rec_sku.split(',')
      db.serialize(()=>{
          fields.rec_sku.map((rec_sku) => {
              db.run(
                  "INSERT OR IGNORE INTO recommended (product_sku,rec_sku) VALUES(?,?)",
                  [sku, rec_sku],
                  (err, result) => {
                    console.log(err);
                    if (err) {
                      res.sendStatus(500);
                      return;
                    }
                  }
                );
          });
          db.all(
            "SELECT * from product WHERE sku in (SELECT rec_sku FROM recommended WHERE product_sku = ?)",
            sku,
            (err, rows) => {
              console.log(err);
              if (err) {
                res.sendStatus(500);
                return;
              }
              res.json(rows);
              return;
            }
          );
      })
  });
});

app.get("/products/:sku/recommended", (req, res) => {
  const { sku } = req.params;
  db.all(
    "SELECT * from product WHERE sku in (SELECT rec_sku FROM recommended WHERE product_sku = ?)",
    sku,
    (err, rows) => {
      console.log(err);
      if (err) {
        res.sendStatus(500);
        return;
      }
      res.json(rows);
      return;
    }
  );
});

db.serialize(function () {
  db.run(
    "CREATE TABLE IF NOT EXISTS product (sku TEXT, name TEXT, price INTEGER, description TEXT, specs TEXT, stock INTEGER, warning_at INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS image (file TEXT,product_sku TEXT,is_primary INTEGER)"
  );
  db.run(
    "CREATE TABLE IF NOT EXISTS recommended (product_sku TEXT,rec_sku TEXT,UNIQUE(product_sku,rec_sku))"
  );
});

app.listen(port, () =>
  console.log(`Webshop backend listening at http://localhost:${port}`)
);
