// identificador para cada usuario puede hacer ciertas cosas

import { Schema, model } from 'mongoose'

export const ROLES = ["user", "admin", "moderator"]

const roleSchema = new Schema({
  name: String
},
  {
    versionKey: false //para que no añada __v
  }
);

//se exporta el modelo
export default model('Role', roleSchema);