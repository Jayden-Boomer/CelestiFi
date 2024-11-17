const express = require("express");
const cors = require("cors");
const axios = require("axios");
require("dotenv").config();

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

// Pinata API Base URL
const PINATA_API_BASE = "https://api.pinata.cloud/v3";

// Fetch Files by Metadata Date
app.post("/api/files-by-date", async (req, res) => {
  const { date } = req.body;
  if (!date) {
    return res.status(400).json({ error: "Date is required." });
  }

  try {
    // Fetch all files from Pinata
    const response = await axios.get(`${PINATA_API_BASE}/files`, {
      headers: {
        Authorization: `Bearer ${process.env.PINATA_JWT}`,
      },
    });

    // Filter files by metadata date
    const targetDate = new Date(date);
    const filteredFiles = response.data.data.files.filter((file) => {
      const metadataDate = file.keyvalues?.date;
      if (!metadataDate) return false;
      return new Date(metadataDate) <= targetDate;
    });

    res.json({ files: filteredFiles });
  } catch (error) {
    console.error("Error fetching files:", error.message);
    res.status(500).json({ error: "Failed to fetch files from Pinata." });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
