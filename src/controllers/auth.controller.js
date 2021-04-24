// import userSchema from '../models/User'
import User from '../models/User';
import jwt from 'jsonwebtoken'
import config from '../config'
import Role from '../models/Role';

export const signUp = async (req, res) => {

  const { username, email, password, roles } = req.body

  const newUser = new User({
    username,
    email,
    password: await User.encryptPassword(password)
  })

  if (roles) {
    const foundRoles = await Role.find({ name: { $in: roles } }) //busca si existen roles
    newUser.roles = foundRoles.map(role => role._id)
  } else {
    const role = await Role.findOne({ name: "user" }) //si no existe asigna el role user, findOne busca un solo usuario
    newUser.roles = [role._id];
  }

  const savedUser = await newUser.save();

  const token = jwt.sign({ id: savedUser._id }, config.SECRET, {
    expiresIn: 86400//24hrs
  })

  console.log(newUser);

  res.status(200).json({ token })
}

export const signIn = async (req, res) => {

  const userFound = await User.findOne({ email: req.body.email }).populate("roles");//método populate puebla el modelo roles

  if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })

  const matchPassword = await User.comparePassword(req.body.password, userFound.password)

  if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })

  const token = jwt.sign({ id: userFound._id }, config.SECRET, {
    expiresIn: 86400
  })

  console.log(userFound);

  res.json({ token: token })
};


