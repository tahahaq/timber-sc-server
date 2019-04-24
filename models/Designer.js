var mongoose = require("mongoose");

designerSchema = new mongoose.Schema({
   style_id: String,
   num_of_length: String,
   len_of_each: String,
   size_piece_meter: String,
   participant : String,
   company : String,
   company_id : String,
   batch_id: String,
   timestamp : String,
   industry_standard_certification : String,
   timber_id: String,
   est_production_time: String,
   member_id: String,
   is_approved : Boolean

});

//MODEL
module.exports = mongoose.model("designerSchema", designerSchema);