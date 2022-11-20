const express=require('express')
const router=express.Router();
const datactrl=require('../Controller/datactrl')

router.get('/applicant',datactrl.get_applicant)

router.get('/expired_permits',datactrl.get_expired_permits)

router.get('/address',datactrl.get_by_street)

router.get('/add_entry',datactrl.add_new_entry)

router.get('/get_closest_truck',datactrl.get_closest_truck)

module.exports=router