import express, { NextFunction, Request, Response } from "express";
import User from "../Models/User";
import userLogic from "../Logic/LoginLogic";

const loginRouter = express.Router();


// addUser, deleteUser, updateUser, checkLogin, getUserList
loginRouter.post(
    "/add",
    async (request: Request, response: Response, next: NextFunction) => {
        const newUser: User = request.body;
        return response.status(201).json(await userLogic.addUser(newUser));
    }
)

loginRouter.delete(
    "/delete/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const userId: number = +request.params.id;
        return response.status(204).json(await userLogic.deleteUser(userId));
    }
)

loginRouter.put(
    "/update",
    async (request: Request, response: Response, next: NextFunction) => {
        const updateUser: User = request.body;
        return response.status(201).json(await userLogic.updateUser(updateUser));
    }
)

loginRouter.post(
    "/checkLogin",
    async (request: Request, response: Response, next: NextFunction) => {
      const userLogin: User = request.body;
      const result = await userLogic.checkLogin(userLogin);
  
      if (result.userok) {
        return response.status(200).json({ message: "ok", user_type: result.user_type ,user_code: result.user_code});
      }
  
      return response.status(401).json("bad");
    }
  );

  loginRouter.post(
    "/checkEmailAvailability",
    async (request: Request, response: Response, next: NextFunction) => {
      try {
        const user_email: string = request.body.user_email;
          if (!user_email || typeof user_email !== "string") {
          return response.status(400).json({ message: "Invalid request body" });
        }
          const result = await userLogic.checkEmailAvailability(user_email);
  
        const { email_count } = result;
  
        return response.status(200).json({ message: "ok", email_count: email_count });
      } catch (error) {
        console.error("Error checking email availability:", error);
        return response.status(500).json({ message: "Internal server error" });
      }
    }
  );
  

loginRouter.get(
    "/getAll",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await userLogic.getUserList());
    }
);

loginRouter.get(
    "/test",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await userLogic.test());
    }
)
loginRouter.get(
    "/userAdmin",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await userLogic.getUserAdmin());
    }
)

export default loginRouter;