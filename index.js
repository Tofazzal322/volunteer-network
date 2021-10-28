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
      console.log("Mongo db connected");
      const database = client.db("volunteer_network");
      const volunteerCollection = database.collection("volunteer");

      app.get("/", (req, res) => {
        // const result = await volunteerCollection.insertOne(doc);
        // console.log(
        //   `A document was inserted with the _id: ${result.insertedId}`
        // );
      });

      app.get("/volunteer", async (req, res) => {
        const cursor = volunteerCollection.find({});
        const volunteer = await cursor.toArray();
        res.send(volunteer);
      });

      //  Get single Service
      app.get("/volunteer/:id", async(req, res) => {
        const id = req.params.id;
        const query = { _id: ObjectId(id) };
        const singleV = await volunteerCollection.findOne(query);
        res.json(singleV);
      });

      
      app.post("/addVolunteer", (req, res) => {
        console.log(req.body);
        volunteerCollection.insertOne(req.body).then((documents) => {
          res.send(documents.insertedId);
        });
      });

      

      app.put("/", (req, res) => {});

      app.delete("/", (req, res) => {});
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