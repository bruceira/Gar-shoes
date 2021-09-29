const mongoose = require("mongoose")
const slugify = require("slugify")
const validator = require("validator")




const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must have name of shoes ']
  },
  category: {
    type: String,
    required: [true, "must have the category "]
  },
  price: { type: Number, required: [true, "mush have price"] },
  color: { type: String },
  addedAt: { type: Date, default: new Date() },
  slug: { type: String, required: true, unique: true }
})


productSchema.pre("validate", function (next) {
  if (this.name) {
    this.slug = slugify(this.name, { lower: true, strict: true })
  }
  next()
})

module.exports = mongoose.model("PRODUCTS", productSchema)
