import express from "express";
import {
  getUser,
  fetchUser,
  UpdateUser,
  RemoveFollower,
  RemoveFollowing,
  FollowUser,
} from "../controllers/users.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/getuser", verifyToken, getUser);
router.get("/getuser/:id", verifyToken, fetchUser); 
router.put("/edituser/:userId", verifyToken, UpdateUser);
router.put("/removefollower", verifyToken, RemoveFollower);
router.put("/removefollowing", verifyToken, RemoveFollowing);
router.post("/followuser", verifyToken, FollowUser);

export default router;
