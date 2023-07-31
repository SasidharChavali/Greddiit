import express from "express";
import { AsktoJoin, LeaveSubGreddiit, 
    deleteSubGreddiit, getFeedSubGreddiits, getSubGreddiit, getUserSubGreddiits, GetPost, createPost,
    postComment, likePost, removelikePost, dislikePost, removedislikePost, AcceptRequest, JoinTempRejectedUser, CancelRequest, SavePost, 
    UnSavePost, AcceptRejectedUser, CreateReport,GetReports, BlockUser, GetUserName, FetchPostContent, 
    IgnoreReport, DeletePost, UserGrowth, PostsGrowth, VisitorsGrowth, ReportedPostsGrowth, CountVisitors} 
from "../controllers/subgreddiit.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.post("/joinrequest", verifyToken, AsktoJoin);
router.post("/leavegreddit", verifyToken, LeaveSubGreddiit);
router.delete("/deletegreddit", verifyToken, deleteSubGreddiit);
router.get("/fetchallgreddits",getFeedSubGreddiits);
router.get("/getgredditbyid/:id", getSubGreddiit);
router.get("/getmygreddits/:id", verifyToken, getUserSubGreddiits);
router.post("/getpost", GetPost);
router.post("/uploadpost", verifyToken, createPost);
router.post("/postcomment", verifyToken, postComment);
router.post("/likepost", verifyToken, likePost);
router.post("/removelikepost", verifyToken, removelikePost);
router.post("/dislikepost", verifyToken, dislikePost);
router.post("/removedislikepost", verifyToken, removedislikePost); 
router.post("/acceptrequest", AcceptRequest);
router.post("/jointemprejecteduser", verifyToken, JoinTempRejectedUser);
router.post("/cancelrequest", CancelRequest);
router.post("/savepost", verifyToken, SavePost);
router.post("/unsavepost", verifyToken, UnSavePost);
router.post("/acceptrejecteduser", verifyToken, AcceptRejectedUser);
router.post("/createreport", verifyToken, CreateReport);
router.get("/getreports/:id", GetReports);
router.post("/blockuser", BlockUser);
router.post("/getusername", GetUserName);
router.post("/fetchpostcontent", FetchPostContent);
router.post("/ignorereport", IgnoreReport); 
router.post("/deletepost", DeletePost); 
router.post("/usergrowth", UserGrowth);
router.post("/postsgrowth", PostsGrowth);
router.post("/visitorsgrowth", VisitorsGrowth);
router.post("/reportedpostsgrowth",ReportedPostsGrowth);
router.post("/countvisitors",CountVisitors);

export default router;
