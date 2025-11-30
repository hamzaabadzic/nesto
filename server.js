import express from "express";
import cors from "cors";
import fetch from "node-fetch";

const app = express();
app.use(cors());
app.use(express.json());

const API_KEY = process.env.GOOGLE_API_KEY;

app.post("/api/chat", async (req, res) => {
  try {
    const userMessage = req.body.message;

    const response = await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=" + API_KEY,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contents: [{ parts: [{ text: userMessage }] }]
        }),
      }
    );

    const data = await response.json();
    res.json(data);

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Proxy server error" });
  }
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log("Proxy running on port " + PORT));
