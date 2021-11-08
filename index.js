const express = require('express')
const { MongoClient } = require('mongodb');
require('dotenv').config();
const cors = require('cors')

const app = express();
const port = process.env.PORT || 5000;

// cors middleware
app.use(cors());
app.use(express.json());

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.wtex8.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;

const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });

async function run(){
    try{
        await client.connect();
        const database = client.db("carMechanic");
        const serviceCarMechanic = database.collection("services");

        app.post('/add-service', async(req, res)=>{
            const result = await serviceCarMechanic.insertOne(req.body)
            res.send(result)
        })

        app.get('/service', async(req, res)=>{
            const result = await serviceCarMechanic.find({}).toArray();
            res.json(result);
        })
    }
    finally{
        // await client.close();
    }
}
run().catch(console.dir)

app.get('/', (req, res)=>{
    res.send('Running the server')
})

app.listen(port, ()=>{
    console.log('Running server at ', port)
})