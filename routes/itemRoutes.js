const express = require('express');
const path = require('path');
const PRODUCTS = require("../model/productModel")

const router = express.Router();

// GET ALL PRODUCTS
router.get("/new", (req, res) => {
  res.render("new", { product: new PRODUCTS() })
})

// GET  ONE PRODUCT
router.get("/:slug", async (req, res) => {
  const product = await PRODUCTS.findOne({ slug: req.params.slug })
  res.render("show", { product })
})

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {
  await PRODUCTS.findByIdAndDelete(req.params.id)
  res.redirect("/")
})

// ADD PRODUCTS
router.post("/", async (req, res, next) => {
  req.product = await new PRODUCTS()
  next()
}, saveProduct("new"))

// UPDATE PRODUCT
router.put("/:id", async (req, res, next) => {
  req.product = await PRODUCTS.findById(req.params.id)
  next()
}, saveProduct("edit"))

router.get("/edit/:id", async (req, res) => {
  const product = await PRODUCTS.findById(req.params.id)
  res.render("edit", { product })
})



function saveProduct(path) {
  return async (req, res) => {
    let product = req.product
    product.name = req.body.name
    product.category = req.body.category
    product.price = req.body.price
    product.color = req.body.color

    try {
      product = await product.save()
      res.redirect(`/shoes/${product.slug}`)
    } catch (error) {
      res.render(`shoes/${path}`, { product })
    }
  }

}

module.exports = router;