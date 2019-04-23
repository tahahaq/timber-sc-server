let express = require('express'),
    db_insert = require('../db_functions/insert'),
    db_read = require('../db_functions/read'),
    constants = require('../utils/constants'),
    functions = require('../utils/functions'),
    router = express.Router();


router.post('/is-admin', function (req, res) {
    functions.isAdmin(req.body).then((response) => {

        //SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


router.post('/pending-request', function (req, res) {
    db_read.getPendingRequests(req.body).then((response) => {

        //SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});


router.post('/approve-request', function (req, res) {
    console.log("here")
    db_insert.approveRequest(req.body).then((response) => {
        //SUCCESS
        res.status(200).send(
            {
                responseCode: 200,
                responseMessage: constants.responseMessages.Success,
                data: {
                    result: response
                }
            }
        )
    }).catch((error) => {
        //ERROR
        res.status(500).send(
            {
                responseCode: 500,
                responseMessage: error.message
            }
        )
    });
});



module.exports = router;
