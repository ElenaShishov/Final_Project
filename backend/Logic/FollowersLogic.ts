import dal_mysql from "../Utils/dal_mysql";
import { OkPacket } from "mysql";


const getFollowersAll = async () => {
    const sqlCommand = `SELECT * FROM vacations.followers`;
    const followers = await dal_mysql.execute(sqlCommand);
    return followers;
}
const getFollowersByUser = async (user_code: any) => {
  const sqlCommand = `SELECT * FROM vacations.followers WHERE user_code =${user_code}`;
  const followers = await dal_mysql.execute(sqlCommand);
  return followers;
}
const getFollowersByVacation = async (vacation_code:number) => {
    const sqlCommand = `SELECT COUNT(*) as vacationFollowers FROM vacations.followers WHERE vacation_code = ${vacation_code}`;
    const followers = await dal_mysql.execute(sqlCommand);
    return followers[0]?.vacationFollowers || 0;
  };

const getFollowers = async (vacation_code: any) => {
      const sqlCommand = `
        SELECT COUNT(*) AS num_followers
        FROM followers
        WHERE vacation_code = ${vacation_code}
      `;
      const followers = await dal_mysql.execute(sqlCommand);
      return followers[0].num_followers; 
  };

const  deleteFollowerById = async (vacation_code:number , user_code:number)=>{
       const sqlCommand = `DELETE FROM followers
         WHERE vacation_code = ${vacation_code} 
         AND user_code = ${user_code}
      `;
  await dal_mysql.execute(sqlCommand);
};

const addFollower = async (newFollower:any) =>{;
       const sqlCommand = `INSERT INTO followers
       (vacation_code, user_code) 
       VALUES (${newFollower.vacation_code}, 
               ${newFollower.user_code})
        `;
await dal_mysql.execute(sqlCommand);
};

   

export default{
    getFollowersAll, getFollowersByVacation, getFollowers, deleteFollowerById, addFollower, getFollowersByUser
}