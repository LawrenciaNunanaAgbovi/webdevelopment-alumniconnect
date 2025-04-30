const mongoose = require("mongoose");
const dotenv = require("dotenv");
const User = require("../models/user");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const users = [
  {
    name: "Abish Agbovi",
    username: "yayra",
    major: "Business",
    year_graduated: "1980",
    company: "Stetson University",
    title: "Professor of Business Administration",
    email: "aagbovi@stetson.edu",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Victor Akolo",
    username: "vakolo",
    major: "Computer Science",
    year_graduated: "2025",
    company: "Stetson University",
    title: "Software Engineer Intern",
    email: "vakolo@stetson.edu",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Prince De-graft",
    username: "pdegraft",
    major: "Digital Arts",
    year_graduated: "2024",
    company: "SU Creative Labs",
    title: "Media Designer",
    email: "pdg@stetson.edu",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Sarah Nguyen",
    username: "snguyen",
    major: "Biology",
    year_graduated: "2026",
    company: "BioTech Inc",
    title: "Research Assistant",
    email: "snguyen@biotech.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "James Williams",
    username: "jwilliams",
    major: "Political Science",
    year_graduated: "2023",
    company: "City Hall",
    title: "Policy Intern",
    email: "jw@cityhall.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Leila Hassan",
    username: "lhassan",
    major: "Business Admin",
    year_graduated: "2022",
    company: "Amazon",
    title: "Business Analyst",
    email: "leila@amazon.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Emmanuel Owusu",
    username: "eowusu",
    major: "Economics",
    year_graduated: "2025",
    company: "Bloomberg",
    title: "Data Intern",
    email: "eowusu@bloomberg.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Natalie Jones",
    username: "njones",
    major: "Marketing",
    year_graduated: "2024",
    company: "Nike",
    title: "Marketing Associate",
    email: "njones@nike.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Oscar Sanchez",
    username: "osanchez",
    major: "Sociology",
    year_graduated: "2026",
    company: "Peace Corps",
    title: "Field Volunteer",
    email: "omar@peacecorps.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Chloe Wright",
    username: "cwright",
    major: "Education",
    year_graduated: "2023",
    company: "Teach for America",
    title: "Teaching Fellow",
    email: "chloe@tfa.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Aisha Ali",
    username: "aali",
    major: "History",
    year_graduated: "2022",
    company: "Smithsonian",
    title: "Curator Intern",
    email: "aali@smithsonian.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Tom Green",
    username: "tgreen",
    major: "Environmental Science",
    year_graduated: "2025",
    company: "National Parks Service",
    title: "Ecology Intern",
    email: "tgreen@nps.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Hannah Lee",
    username: "hlee",
    major: "Psychology",
    year_graduated: "2023",
    company: "UCLA",
    title: "Research Assistant",
    email: "hlee@ucla.edu",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Noah Kim",
    username: "nkim",
    major: "Computer Science",
    year_graduated: "2026",
    company: "Google",
    title: "STEP Intern",
    email: "nkim@google.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Maria Torres",
    username: "mtorres",
    major: "Nursing",
    year_graduated: "2024",
    company: "AdventHealth",
    title: "Nursing Intern",
    email: "maria@adventhealth.org",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  },
  {
    name: "Lucas White",
    username: "lwhite",
    major: "Theatre Arts",
    year_graduated: "2025",
    company: "Orlando Rep",
    title: "Stage Assistant",
    email: "lucas@orlandorep.com",
    linkedin_link: "https://www.linkedin.com/in/lawrencia-nunana-agbovi-35456424a/",
  }
];

async function seedUsers() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await User.deleteMany();
    console.log("Cleared existing users");

    await User.insertMany(users);
    console.log("Seeded 16 users");

    process.exit();
  } catch (err) {
    console.error("Error seeding users:", err);
    process.exit(1);
  }
}

seedUsers();
