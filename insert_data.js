const mongo = require("mongodb");
const MongoClient = mongo.MongoClient

async function processDB() {
    const url = "mongodb://127.0.0.1:27017";
    const client = new MongoClient(url);

    try {
        await client.connect();
        
        const db = client.db("schooldbtest");
        let collection = db.collection("students");

        await collection.insertOne( { name : "Asia", email : "asia@onet.pl" });

        const students = [
            {name : "Arek", email: "arek@onet.pl"},
            {name : "Jan", email: "jan@onet.pl"},
        ];

        const options = { ordered: true } ;

        const result = await collection.insertMany(students,options);
        console.log(`${result.insertedCount} students were saved`);
        
               

    } catch (error) {
        console.error(error);
    } finally {
        await client.close(); 
    }
}

//start
processDB();