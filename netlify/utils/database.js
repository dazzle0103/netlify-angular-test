const mongoose = require("mongoose");
require("dotenv").config();

const trainingSchema = new mongoose.Schema({
  name: String,
  training: [Number],
  date: String,
  userId: String,
});

async function connectDB() {
  try {
    console.log("Connect to Database");
    const con = await mongoose.connect(process.env.MONGO_URL);
    return con;
  } catch (error) {
    console.log(error);
  }
}

async function disconectDB(connection) {
  try {
    console.log("Disconnect from Database");
    connection.disconnect();
  } catch (error) {
    console.log(error);
  }
}

async function createNewEntry(data) {
  const Training = mongoose.model("Training", trainingSchema);
  const training = new Training({
    name: data.name,
    training: data.training,
    date: data.date,
    userId: data.userId,
  });
  try {
    const doc = await training.save();
    return doc;
  } catch (error) {
    console.log(error);
  }
}

async function readEntries(userIdObject) {
  const Training = mongoose.model("Training", trainingSchema);
  try {
    const entries = await Training.find(userIdObject);
    return entries;
  } catch (error) {
    console.error(error);
  }
}

async function deleteEntries(userIdObject) {
  const Training = mongoose.model("Training", trainingSchema);
  try {
    const entries = await Training.deleteMany(userIdObject);
    return entries;
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  connectDB,
  trainingSchema,
  disconectDB,
  createNewEntry,
  readEntries,
  deleteEntries,
};
