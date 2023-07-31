import dal_mysql from "../Utils/dal_mysql";
import Holiday from "../Models/Holiday";
import { OkPacket } from "mysql";

const addHoliday = async (newHoliday: Holiday) => {
    const sqlCommand = `
    INSERT INTO vacations.holidays
    (holidayDestination,holidayDescription,holidayStartDate,holidayEndDate,price,holidayImage)
     VALUES (
        '${newHoliday.holidayDestination}',
        '${newHoliday.holidayDescription}',
        '${newHoliday.holidayStartDate}',
        '${newHoliday.holidayEndDate}',
        '${newHoliday.price}',
        '${newHoliday.holidayImage}');
    `
    
    const result: OkPacket = await dal_mysql.execute(sqlCommand);
    newHoliday.holidayCode = result.insertId;
    return newHoliday;
}
const deleteHoliday = async (holidayCode: number) => {
    const sqlCommand = `DELETE FROM holidays WHERE holidayCode=${holidayCode}`;
    await dal_mysql.execute(sqlCommand);
}
const updateHoliday = async (updateHoliday: Holiday) => {
    const sqlCommand = `
    UPDATE vacations.holidays 
    SET holidayDestination = '${updateHoliday.holidayDestination}',
     holidayDescription = '${updateHoliday.holidayDescription}', 
     holidayStartDate = '${updateHoliday.holidayStartDate}',
     holidayEndDate = '${updateHoliday.holidayEndDate}', 
     price = '${updateHoliday.price}', 
     holidayImage = '${updateHoliday.holidayImage}' 
     WHERE (holidayCode = '${updateHoliday.holidayCode}')
    `;
    await dal_mysql.execute(sqlCommand);
}
const getholidaysAll = async () => {
    const sqlCommand = `SELECT * FROM vacations.holidays`;
    const holidays = await dal_mysql.execute(sqlCommand);
    return holidays;
}
const getById = async (holidayCode:number)=>{
    const SQLcmd=` SELECT * FROM vacations.holidays WHERE holidayCode = '${holidayCode}'`;
    console.log(SQLcmd)
    const result = await dal_mysql.execute(SQLcmd);
    console.log(result);
    return result;
};



export default{
    addHoliday, deleteHoliday, updateHoliday, getholidaysAll, getById

}