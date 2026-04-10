// ==============================
// SMART CAMPUS BACKEND SERVER
// ==============================

const express = require("express");
const cors = require("cors");

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// ==============================
// IN-MEMORY DATABASE (for now)
// ==============================

let issues = [];

// ==============================
// ROUTES
// ==============================

// 🔹 Create Issue (Student)
app.post("/issues", (req, res) => {
    const issue = {
        id: Date.now(),
        student: req.body.student,
        description: req.body.description,
        location: req.body.location,
        category: req.body.category || "General",
        priority: "Low",
        status: "PENDING"
    };

    issues.push(issue);

    res.json(issue);
});

// 🔹 Get All Issues (Admin / Staff)
app.get("/issues", (req, res) => {
    res.json(issues);
});

// 🔹 Update Issue (Admin / Staff)
app.put("/issues/:id", (req, res) => {
    const id = parseInt(req.params.id);

    issues = issues.map(issue => {
        if (issue.id === id) {
            return {
                ...issue,
                ...req.body
            };
        }
        return issue;
    });

    res.json({ message: "Issue updated successfully" });
});

// ==============================
// SERVER START
// ==============================

app.listen(3000, () => {
    console.log("🚀 Server running on http://localhost:3000");
});

app.delete('/clear', (req, res) => {
    issues = [];
    res.send("All issues cleared");
});