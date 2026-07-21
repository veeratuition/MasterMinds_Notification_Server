const express = require("express");
const router = express.Router();

const {
  sendToToken,
  sendToMultipleTokens,
} = require("../services/notificationService");

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

module.exports = router;