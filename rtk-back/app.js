const express = require('express')


const app = express()

const PORT = 8000
app.use(express.json())
app.use('/api/posts',require('./routers/router'))


app.listen(PORT,()=>{
    try{
     console.log('Server is working')
    }catch(e){
     console.log(e)
    }
})