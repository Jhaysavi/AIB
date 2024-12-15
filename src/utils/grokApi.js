import OpenAI from "openai";

// Initialize the OpenAI instance
const openai = new OpenAI({
  apiKey: `xai-N1r0WQ9urSvgQVeKsLyQXfLSM0UwBCttK8sMzNqNbKMxQI2Zs2L7rdhW7gSngaWzHzUO99JPzaRoZoTY`, 
  baseURL: "https://api.x.ai/v1", // Base URL for xAI API
  dangerouslyAllowBrowser: true,
});

export const validateLicenseData = async (licenseData) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "grok-beta",
      messages: [
        { role: "system", content: "Act as a strict validator for license data. Reply with 'Valid' if the data meets the standards and 'Invalid' otherwise." },
        {
          role: "user",
          content: `Validate this license data: ${JSON.stringify(licenseData)}`,
        },
      ],
    });

    const response = completion.choices[0]?.message?.content?.trim();

    if (!response) {
      throw new Error("Received an empty response from the API.");
    }

    if (response.includes("Valid")) {
      return { valid: true, message: "The license data is valid." };
    } else if (response.includes("Invalid")) {
      return { valid: false, message: "The license data is invalid." };
    } else {
      throw new Error(`Unexpected response: ${response}`);
    }
  } catch (error) {
    console.error("Error validating license data:", error.message);
    throw error;
  }
};

(async () => {
  const licenseDataExample = { key: "ABC123", validUntil: "2024-12-31" };

  try {
    const result = await validateLicenseData(licenseDataExample);
    console.log(result);
  } catch (err) {
    console.error("Validation error:", err);
  }
})();