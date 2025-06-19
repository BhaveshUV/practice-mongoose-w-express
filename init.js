const mongoose = require("mongoose");
const Chat = require("./models/chat");

//---------------- Set up MongoDB database connection ----------------//
async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/chatApp');
}

main()
    .then(() => console.log("Connected to MongoDB server using mongoose"))
    .catch(err => console.log(err));

//-------- Create sample documents and insert to chatApp database --------//
let allChats = [
    {
        from: "agentA",
        to: "agentB",
        msg: "Work-in progress",
        created_at: new Date()
    },
    {
        from: "sanket",
        to: "rakesh",
        msg: "Did you get the msg?",
        created_at: new Date()
    },
    {
        from: "azad",
        to: "joyce",
        msg: "Hey, let's go out to play!",
        created_at: new Date()
    },
    {
        from: "dhruv",
        to: "urvi",
        msg: "Did you understand?",
        created_at: new Date()
    },
    {
        from: "sushant",
        to: "kunal",
        msg: "Wanna see the sky?",
        created_at: new Date()
    },
];

Chat.insertMany(allChats)
    .then(res => console.log(res))
    .catch(e => console.log(e));