var exports = module.exports = {},
    axios = require('axios'),
    constants = require('../utils/constants'),
    sourceModel = require('../models/Source'),
    shipperModel = require('../models/Shipper'),
    designerModel = require('../models/Designer'),
    packagerModel = require("../models/Packager");


exports.getDataByTimberId = async (id) => {
    try {
        console.log(id)
        let requests = {
            source : {},
            shipper : {},
            designer : {},
            packager : {}
        };
        let ifSourceExist = await sourceModel.findOne({timber_id : id});
        if(ifSourceExist){
            let source = await axios.get(constants.hyperledgerUrl + `Source/${id}` );
            requests.source = source.data;
        }
       let ifShipperExist = await shipperModel.findOne({timber_id: id});
        if(ifShipperExist){
            let source =await axios.get(constants.hyperledgerUrl + `Shipper/${id}`);
            requests.shipper = source.data;
        }
        let ifDesignerExist = await  designerModel.findOne({timber_id : id});
        if(ifDesignerExist){
            let designer = await axios.get(constants.hyperledgerUrl + `Designer/${id}`);
            requests.designer = designer.data;
        }
        let ifPackagerExist = await  packagerModel.findOne({timber_id : id});
        if(ifPackagerExist){
            let packager = await axios.get(constants.hyperledgerUrl + `Packager/${id}`);
            requests.packager = packager.data;
        }

        return requests;

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};



exports.getPendingRequests = async ({uid}) => {
    try {
        if(uid !== constants.adminUid){
            throw new Error("You don't have permission to view this!")
        }
        let requests = {
            source : [],
            shipper : [],
            designer : [],
            packager : []
        };
        requests.source = await sourceModel.find({is_approved : false});
        requests.shipper= await shipperModel.find({is_approved : false});
        requests.designer =await designerModel.find({is_approved : false});
        requests.packager = await packagerModel.find({is_approved : false});

        return requests;

    } catch (e) {
        console.log(e);
        throw new Error(e);
    }
};

