var exports = module.exports = {},
    axios = require('axios'),
    constants = require('../utils/constants'),
    sourceModel = require('../models/Source'),
    shipperModel = require('../models/Shipper'),
    designerModel = require('../models/Designer'),
    packagerModel = require("../models/Packager");

exports.approveRequest = async (request) => {
    try {
        if (constants.adminUid === request.uid) {
            switch (request.participant) {
                case 'Source':
                    let data = await sourceModel.findById(request._id);
                    if(!data){
                        throw new Error("Can't find data on given id")
                    }
                    let object = data.toObject();
                    delete object._id;
                    delete object.__v;
                    delete object.is_approved;
                    delete object.participant;
                    await axios.post(constants.hyperledgerUrl + 'Timber', {
                        timber_id: data.timber_id,
                        timestamp : data.timestamp,
                        location_coordinates: data.location_coordinates,
                        size: data.size,
                        weight: data.weight,
                        color: data.color,
                        owner: constants.owner_namespace + data.member_id
                    });
                    await axios.post(constants.hyperledgerUrl + 'Source' , object);
                    await sourceModel.findByIdAndUpdate(request._id, {is_approved: true});
                    return constants.responseMessages.Success;
                case 'Shipper' :
                    let data1 = await shipperModel.findById(request._id);
                    if(!data1){
                        throw new Error("Can't find data on given id")
                    }
                    let object1 = data1.toObject();
                    delete object1._id;
                    delete object1.__v;
                    delete object1.participant;
                    await axios.post(constants.hyperledgerUrl + 'Shipper', object1);
                    await shipperModel.findByIdAndUpdate(request._id, {is_approved: true});
                    return constants.responseMessages.Success;
                case 'Designer' :
                    let data2 = await shipperModel.findById(request._id);
                    if(!data2){
                        throw new Error("Can't find data on given id")
                    }
                    let object2 = data2.toObject();
                    delete object2._id;
                    delete object2.__v;
                    delete object2.participant;
                    await axios.post(constants.hyperledgerUrl + 'Designer', object2);
                    await designerModel.findByIdAndUpdate(request._id, {is_approved: true});
                    return constants.responseMessages.Success;
                case 'Packager' :
                    let data3 = await shipperModel.findById(request._id);
                    if(!data3){
                        throw new Error("Can't find data on given id")
                    }
                    let object3 = data3.toObject();
                    delete object3._id;
                    delete object3.__v;
                    delete object3.participant;
                    await axios.post(constants.hyperledgerUrl + 'Packager', object3);
                    await packagerModel.findByIdAndUpdate(request._id, {is_approved: true});
                    return constants.responseMessages.Success;

            }
        }
        throw new Error("Request not authenticated")
    } catch (e) {
        console.log(e)
    }
};

exports.insertRequest = async (request) => {
    try {
        request["is_approved"] =false;
        request["timestamp"] = Date.now();
        switch (request.participant) {
            case 'Source':
                await sourceModel.create(request);
                return constants.responseMessages.Success;
            case'Packager':
                packagerModel.create(request);
                return constants.responseMessages.Success;
            case 'Shipper':
                shipperModel.create(request);
                return constants.responseMessages.Success;
            case 'Designer':
                designerModel.create(request);
                return constants.responseMessages.Success;
        }
    } catch (e) {
        console.log(e)
    }
};
