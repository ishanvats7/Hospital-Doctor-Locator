const express = require("express");
const router = express.Router();
const axios = require("axios");

router.post("/ask", async (req, res) => {
  console.log("🔥 /api/ai/ask called with body:", req.body);
  const { query } = req.body;

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-lite:generateContent?key=" + process.env.GEMINI_API_KEY,
      {
        contents: [
          {
            parts: [
              {
                text: `You are a medical assistant AI.
Given the patient's symptoms, respond ONLY with 1 to 2 possible medical specializations that the patient should visit.
Do not include explanations or extra text.
Symptoms: ${query}`
              }
            ]
          }
        ]
      },
      { headers: { "Content-Type": "application/json" } }
    );

    // Extract response text
    const aiReply =
      response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "No response from AI";

    res.json({ specialization: aiReply });

  } catch (error) {
    console.error("❌ AI API error:", error.response?.data || error.message);
    res.status(500).json({
      error: "Error fetching AI suggestion.",
      details: error.response?.data || error.message,
    });
  }
});

module.exports = router;
