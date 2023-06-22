const {
  connectDB,
  disconectDB,
  deleteEntries,
} = require("../../utils/database");

exports.handler = async function (event, context) {
  let { user } = context.clientContext;
  if (user) {
    const con = await connectDB();
    const entries = await deleteEntries({ userId: user.sub });
    await disconectDB(con);
    return {
      statusCode: 200,
      body: JSON.stringify({
        file: "deleteData.js",
        deleted: entries,
      }),
    };
  } else {
    return {
      statusCode: 401,
      body: JSON.stringify({
        file: "deleteData.js",
        error: "Not Logged in, invalid UserID",
      }),
    };
  }
};
