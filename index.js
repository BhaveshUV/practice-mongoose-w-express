const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const Chat = require("./models/chat");
const methodOverride = require("method-override");

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

// Method-override
app.use(methodOverride("_method"));

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
});

// GET — get send new chat form
app.get("/chats/:id", (req, res) => {
    let { id } = req.params;
    Chat.findById({ _id: id })
        .then((result) => {
            res.render("editChatForm.ejs", { result });
        })
        .catch(e => res.send(e));
});

// POST — create/insert new received chat
app.post("/chats", (req, res) => {
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

// PUT — put the updated message to the db
app.put("/chats/:id", (req, res) => {
    let { id } = req.params;
    Chat.findByIdAndUpdate({_id: id}, {...req.body, updated_at: new Date()}, {runValidators: true, returnDocument: "after"})
    .then(result => {
        console.log("Updated chat: ", result);
        res.redirect("/chats");
    })
    .catch(e => res.send(e));
});

app.listen(8080, () => {
    console.log("App server is listening on port 8080...");
});