require("dotenv").config();
const express = require("express");
const path = require("path");

const app = express();

// view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// static files
app.use(express.static(path.join(__dirname, "public")));

// routes
app.get("/", (req, res) => res.render("index", { currentPage: "home" }));
app.get("/about", (req, res) => res.render("about", { currentPage: "about" }));
app.get("/projects", (req, res) =>
  res.render("projects", { currentPage: "projects" })
);
app.get("/resume", (req, res) =>
  res.render("resume", { currentPage: "resume" })
);
app.get("/certifications", (req, res) =>
  res.render("certifications", { currentPage: "certifications" })
);
app.get("/skills", (req, res) =>
  res.render("skills", { currentPage: "skills" })
);

// start server
app.listen(4000, () => {
  console.log("Server running on http://localhost:4000");
});
