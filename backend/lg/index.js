const express = require("express");
const cors = require("cors");
const axios = require("axios");
const { exec } = require("child_process");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Podcast Practice Backend Running!");
});

// YouTube Translation API endpoint
app.post("/translate-video", (req, res) => {
  const { videoLink, language } = req.body;

  // Make sure videoLink and language are provided
  if (!videoLink || !language) {
    return res.status(400).json({ error: "Video link and language are required" });
  }

  // Specify the path to your Python script
  const scriptPath = path.join(__dirname, "translate_youtube.py");

  // Use exec to run the Python script with videoLink and language as arguments
  const command = `python3 "${scriptPath}" "${videoLink}" "${language}"`;

  exec(command, (error, stdout, stderr) => {
    if (error) {
      console.error(`Error executing script: ${error.message}`);
      return res.status(500).json({ error: `Failed to translate: ${error.message}` });
    }

    if (stderr) {
      console.error(`stderr: ${stderr}`);
      return res.status(500).json({ error: `Error in script: ${stderr}` });
    }

    // Send the result of the translation (stdout) back to the client
    res.json({ translation: stdout });
  });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
