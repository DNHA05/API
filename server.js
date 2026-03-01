const express = require("express");
const cors = require("cors");
const fs = require("fs-extra");

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

const DATA_FILE = "./data.json";

// Hàm đọc dữ liệu
async function getData() {
  return await fs.readJson(DATA_FILE);
}

// Hàm ghi dữ liệu
async function saveData(data) {
  await fs.writeJson(DATA_FILE, data);
}

// API tăng view
app.post("/api/view", async (req, res) => {
  try {
    const data = await getData();
    data.views += 1;
    await saveData(data);

    res.json({
      success: true,
      views: data.views
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

// API lấy tổng view
app.get("/api/view", async (req, res) => {
  try {
    const data = await getData();
    res.json({
      views: data.views
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
