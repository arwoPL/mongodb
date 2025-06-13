const mongo = require("mongodb");
const MongoClient = mongo.MongoClient;

async function carsTask() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {

        await client.connect();

        const db = client.db("trainingdb");
        let collection = db.collection("cars");

        await collection.insertOne(
            {
                brand : "Ford",
                name : "Mondeo",
                color : "blue"
            }
        );

        await collection.insertOne(
            {
                brand : "Opel",
                name:"Astra",
                color: "silver"
            }
        );

        const carstable = [
            { brand : "Renault", name : "Laguna", color : "grey"},
            { brand : "VW", name : "Golf", color : "brown"}
        ];

        const options = { ordered: true } ;

        const result = await collection.insertMany(carstable);

        console.log(`${result.insertedCount} samochodow wstawiono do bazy`);
        

        
    } catch (err){
        console.log(err);
        
    }finally {
        await client.close();
    }


}

carsTask()