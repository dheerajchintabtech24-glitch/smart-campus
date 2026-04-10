// ================== IMPORTS ==================
const express = require("express");
const cors = require("cors");

// ================== APP SETUP ==================
const app = express();
app.use(cors());
app.use(express.json());

// ================== DATA STORAGE ==================
let issues = [];

// ================== ROOT ROUTE ==================
app.get("/", (req, res) => {
  res.send("Smart Campus Backend Running 🚀");
});

// ================== GET ALL ISSUES ==================
app.get("/issues", (req, res) => {
  res.json(issues);
});

// ================== ADD NEW ISSUE ==================
app.post("/issues", (req, res) => {
  const { student, description, location, category } = req.body;

  const newIssue = {
    id: Date.now(),
    student: student || "Anonymous",
    description,
    location,
    category,
    status: "PENDING"
  };

  issues.push(newIssue);
  res.json(newIssue);
});

// ================== UPDATE ISSUE (ADMIN / STAFF) ==================
app.put("/issues/:id", (req, res) => {
  const id = Number(req.params.id);
  const { status } = req.body;

  issues = issues.map(issue =>
    issue.id === id ? { ...issue, status } : issue
  );

  res.json({ message: "Issue updated successfully" });
});

// ================== DELETE ALL ISSUES (OPTIONAL RESET) ==================
app.delete("/issues", (req, res) => {
  issues = [];
  res.json({ message: "All issues cleared" });
});

// ================== START SERVER ==================
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});