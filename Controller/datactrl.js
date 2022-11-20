const datamodel=require('../Model/datamodel')
const fs = require('fs');
var path = require('path');



exports.get_applicant = (req,res,next)=>{
    datamodel.findApplicant(req.query.name).then(data => res.json(data));
}

exports.get_expired_permits = (req,res,next)=>{
    datamodel.findExpiredPermits(req.query.date).then(data => res.json(data));
}

exports.get_by_street = (req,res,next)=>{
    datamodel.findByStreet(req.query.street).then(data => res.json(data));
}

exports.add_new_entry = (req,res,next)=>{
    var index = Number(req.query.index);
    var jsonPath = path.join(__dirname, '..', 'Public','truckdata.json');
    var truckdata = JSON.parse(fs.readFileSync(jsonPath));
    index = index - 1
    datamodel.addNewEntry(truckdata[index]).then(data => res.json('success'));
}

exports.get_closest_truck = (req,res,next)=>{
    datamodel.getClosestTruck(req.query.long,req.query.lat).then(data => res.json(data));
}