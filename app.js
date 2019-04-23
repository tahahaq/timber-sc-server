let express = require("express"),
    methodOverride = require("method-override"),
    app = express(),
    cors = require('cors'),
    constants = require('./utils/constants'),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose");


var admin = require("firebase-admin");
var serviceAccount = require("./utils/service-account-key");

let participantRoutes = require('./routes/participant');
let adminRoutes = require('./routes/admin');


admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
    databaseURL: "https://time-sc.firebaseio.com"
});

mongoose.connect(constants.mongodbUrl);
app.use(bodyParser.json({extended: true}));
app.use(cors());
app.use(methodOverride("_method"));


////////////////////////---------------------------------------------  USER ROUTES -----------------------------------------------/////////////////////////

app.use('/participant', participantRoutes);
app.use('/admin' , adminRoutes);


const port = process.env.PORT || 8080;
app.listen(port);

console.log(`Timber-SC Server listening on ${port}`);

module.exports.app = app;