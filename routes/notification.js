const express = require("express");
const router = express.Router();

const {
  sendToToken,
  sendToMultipleTokens,
  sendToTopic,
} = require("../services/notificationService");

router.post("/send", async (req, res) => {
  try {
    const { token, topic, title, body, data } = req.body;

    let result;

    if (topic) {
      result = await sendToTopic(topic, title, body, data || {});
    } else if (token) {
      result = await sendToToken(token, title, body, data || {});
    } else {
      return res.status(400).json({
        success: false,
        error: "Topic or Token is required",
      });
    }

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

router.post("/send-multiple", async (req, res) => {
  try {
    const { tokens, title, body, data } = req.body;

    const result = await sendToMultipleTokens(
      tokens,
      title,
      body,
      data || {}
    );

    res.json(result);

  } catch (error) {
    console.error(error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

module.exports = router;