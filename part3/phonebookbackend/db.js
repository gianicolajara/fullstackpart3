const mongoose = require('mongoose')

mongoose
  .connect(process.env.MONGODB_URI)
  .then((res) => console.log('connected to mongodb'))
  .catch((err) => console.error('error connecting to mongodb:', err.message))
