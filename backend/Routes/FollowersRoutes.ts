import FollowersLogic from "../Logic/FollowersLogic";
import express, { NextFunction, Request, Response } from "express";

const FollowersRouter = express.Router();

FollowersRouter.get(
    "/getAll",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await FollowersLogic.getFollowersAll());
    }

)

  FollowersRouter.get(
    "/getById/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const vacation_code = +request.params.id;
        const followersCount = await FollowersLogic.getFollowers(vacation_code);
        return response.status(200).json({ vacationFollowers: followersCount });
      
    }
  );
  FollowersRouter.get(
    "/getByUserCode/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const user_code = +request.params.id;
        const followersCount = await FollowersLogic.getFollowersByUser(user_code);
        return response.status(200).json({ vacationFollowers: followersCount });
      
    }
  );
  FollowersRouter.post(
    "/add",
    async (request: Request, response: Response, next: NextFunction) => {
        const newFollower = request.body;
        return response.status(201).json(await FollowersLogic.addFollower(newFollower));
    }
)

FollowersRouter.post(
  "/remove",
   async (request: Request, response: Response, next: NextFunction) => {
   const { vacation_code, user_code } = request.body;

  try {
    await FollowersLogic.deleteFollowerById(vacation_code, user_code);
    return response.status(201).json({ message: "Follower removed successfully." });
  } catch (error) {
    console.error("Error removing follower:", error);
    return response.status(500).json({ error: "Failed to remove follower." });
  }
});
  
export default FollowersRouter;