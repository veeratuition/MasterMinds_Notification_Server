const { getMessaging } = require("firebase-admin/messaging");

async function sendToToken(token, title, body, data = {}) {

  try {

    const message = {

      token,

      notification: {
        title,
        body,
      },

      data,

      android: {
        priority: "high",
      },

      apns: {
        payload: {
          aps: {
            sound: "default",
          },
        },
      },

    };

    const response = await getMessaging().send(message);

    return {
      success: true,
      messageId: response,
    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: error.message,
    };

  }

}

async function sendToMultipleTokens(tokens, title, body, data = {}) {

  try {

    const message = {

      tokens,

      notification: {
        title,
        body,
      },

      data,

      android: {
        priority: "high",
      },

    };

    const response =
      await getMessaging().sendEachForMulticast(message);

    return {

      success: true,
      successCount: response.successCount,
      failureCount: response.failureCount,

    };

  } catch (error) {

    console.error(error);

    return {
      success: false,
      error: error.message,
    };

  }

}

module.exports = {
  sendToToken,
  sendToMultipleTokens,
};