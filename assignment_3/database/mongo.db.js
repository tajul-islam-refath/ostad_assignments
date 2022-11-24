// Import mongo client
const { MongoClient } = require("mongodb");

// db variable
let _db = null;
// connect to MongoDB
const connect = async () => {
  try {
    let dbName = "rifat";
    let dbPass = "rifat12345";
    const url = `mongodb+srv://${dbName}:${dbPass}@cluster0.ltldm.mongodb.net/assignment3?retryWrites=true&w=majority`;
    const client = new MongoClient(url, {
      useNewUrlParser: true,
    });

    console.log(`Connecting to MongoDB....`);
    await client.connect();
    _db = client.db("ostad");
    console.log(`Connecting to MongoDB Success`);
  } catch (err) {
    console.log("Database connection error");
  }
};

// get db
const getDb = () => {
  return _db;
};

module.exports = {
  connect,
  getDb,
};
