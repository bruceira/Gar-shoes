const express = require('express');
const fs = require('fs');
const path = require('path');
const PRODUCTS = require("../model/productModel")

const router = express.Router();


router.get("/new", (req, res) => {
  res.render("new", { product: new PRODUCTS() })
})

router.get("/:slug", async (req, res) => {

  const product = await PRODUCTS.findOne({ slug: req.params.slug })



  res.render("show", { product })
})


router.post("/", async (req, res) => {
  let product = new PRODUCTS({
    name: req.body.name,
    category: req.body.category,
    price: req.body.price
  })

  try {
    product = await product.save()
    res.redirect(`/shoes/${product.slug}`)
  } catch (error) {
    res.render("shoes/new", { product })
  }

})

// const dataShoes = JSON.parse(fs.readFileSync(path.join(__dirname, '../data/shoes.json')))


// //get all shoes
// router.get("/api/v1/shoes", (req, res) => {
//   res.status(200).json({ status: "success", results: dataShoes.length, data: { dataShoes } })
// })

// //get one shoes
// router.get("/api/v1/shoes/:id", (req, res) => {
//   const newId = req.params.id * 1

//   const newItem = dataShoes.find(el => el.id === newId)

//   if (!newItem) {
//     res.status(404).json({ status: "fail", message: "shoes not found" })
//   }
//   res.status(200).json({ status: "Succes", data: { newItem } })
// })

// // add new shoes

// router.post("/api/v1/shoes", (req, res) => {

//   const newId = dataShoes[dataShoes.length - 1].id + 1
//   const newItem = Object.assign({ id: newId }, req.body)
//   dataShoes.push(newItem)

//   fs.writeFile(`${__dirname}/../data/shoes.json`, JSON.stringify(dataShoes), err => {

//     res.status(201).json({ status: "success", data: { newItem } })
//   })


// })


// // delete the shoes


// router.delete("/api/v1/shoes/:id", (req, res) => {
//   const newItem = dataShoes.find(shoes => shoes.id === req.params.id * 1)

//   if (!newItem) {
//     res.status(404).json({ status: "fail", message: "shoes not found" })
//   }
//   const fNewShoes = dataShoes.map(shoes => {
//     if (shoes.id === req.params.id * 1) {
//       return null
//     } else {
//       return shoes
//     }
//   }).filter(shoes => shoes !== null)

//   fs.writeFile(`${__dirname}/../data/shoes.json`, JSON.stringify(fNewShoes), err => {

//     res.status(200).end()
//   })


// })




module.exports = router;