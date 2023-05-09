
const { Schema , model } = require("mongoose");

const googleDocsSchema = new Schema({
    _id: String,
    data: Object
})

module.exports = model("GoogleDocs", googleDocsSchema);