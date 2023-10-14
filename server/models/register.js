const { mongoose } = require("mongoose");
const { Articles } = require("../schema/register");

    
const DatabaseArticles = mongoose.model('Articles', Articles);
    
module.exports = {
    DatabaseArticles
}