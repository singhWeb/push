const express = require("express");
const axios = require("axios"); // Add this line to import axios
const app = express();
const port = process.env.PORT || 3000;

const googleAppsScriptUrl =
  "https://script.google.com/macros/s/AKfycbxT-SGKuFZm5BhUZeMJmwraTGvnLIIHZKWzPUqgcWLA281XzqPfilGBsbBD0kpA6tXB/exec";

// Handle the "/send-data" route to receive data from your device
app.get("/send-data", async (req, res) => {
  try {
    // Extract data from the query parameters (latitude, longitude, weight)
    const { latitude, longitude, weight } = req.query;

    // Debugging: Log the received data to the console
    console.log("Received data:", { latitude, longitude, weight });

    // Process the received data as needed (e.g., send it to Google Apps Script)
    // ... 
    const response = await axios.get(googleAppsScriptUrl, {
      params: {
        latitude,
        longitude,
        weight,
      },
    });

    // If the Google Apps Script processed the data successfully, respond to the device
    res.send("Data received and processed successfully!");
  } catch (error) {
    console.error("Error processing data:", error.message);
    // If there's an error while processing the data, respond to the device with an error message
    res.status(500).send("Failed to process the data.");
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
