const express = require("express");
const router = express.Router();

const {
  sendToToken,
  sendToMultipleTokens,
  sendToTopic,
} = require("../services/notificationService");

// Send to single token
router.post("/send", async (req, res) => {
  try {
    const { token, title, body, data } = req.body;

    const result = await sendToToken(
      token,
      title,
      body,
      data || {}
    );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }
});

// Send to multiple tokens
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

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});

// Send to Topic
router.post("/send-topic", async (req, res) => {

  try {

    const { topic, title, body, data } = req.body;

    const result = await sendToTopic(
      topic,
      title,
      body,
      data || {}
    );

    res.json(result);

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message,
    });

  }

});

module.exports = router;