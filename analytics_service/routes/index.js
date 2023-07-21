const router = require("express").Router();
const {
  getListOfAvailabeData,
  getEmotion,
  getHeadpose,
  getEyegaze,
  getEyegazeFocus,
  getTextSummary,
  getSentiment,
  getMeetingInfo,
  getStress,
  getDeception,
  getLipSync
} = require("../controller/analyticsApi");
const { verifyjwt } = require("../middleware/auth");

router.get("/emytanalytics/list",verifyjwt, getListOfAvailabeData);
router.get("/emytanalytics/emotionanalytics", verifyjwt, getEmotion);
router.get("/emytanalytics/headposeanalytics", verifyjwt, getHeadpose);
router.get("/emytanalytics/eyegazeanalytics",verifyjwt, getEyegaze);
router.get("/emytanalytics/eyegazefocusanalytics",verifyjwt, getEyegazeFocus);
router.get("/emytanalytics/textsummary", verifyjwt, getTextSummary);
router.get("/emytanalytics/sentiment", verifyjwt, getSentiment);
router.get("/emytanalytics/meetinginfo", verifyjwt, getMeetingInfo);
router.get('/emytanalytics/stressanalytics',verifyjwt, getStress)
router.get('/emytanalytics/deceptionanalytics',verifyjwt, getDeception)
router.get('/emytanalytics/lipsyncanalytics',verifyjwt, getLipSync)

module.exports = router;
