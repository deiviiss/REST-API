import express from 'express'
import morgan from 'morgan'
import pkg from '../package.json'
import productsRoutes from './routes/products.routes'
import authRoutes from './routes/auth.routes'
import usersRoutes from './routes/user.routes'
import { createRoles } from './libs/initialSetup'

const app = express()
createRoles()

app.set('pkg', pkg)

app.use(express.json())
app.use(morgan('dev')); // muestra peticiones al server

// Route inicial API
app.get('/', (req, resp) => {
  resp.json({
    name: app.get('pkg').name,
    author: app.get('pkg').author,
    description: app.get('pkg').description,
    version: app.get('pkg').version
  })
})

//Routes
app.use('/api/products', productsRoutes) //valor 1 precede a la ruta
app.use('/api/auth', authRoutes) //valor 1 precede a la ruta
app.use('/api/users', usersRoutes)

export default app;