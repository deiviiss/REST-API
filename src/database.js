import monsoose from 'mongoose'

//* Crea la base de datos en localhost
monsoose.connect("mongodb://localhost/companydb", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: true,
  useCreateIndex: true
})
  .then(db => console.log('MongooDb is connected'))
  .catch(err => console.log(err))

