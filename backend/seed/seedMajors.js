const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Major = require("../models/majors"); // ✅ adjust path if this file is in /seed

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;

const majors = [
  { name: "Computer Science", department: "STEM" },
  { name: "Business Administration", department: "Business" },
  { name: "Psychology", department: "Social Sciences" },
  { name: "Biology", department: "Natural Sciences" },
  { name: "Political Science", department: "Social Sciences" },
  { name: "Finance", department: "Business" },
  { name: "Economics", department: "Business" },
  { name: "Marketing", department: "Business" },
  { name: "Philosophy", department: "Humanities" },
  { name: "Environmental Science", department: "STEM" },
  { name: "Physics", department: "STEM" },
  { name: "English Literature", department: "Humanities" },
  { name: "Music", department: "Fine Arts" },
  { name: "Chemistry", department: "Natural Sciences" },
  { name: "History", department: "Humanities" },
  { name: "Art History", department: "Fine Arts" },
];

async function seedMajors() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await Major.deleteMany();
    console.log("Cleared existing majors");

    await Major.insertMany(majors);
    console.log("Seeded 16 majors");

    process.exit();
  } catch (err) {
    console.error("Error seeding majors:", err);
    process.exit(1);
  }
}

seedMajors();
