import { API_KEY } from "../../app/config/geminiApiConfig";
import { GoogleGenerativeAI } from "@google/generative-ai";
import * as FileSystem from "expo-file-system";




const genAI = new GoogleGenerativeAI(API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });


class GeminiApiService {
  constructor() {
    this.model = model;
    this.ticketPrompt = ticketPrompt;
    this.API_KEY = API_KEY;
  }

  static async getTicketDetailsFromImage(imageFilePath) {
    const ticketPrompt = `
    {
  "ticket_type": "flight/train/bus/ferry",
  "pnr": "",
  "operator_name": "",
  "from_location": "",
  "from_location_code": "",
  "to_location": "",
  "to_location_code": "",
  "travel_time": "",
  "distance": 0.0,
  "time_travelled": "",
  "from_date": "",
  "from_time": "",
  "to_date": "",
  "to_time": "",
  "passenger_details": [
    {
      "passenger_id": "",
      "name": "",
      "age": 0,
      "gender": "",
      "seat_number": ""
    }
  ],
  "type_specific": { 
    "flight": { "flight_number": "", "gate_number": "", "boarding_time": "", "class": "" },  
    "train": { "class": "", "coach_number": "", "train_number": "" },  
    "bus": { "bus_number": "", "bus_type": "" },  
    "ferry": { "deck_number": "", "ferry_name": "" }  
  },
  "token_details": {
    "remaining": "",  
    "used": "",  
    "monthly_limit": "",  
    "estimated_remaining_requests": ""
  }
}
      if there is no ticket : 
      return {
        error : "Ticket not found, make sure that the image is of a valid ticket"
      }
  `;




    // const ticketPrompt = `say hI in json object
    //         {"say" : "hi"}
    //       `;

    // !## change this to the good prompt

    try {
      console.log("✅ Step 1: Received image file path:", imageFilePath);

      // Read the image file and convert it to Base64
      const imageBase64 = await FileSystem.readAsStringAsync(imageFilePath, { encoding: "base64" });

      console.log("✅ Step 2: Image successfully converted to Base64");

      if (!imageBase64) {
        throw new Error("🚨 Image conversion failed. File might not exist.");
      }

      // Detect MIME type
      const mimeType = imageFilePath.endsWith(".jpg") || imageFilePath.endsWith(".jpeg")
        ? "image/jpeg"
        : "image/png";

      console.log("✅ Step 3: MIME type detected as:", mimeType);

      // Create image object
      const image = {
        inlineData: {
          data: imageBase64,
          mimeType: mimeType,
        },
      };

      console.log("✅ Step 4: Image object created");

      // Use the correct prompt variable
      const prompt = ticketPrompt;

      console.log("✅ Step 5: Using prompt:", prompt);

      // Send request to Gemini API
      console.log("🚀 Step 6: Sending request to Gemini API...");
      const result = await model.generateContent([prompt, image]);

      console.log("calling extractTicketInfo");
      return (await GeminiApiService.extractTicketInfo(result));
    } catch (error) {
      console.error("❌ Error processing image with Gemini:", error);
      return null;
    }
  }



  static async getRelatedCities(city) {
    try {
      console.log("Getting related cities for:", city);
    } catch (error) {
      console.error("Error getting related cities:", error);
    }
  }

  static async extractTicketInfo(response) {
    console.log("Full Gemini API Response:", JSON.stringify(response, null, 2));

    // Extract raw text from the response
    let responseText = response?.response?.candidates?.[0]?.content?.parts?.[0]?.text ?? "{}";

    // Attempt to extract JSON using regex
    try {
      // Match JSON inside triple backticks (```json ... ```)
      const jsonMatch = responseText.match(/```json\n([\s\S]+?)\n```/);

      if (jsonMatch) {
        responseText = jsonMatch[1];  // Extract only the JSON content
      }

      // Ensure the response is valid JSON
      const ticketData = JSON.parse(responseText.trim());
      console.log("✅ Extracted Ticket Data:", ticketData);

      return ticketData;
    } catch (error) {
      console.error("❌ Error parsing response:", error.message);
      return {};
    }
  }


}


export default GeminiApiService;