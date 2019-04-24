var mongoose = require("mongoose");

packagerSchema = new mongoose.Schema({
    num_of_length : String,
    len_of_each: String,
    size_piece_meter: String,
    batch_id: String,
    timber_id: String,
    participant : String,
    member_id: String,
    company : String,
    company_id : String,
    industry_standard_certification : String,
    timestamp : String,
    is_approved : Boolean


});

//MODEL
module.exports = mongoose.model("packagerSchema", packagerSchema);