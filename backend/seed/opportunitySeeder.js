const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Opportunity = require("../models/opportunity");

dotenv.config();

const MONGO_URI = process.env.MONGO_URI;

const opportunities = [
  {
    title: "Campus Cleanup",
    description: "Help clean up the quad area on Saturday.",
    posted_by: "user1@gmail.com",
    type: "Volunteer",
    is_paid: false,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Food Drive",
    description: "Assist in organizing the local food drive.",
    posted_by: "user2@gmail.com",
    type: "Community",
    is_paid: false,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Tutoring Math",
    description: "Help high school students with algebra.",
    posted_by: "user3@gmail.com",
    type: "Academic",
    is_paid: true,
    amount: 50,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Mentor Middle Schoolers",
    description: "Weekly mentoring sessions for middle school students.",
    posted_by: "user4@gmail.com",
    type: "Mentorship",
    is_paid: false,
    needs_approval: true,
    approved: false,
    approved_by: "",
  },
  {
    title: "Research Assistant",
    description: "Assist a professor in data entry and cleaning.",
    posted_by: "prof1@su.edu",
    type: "Research",
    is_paid: true,
    amount: 100,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Library Organizer",
    description: "Help organize digital records in the library.",
    posted_by: "user5@gmail.com",
    type: "On-campus",
    is_paid: false,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Green Campus Volunteer",
    description: "Join the sustainability club’s Green Day initiative.",
    posted_by: "eco@su.edu",
    type: "Volunteer",
    is_paid: false,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Website Testing",
    description: "Test school’s new web portal and give feedback.",
    posted_by: "it@su.edu",
    type: "Tech",
    is_paid: true,
    amount: 75,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Cultural Event Support",
    description: "Help set up Stetson Culture Night booths.",
    posted_by: "events@su.edu",
    type: "Event",
    is_paid: false,
    needs_approval: true,
    approved: false,
    approved_by: "",
  },
  {
    title: "Photography at Events",
    description: "Capture photos during university events.",
    posted_by: "media@su.edu",
    type: "Creative",
    is_paid: true,
    amount: 150,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Coding Bootcamp Assistant",
    description: "Assist in student-led coding workshops.",
    posted_by: "csdept@su.edu",
    type: "Academic",
    is_paid: true,
    amount: 90,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Art Festival Helper",
    description: "Support logistics for campus art fair.",
    posted_by: "arts@su.edu",
    type: "Event",
    is_paid: false,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Peer Writing Tutor",
    description: "Help peers with writing assignments.",
    posted_by: "writing@su.edu",
    type: "Academic",
    is_paid: true,
    amount: 60,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Career Fair Assistant",
    description: "Help companies set up and manage booths.",
    posted_by: "career@su.edu",
    type: "Event",
    is_paid: false,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Design Student Magazine",
    description: "Collaborate on layout for the student publication.",
    posted_by: "editor@su.edu",
    type: "Creative",
    is_paid: true,
    amount: 120,
    needs_approval: true,
    approved: true,
    approved_by: "admin@su.edu",
  },
  {
    title: "Music Festival Setup",
    description: "Assist sound and stage crew.",
    posted_by: "music@su.edu",
    type: "Event",
    is_paid: true,
    amount: 80,
    needs_approval: false,
    approved: true,
    approved_by: "admin@su.edu",
  },
];

async function seedOpportunities() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to DB");

    await Opportunity.deleteMany();
    console.log("Cleared existing opportunities");

    await Opportunity.insertMany(opportunities);
    console.log("Seeded 16 opportunities");

    process.exit();
  } catch (err) {
    console.error("Error seeding opportunities:", err);
    process.exit(1);
  }
}

seedOpportunities();
