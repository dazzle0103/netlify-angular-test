const { connectDB, disconectDB, readEntries } = require("../../utils/database");

exports.handler = async function (event, context) {
  let { user } = context.clientContext;
  if (user) {
    const con = await connectDB();
    const entries = await readEntries({ userId: user.sub });
    console.log("readData - : ", entries, user.sub);
    await disconectDB(con);
    return {
      statusCode: 200,
      body: JSON.stringify({
        file: "readData.js",
        data: entries,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({
        file: "readData.js",
        error: "Not Logged in, invalid UserID",
      }),
    };
  }
};
