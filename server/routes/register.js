
const express = require('express');
const router = express.Router();

const { 
  HandleUserRegReq,
  HandleUserRegReqWithPatchRequest,
  HandleUserRegReqWithDeleteRequest,
  HandleUserRegReqGetAllRequest,
  HandleUserRegReqGetById,
  HandleUserRegReqGetAllRequestForTodayData,
  HandleUserRegReqPreviewGetByIdForAMP,
  HandleUserRegReqPreviewGetById }
  = require("../controllers/register");

router.post('/', HandleUserRegReq);
router.get("/", HandleUserRegReqGetAllRequest)
router.get("/today", HandleUserRegReqGetAllRequestForTodayData)
router.get("/:id", HandleUserRegReqGetById)
router.get("preview/:id", HandleUserRegReqPreviewGetById)
router.get("preview/amp/:id", HandleUserRegReqPreviewGetByIdForAMP)
router.patch("/:id", HandleUserRegReqWithPatchRequest)
router.delete("/:id", HandleUserRegReqWithDeleteRequest)




module.exports = router;
