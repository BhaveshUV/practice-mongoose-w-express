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

//---------------- Set up Express server and API routes ----------------//
const app = express();

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "/views"));

app.use(express.static(path.join(__dirname, "/public")));
// Middleware
app.use(express.urlencoded({ extended: true }));

// GET—check root get route
app.get("/", (req, res) => {
    res.send("This root GET API is working");
});

// GET — get all chats
app.get("/chats", async (req, res) => {
    let chats = await Chat.find();
    res.render("index.ejs", { chats });
});

// GET — get send new chat form
app.get("/chats/new", (req, res) => {
    res.render("newChatForm.ejs");
})

// POST — create/insert new received chat
app.post("/chats", (req, res) => {
    console.log("request received");
    let newChat = new Chat({
        ...req.body,
        created_at: new Date()
    })
    newChat.save()
        .then(result => {
            console.log("The message is saved to db", result);
            res.redirect("/chats");
        })
        .catch(e => res.send(e));
});

app.listen(8080, () => {
    console.log("App server is listening on port 8080...");
});