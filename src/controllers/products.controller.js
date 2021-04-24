// Controller para crear, listar, eliminar producto

import Product from '../models/Products'

export const createProduct = async (req, res) => {
  const { name, category, price, imgURL } = req.body
  const newProduct = new Product({ name, category, price, imgURL });
  const productSave = await newProduct.save() // save es un método del modelo

  res.status(201).json(productSave)
  // res.json(productSave)
}

export const getProducts = async (req, res) => {
  const products = await Product.find(); //find es un método del modelo

  res.json(products)
}

export const getProductById = async (req, res) => {
  const product = await Product.findById(req.params.productId); //findById es un método del modelo

  res.status(200).json(product)
}

export const updateProductById = async (req, res) => {
  const updateProduct = await Product.findByIdAndUpdate(req.params.productId, req.body, { //findByIdAndUpdate es un método del modelo
    new: true // para que traiga los datos recien actualizados
  })

  res.status(200).json(updateProduct)
}

export const deleteProductById = async (req, res) => {
  const { productId } = req.params
  const deleteProduct = await Product.findByIdAndDelete(productId) //findByIdAndDelete es un método del modelo

  res.status(204).json()
}