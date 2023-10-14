
const express = require('express');
const router = express.Router();

const {HandleUserRegReq, HandleUserRegReqWithPatchRequest, HandleUserRegReqWithDeleteRequest, HandleUserRegReqGetAllRequest, HandleUserRegReqGetById} = require("../controllers/register");



// router.route('/register')
// .

router.post('/', HandleUserRegReq);



router.get("/" , HandleUserRegReqGetAllRequest)

router.get("/:id" , HandleUserRegReqGetById)

  router.patch("/:id" ,  HandleUserRegReqWithPatchRequest)

  
  router.delete("/:id" , HandleUserRegReqWithDeleteRequest)

  

  
module.exports = router;
