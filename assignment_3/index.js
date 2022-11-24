const http = require("http");
const { connect, getDb } = require("./database/mongo.db.js");

let _db = null;

const server = http.createServer();
const port = process.env.PORT || 8080;
server.listen(port, async function () {
  await connect();
  console.log("Server is running on port " + port);
  _db = getDb();
  // insertOne();
  // insertMany();
  // getAll();
  // getOneWithoutConditaion();
  // getOne();
  // getWithProjection();
  updateOne();
});

const insertMany = async () => {
  const Users = _db.collection("Users");
  let data = [
    {
      name: "Student tow",
      mobile: "123456789",
      batch: "mern2",
      enrollDate: new Date(),
    },
    {
      name: "Student 3",
      mobile: "123456789",
      batch: "mern2",
      enrollDate: new Date(),
    },
    {
      name: "Student 4",
      mobile: "123456789",
      batch: "mern1",
      enrollDate: new Date(),
    },
    {
      name: "Student 5",
      mobile: "123456789",
      batch: "mern1",
      enrollDate: new Date(),
    },
    {
      name: "Student 6",
      mobile: "123456789",
      batch: "mern1",
      enrollDate: new Date(),
    },
  ];

  try {
    let res = await Users.insertMany(data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const insertOne = async () => {
  const Users = _db.collection("Users");
  let data = {
    name: "Student one",
    mobile: "123456789",
    batch: "mern1",
    enrollDate: "2022-01-01",
  };

  try {
    let res = await Users.insertOne(data);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const getAll = async () => {
  const Users = _db.collection("Users");
  try {
    let res = await Users.find({}).toArray();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const getOneWithoutConditaion = async () => {
  const Users = _db.collection("Users");
  try {
    let query = {};
    let res = await Users.findOne(query);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const getOne = async () => {
  const Users = _db.collection("Users");
  try {
    let query = { name: "Student tow" };
    let res = await Users.findOne(query);
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const getWithProjection = async () => {
  const Users = _db.collection("Users");
  try {
    let query = {};
    let Projection = { projection: { _id: 0, name: 1, batch: 1 } };
    let res = await Users.find(query, Projection).toArray();
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};

const updateOne = async () => {
  const Users = _db.collection("Users");
  try {
    let query = { name: "Student tow" };
    let data = { mobile: "01988775828" };
    let res = await Users.findOneAndUpdate(query, {
      $set: data,
    });
    console.log(res);
  } catch (err) {
    console.log(err);
  }
};
