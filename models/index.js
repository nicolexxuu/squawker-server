const mongoose = require("mongoose");
mongoose.set("debug", true);
mongoose.Promise = Promise;

// mongoose.connect("mongodb://localhost/warbler", {
// mongoose.connect("mongodb://127.0.0.1/warbler", {
//     keepAlive: true,
// })
mongoose.connect("mongodb+srv://nicolexxuu:ktnx2929!@cluster0.iqhnbmi.mongodb.net/?retryWrites=true&w=majority", {
    keepAlive: true,
})

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", function () {
    console.log("Connected successfully");
});

module.exports.User = require("./user");
module.exports.Message = require("./message");
