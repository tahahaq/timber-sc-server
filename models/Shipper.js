var mongoose = require("mongoose");

shipperSchema = new mongoose.Schema({
    batch_id : String,
    company: String,
    quantity: String,
    timber_id: String,
    company_id : String,
    participant : String,
    est_delivery_time: String,
    member_id: String,
    industry_standard_certification : String,
    timestamp : String,
    is_approved : Boolean

});

module.exports = mongoose.model("shipperSchema", shipperSchema);
