const express=require('express')
const cors=require('cors')
const port=4500
const connect_mongodb=require('./DBconfiguration/DBconfiguration')

connect_mongodb()
const app=express()
app.use(express.json())
app.use(cors())

app.use('/products', require('./Routes/products.route'))
app.use('/category', require('./Routes/category.route'))
app.use('/users', require('./AuthJWT/login_register'))

app.listen(port, ()=>console.log(`Go on ${port}, Enjoy.`))