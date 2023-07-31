import dal_mysql from "../Utils/dal_mysql";
import User from "../Models/User";
import { OkPacket } from "mysql";

const addUser = async (newUser: User) => {
    const sqlCommand = `
    INSERT INTO users (user_name, user_email, password, user_create, user_type) 
    VALUES ('${newUser.user_name}','${newUser.user_email}','${newUser.password}','${newUser.user_create}','${newUser.user_type}');
    `
    const result: OkPacket = await dal_mysql.execute(sqlCommand);
    newUser.id = result.insertId;
    
    return newUser;
}

const deleteUser = async (id: number) => {
    const sqlCommand = `DELETE FROM users WHERE id=${id}`;
    await dal_mysql.execute(sqlCommand);
}

const updateUser = async (updateUser: User) => {
    const sqlCommand = `
    UPDATE users 
    SET
    user_name = '${updateUser.user_name}',
    user_email = '${updateUser.user_email}',
    password = '${updateUser.password}',
    user_type ='${updateUser.user_type}'
    WHERE (id=${updateUser.id});
    `;
    await dal_mysql.execute(sqlCommand);
}
const checkLogin = async (user: User) => {
    const sqlCommand = `SELECT count(*) as userok, user_type ,id
      FROM users
      WHERE user_name='${user.user_name}' AND password='${user.password}'`;
    const result = await dal_mysql.execute(sqlCommand);
    return {
      userok: result[0].userok === 1,
      user_type: result[0].user_type,
      user_code: result[0].id,
      
    };
  };
  
const getUserList = async () => {
    const sqlCommand = `SELECT id,user_name,user_email FROM users`;
    const users = await dal_mysql.execute(sqlCommand);
    return users;
}
const getUserAdmin = async () =>{
    const sqlCommand =`SELECT * FROM users WHERE user_type = 'admin'`;
    const userAdmin = await dal_mysql.execute(sqlCommand);
    return userAdmin;
}
const checkEmailAvailability = async (user_email: any) => {
    try {
      const sqlCommand = `SELECT COUNT(*) AS email_count FROM users WHERE user_email = '${user_email}'`;
      const result = await dal_mysql.execute(sqlCommand);
      return {
        email_count: result[0].email_count === 0,
      };
    } catch (error) {
      console.error("Error checking email availability:", error);
      throw error; 
    }
  };

const test = () => {
    return "all working :)";
}

export default {
    addUser, deleteUser, updateUser, checkLogin, getUserList, getUserAdmin, test, checkEmailAvailability
}