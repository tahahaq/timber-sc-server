var mongoose = require("mongoose");

sourceSchema = new mongoose.Schema({
    location_coordinates : String,
    size : String,
    weight : String,
    color : String,
    company : String,
    company_id : String,
    member_id : String,
    timber_id : String,
    participant : String,
    industry_standard_certification : String,
    timestamp : String,
    is_approved : Boolean
});

//MODEL
module.exports = mongoose.model("sourceSchema", sourceSchema);