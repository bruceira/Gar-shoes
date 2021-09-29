const express = require("express")
const fs = require("fs")
const logger = require("morgan")
const path = require("path")
const itemRoutes = require("./routes/itemRoutes.js")
const mongoose = require("mongoose")
const PRODUCT = require("./model/productModel")
const methodOverride = require("method-override")




mongoose.connect("mongodb://localhost/garShoes", { useNewUrlParser: true }, console.log("db connected"))





const app = express()
const PORT = process.env.PORT || 5001


app.use(express.urlencoded({ extended: false }))
app.use(methodOverride("_method"))
app.set('port', PORT)
app.set("view engine", 'ejs')

//middleware
app.use(logger("tiny"))
app.use("/shoes", require(path.join(__dirname, "./routes/itemRoutes")))



app.get("/", async (req, res) => {
  const products = await PRODUCT.find().sort({ name: "asc" })
  res.render("index", { products })
})
app.use((req, res, next) => {
  const err = new Error(`${req.method} ${req.url} Not Found`);
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  res.json({
    error: {
      message: err.message,
    },
  });
});




app.listen(PORT)