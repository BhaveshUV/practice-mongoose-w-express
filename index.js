const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using mongoose"))
    .catch(err => console.log(err));

//-------- Create a chat instance and save to chatApp database --------//
let chat1 = new Chat({
    from: "agentA",
    to: "agentB",
    msg: "Work-in progress",
    created_at: new Date()
});
chat1.save()
    .then(res => console.log(res))
    .catch(e => console.log(e));

//---------------- Set up Express server and API routes ----------------//
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.get("/", (req, res) => {
    res.send("This root GET API is working");
})

app.listen(8080, () => {
    console.log("App server is listening on port 8080...");
});