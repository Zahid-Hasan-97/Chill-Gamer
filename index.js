const express = require('express')
const cors = require('cors')
const { MongoClient, ServerApiVersion } = require('mongodb');
const app = express()

const port = process.env.PORT || 5000



const uri = "mongodb+srv://chill-gamer:zcnYuJDTO5nq7lJQ@assignment.wnlkn.mongodb.net/?retryWrites=true&w=majority&appName=Assignment";

const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

//chill-gamer
//zcnYuJDTO5nq7lJQ

//middleware

app.use(express.json())
app.use(cors())


async function Main(){
    try{
        console.log(" Pinged your deployment. you successfully connected to Mongo DB!")
    }
    catch(error){
        console.log(error)
    }

}

Main()

app.get('/',(req, res)=>{
    res.send('hello')
})

app.listen(port, () =>{
    console.log("server running....")
})
