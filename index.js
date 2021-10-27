const express = require('express')
require('dotenv').config()
const { MongoClient } = require('mongodb');
const  cors = require('cors')
const app = express()
const port = process.env.PORT || 2000

const mongoUser = process.env.DB_USER
const mongoPass = process.env.DB_PASS

app.use(cors());
app.use(express.json());

//  MongoDb User : topu2252
//  MongoDb Pass : MOVMFiRceVJyPciX

const uri = `mongodb+srv://${mongoUser}:${mongoPass}@cluster0.n33rv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true });



async function run() {
    try {
        await client.connect();
        
        const database = client.db('volunteer_network');
        const volunteerCollection = database.collection('volunteer');
        
        //  Create Documents insert
        const doc = {
      title: "First Volunteer",
      content: "No bytes, no problem. Just insert a document, in MongoDB",
        }

        const result = await volunteerCollection.insertOne(doc);
        console.log(`A document was inserted with the _id: ${result.insertedId}`);

        console.log("Mongo db connected");


    }
    finally {
    //   await  client.close();
    }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})