const {
  connectDB,
  createNewEntry,
  disconectDB,
} = require("../../utils/database");

exports.handler = async function (event, context) {
  console.log("DATA:", JSON.parse(event.body));
  let { user } = context.clientContext;
  if (user) {
    const con = await connectDB();

    const trainingData = JSON.parse(event.body);
    trainingData["userId"] = user.sub;

    const doc = await createNewEntry(trainingData);
    console.log(doc);
    await disconectDB(con);

    return {
      statusCode: 200,
      body: JSON.stringify({
        file: "writeData.js",
        newEntry: doc,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({
        file: "writeData.js",
        newEntry: null,
      }),
    };
  }
};
