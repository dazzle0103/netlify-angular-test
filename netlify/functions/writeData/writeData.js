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
    console.log("event-body+userId:", trainingData);
    const doc = await createNewEntry(trainingData);
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
        error: "Not Logged in, invalid UserID",
      }),
    };
  }
};
