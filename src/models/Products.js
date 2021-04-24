//modelo de productos

import { Schema, model, version } from 'mongoose'

const productSchema = new Schema({
  name: String,
  category: String,
  price: Number,
  imgUrl: String
}, {
  timestamps: true, //Guarda la fecha de creación y modificación
  versionKey: false//Para que no aparezca v__V al crear documentos
})

//se exporta el modelo
export default model('Product', productSchema);