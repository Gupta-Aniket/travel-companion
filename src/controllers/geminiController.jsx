class GeminiController {
  apiKey = "";
  constructor(apiKey) {
    this.apiKey = "";
    this.baseUrl = "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent";
  }

  async validateApiKey(apiKey) {
    this.apiKey = apiKey;

    try {
      const response = await fetch(`${this.baseUrl}?key=${this.apiKey}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [{ parts: [{ text: "Return true if this API key is valid" }] }],
        }),
      });

      if (!response.ok) {
        return false; // API key is invalid
      }

      const data = await response.json();

      // Gemini should return a response if the key is valid
      return data && data.candidates && data.candidates.length > 0;
    } catch (error) {
      console.error("Error validating API key:", error);
      return false;
    }
  }
}

export default GeminiController;
