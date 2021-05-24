const mongoose = require("mongoose")

module.exports = mongoose.connect(process.env.DB_URI, {
    useUnifiedTopology: true,
    useNewUrlParser: true
})
    .then(() => console.log("database connected"))
    .catch((error) => console.log("error while connecting db", error))