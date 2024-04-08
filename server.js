// Importing required modules
const express = require("express");
const mongoose = require("mongoose");
const User = require("./models/UserModel"); // Importing User model
const Mentor = require("./models/MentorModal"); // Importing Mentor model
const Review = require("./models/ReviewModel"); // Importing Review model
const RecommendStudent = require("./models/RecomendStudentModal"); // Importing RecommendStudent model
const bodyParser = require('body-parser');

// Initializing Express app
const app = express();
const port = 3000;

// Middleware to parse JSON bodies
app.use(bodyParser.json());

// Connecting to MongoDB Atlas
mongoose.connect(
    "mongodb+srv://talativraj0805:u3aVpJgtUXg4c95q@cluster0.0mqlf72.mongodb.net/",
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
)
.then((x) => {
    console.log("Connected to MongoDB Atlas!");
})
.catch((err) => {
    console.log("Error while connecting to MongoDB Atlas");
});



// Route to handle root endpoint
// app.get("/", (req, res) => {
//     console.log("Request received on root endpoint");
//     return res.send("Hello, World!");
// });



// Route to create a new user
app.post("/user", async (req, res) => {
    try {
        const { name } = req.body;
        const newUserData = { name };
        const newUser = await User.create(newUserData);
        console.log("New user created:", newUser);
        return res.status(200).json(newUser);
    } catch (err) {
        console.error("Error creating user:", err);
        return res.status(500).json({ error: err.message });
    }
});



// Route to create a new mentor
app.post("/mentor", async (req, res) => {
    try {
        const { name } = req.body;
        const newMentorData = { name };
        const newMentor = await Mentor.create(newMentorData);
        console.log("New mentor created:", newMentor);
        return res.status(200).json(newMentor);
    } catch (err) {
        console.error("Error creating mentor:", err);
        return res.status(500).json({ error: err.message });
    }
});



// Route to update mentor's rating
app.post('/rate-mentor/:mentorName', async (req, res) => {
    try {
        const { rating } = req.body;
        const name = req.params.mentorName;
        
        // Validate rating
        if (rating < 1 || rating > 5) {
            return res.status(400).json({ error: 'Rating must be between 1 and 5' });
        }
        
        const mentor = await Mentor.findOne({ name: name });
        if (!mentor) {
            return res.status(404).json({ error: 'Mentor not found' });
        }
        
        // Update mentor's rating
        mentor.rating = rating;
        await mentor.save();

        console.log("Mentor's rating updated:", mentor);
        res.json({ message: 'Mentor rated successfully', mentor: mentor });
    } catch (err) {
        console.error("Error updating mentor's rating:", err.message);
        res.status(500).json({ error: 'Server Error' });
    }
});



// Route to add review for a mentor
app.post('/review-mentor/:mentorName', async (req, res) => {
    try {
        const { reviewText } = req.body;
        if (reviewText.length > 50) {
            return res.json({ message: "Review text must contain 50 words or less" });
        }
        const name = req.params.mentorName;
        const mentor = await Mentor.findOne({ name: name });
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }
        const review = new Review({
            mentor: mentor._id,
            reviewText
        });
        await review.save();
        console.log("Review submitted successfully:", review);
        res.json({ message: "Review submitted successfully" });
    } catch (err) {
        console.error("Error adding review:", err.message);
        res.status(500).json({ error: err.message });
    }
});



// Route to retrieve certificate for a student
app.get("/student_certificate/:studentName", async (req, res) => {
    try {
        const name = req.params.studentName;
        const student = await User.findOne({ name: name });
        if (!student) {
            return res.status(404).json({ message: "Student not found" });
        }
        const certificate = {
            studentName: student.name,
            certificateText: `This is the certificate for ${student.name}.`
        };
        return res.status(200).json(certificate);
    } catch (err) {
        console.error("Error retrieving certificate:", err.message);
        return res.status(500).json({ error: "Server Error" });
    }
});



// Route to retrieve mentor details
app.get("/mentor_detils/:mentorName", async (req, res) => {
    try {
        const name = req.params.mentorName;
        const mentor = await Mentor.findOne({ name: name });
        if (!mentor) {
            return res.status(404).json({ error: "Mentor not found" });
        }
        const rating = mentor.rating;
        return res.status(200).json({ rating: rating });
    } catch (err) {
        console.error("Error retrieving mentor details:", err.message);
        return res.status(500).json({ error: "Server Error" });
    }
});



// Starting the Express server
app.listen(port, () => {
    console.log("Server running on port " + port);
});
