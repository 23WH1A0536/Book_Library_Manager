const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User');

const DB_URI = 'mongodb+srv://23wh1a0536_db_user:XQcCNQLzDIspUIkC@librarycluster.du4ijea.mongodb.net/'; // Add your MongoDB connection string here
const app = express();

app.listen(3000, () => {
  console.log('Server is listening on port 3000');
})

app.get('/User',async (req, res) => {
    try {
        await mongoose.connect(DB_URI);
        console.log("Connected to MongoDB");
        const listOfUsers = await User.find({});
        res.status(200).json({message: "Connected to MongoDB", users: listOfUsers});
    } catch (error) {
        console.log("Error connecting to MongoDB:", error);
        res.status(500).json({message: "Error connecting to MongoDB", error});
    }
})
