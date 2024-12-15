import express from "express";
import OpenAI from "openai";

const app = express();
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.XAI_API_KEY, // Securely store your API key in environment variables
});

app.post("/validate-license", async (req, res) => {
  try {
    const { licenseData } = req.body;
    const response = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "You are Grok." },
        { role: "user", content: `Validate this license data: ${JSON.stringify(licenseData)}` },
      ],
    });

    res.status(200).json({ message: response.choices[0].message });
  } catch (error) {
    console.error("Error in API call:", error);
    res.status(500).json({ error: error.message });
  }
});

const PORT = 4000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
