var exports = module.exports = {},
    constants = require('./constants'),
    admin = require("firebase-admin");


exports.isAdmin = async (admin ) => {
    try {
        if(admin.uid === constants.adminUid){
            return true;
        }
        throw new Error("Credential don't match")
    }catch (e) {
        console.log(e);
        throw new Error(e)
    }
};

exports.authenticateRequest = async (credentials) => {
    try {
        admin.auth().getUser(credentials.uid)
            .then(function(userRecord) {
                // See the UserRecord reference doc for the contents of userRecord.
                console.log('Successfully fetched user data:', userRecord.toJSON());
            })
            .catch(function(error) {
                console.log('Error fetching user data:', error);
            });

    }catch (e) {

    }
};