const express = require("express");
const dotenv = require("dotenv").config();
const colors = require('colors')
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const reusableRoutes = require('./routes/reusableRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const reuserRoutes = require('./routes/reuserRoutes')
const {errorHandler} = require("./middleware/errorMiddleware")
const swaggerUi = require('swagger-ui-express')
const swaggerDocument = require('../swagger.json');
const port = process.env.PORT || 5000;

connectDB()

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }))

app.use('/api/user', userRoutes)
app.use('/api/reuser', reuserRoutes)
app.use('/api/reusables', reusableRoutes)
app.use('/api/categories', categoryRoutes)

app.use(errorHandler)
app.use(
    '/api-docs',
    swaggerUi.serve, 
    swaggerUi.setup(swaggerDocument)
);
app.listen(port,()=> console.log(`Server started on port ${port}`));