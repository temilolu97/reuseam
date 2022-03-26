const express = require("express");
const dotenv = require("dotenv").config();
const colors = require('colors')
const cors = require('cors')
const connectDB = require('./config/db')
const userRoutes = require("./routes/userRoutes")
const reusableRoutes = require('./routes/reusableRoutes')
const categoryRoutes = require('./routes/categoryRoutes')
const reuserRoutes = require('./routes/reuserRoutes')
const {errorHandler} = require("./middleware/errorMiddleware")
const swaggerUi = require('swagger-ui-express')
const swaggerJsDoc = require('swagger-jsdoc')
const morgan = require("morgan");
const port = process.env.PORT || 5000;

connectDB()
const options ={
    definition:{
        openapi:"3.0.0",
        info:{
            title:"Reuseam API",
            version:"1.0.0",
            description:"Reuseam API Endpoints"
        },
        servers:[
            {
                url:"http://localhost:5000"
            }
        ],
    },
    apis:["./routes/*.js"]
}

const specs = swaggerJsDoc(options)
const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs))
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
app.use(cors())
app.use(morgan("dev"))
app.get('/',(req,res)=>{
    return res.json({
        message:"This is reuseam"
    })
})
app.use('/api/user', userRoutes)
app.use('/api/reuser', reuserRoutes)
app.use('/api/reusables', reusableRoutes)
app.use('/api/categories', categoryRoutes)

app.use(errorHandler)

app.listen(port,()=> console.log(`Server started on port ${port}`));