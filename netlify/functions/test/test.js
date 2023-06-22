exports.handler = async function (event, context) {
  try {
    let { user } = context.clientContext;
    if (user) {
      console.log(user.sub);
      console.log(user.user_metadata.full_name);
      return {
        statusCode: 200,
        body: JSON.stringify({
          file: "test.js",
          data: JSON.stringify(context.clientContext),
        }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({
          file: "test.js",
          data: JSON.stringify(context.clientContext),
        }),
      };
    }
  } catch (error) {
    console.error(error);
  }
};
