const express = require('express')
const dotenv = require('dotenv').config()
const bodyParser = require('body-parser')
const connectDB = require('./config/db')
const { errorHandler } = require('./middleware/errorMiddleware')
const cors = require('cors')

connectDB()
const port = process.env.PORT || 5000

const app = express()
// middleware
app.use(express.urlencoded({ extended: false }))
app.use(express.json()) 
app.use(errorHandler)
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);


app.use('/api/users', require('./routes/userRoutes'))
app.use('/api/products', require('./routes/productRoutes'))

app.listen(port, () => {
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${port}`)
})

