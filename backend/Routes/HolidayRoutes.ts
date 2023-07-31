import express, { NextFunction, Request, Response } from "express";
import Holiday from "../Models/Holiday";
import HolidayLogic from "../Logic/HolidayLogic";

const HolidayRouter = express.Router();


HolidayRouter.post(
    "/add",
    async (request: Request, response: Response, next: NextFunction) => {
        const newHoliday: Holiday = request.body;
        return response.status(201).json(await HolidayLogic.addHoliday(newHoliday));
    }
)

HolidayRouter.delete(
    "/delete/:id",
    async (request: Request, response: Response, next: NextFunction) => {
        const holidayCode: number = +request.params.id;
        return response.status(204).json(await HolidayLogic.deleteHoliday(holidayCode));
    }
)

HolidayRouter.put(
    "/update",
    async (request: Request, response: Response, next: NextFunction) => {
        const updateHoliday: Holiday = request.body;
        return response.status(201).json(await HolidayLogic.updateHoliday(updateHoliday));
    }
)

HolidayRouter.get(
    "/getAll",
    async (request: Request, response: Response, next: NextFunction) => {
        return response.status(200).json(await HolidayLogic.getholidaysAll());
    }
)
HolidayRouter.get(
    "/getById/:id",
     async (request: Request, response: Response, next: NextFunction) => {
        const holidayCode :number= +request.params.id;
        return response.status(200).json(await HolidayLogic.getById(holidayCode));
    }

)

export default HolidayRouter;

function getById(account: number) {
    throw new Error("Function not implemented.");
}
