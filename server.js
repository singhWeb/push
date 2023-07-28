const express = require("express");
const axios = require("axios");

const app = express();

// Replace this URL with your Google Apps Script URL
const corsProxyUrl = "https://cors-anywhere.herokuapp.com/";
const googleAppsScriptUrl =
  corsProxyUrl +
  "https://script.google.com/macros/s/AKfycbxT-SGKuFZm5BhUZeMJmwraTGvnLIIHZKWzPUqgcWLA281XzqPfilGBsbBD0kpA6tXB/exec";

// Endpoint to receive data from your device
app.get("/send-data", async (req, res) => {
  try {
    // Extract data from the query parameters (latitude, longitude, weight)
    const { latitude, longitude, weight } = req.query;

    // Make an HTTP GET request to the Google Apps Script URL with the received data
    const response = await axios.get(googleAppsScriptUrl, {
      params: {
        latitude,
        longitude,
        weight,
      },
    });

    // If the Google Apps Script processed the data successfully, respond to the device
    if (response.data === "SUCCESS") {
      res.send("Data received and processed successfully!");
    } else {
      res.send("Failed to process the data.");
    }
  } catch (error) {
    console.error("Error processing data:", error.message);
    res.status(500).send("Error processing data.");
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
