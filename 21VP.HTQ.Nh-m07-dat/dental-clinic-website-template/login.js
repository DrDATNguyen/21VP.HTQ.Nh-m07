// dbOperations.js

const config = require('./dbConfig');
const sql = require('msnodesqlv8');

async function loginUser(username, password) {
  
    // // Tạo pool kết nối
    // const connection = await sql.connect(config);

    // // Kiểm tra trạng thái kết nối
    // if (connection.connected) {
    //   console.log('Connected to SQL Server successfully.');
    // } else {
    //   console.log('Failed to connect to SQL Server.');
    //   throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
    // }

    // Tạo truy vấn kiểm tra đăng nhập
    const loginQuery = `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`;
    // const params = [username, password];
    return new Promise((resolve, reject) => {
      sql.query(config, loginQuery,(err, result) => {
        if (err) {
          reject(err);
        } else {
          resolve(result);
          if (result.recordset.length > 0) {
            console.log('Login successful.');
            return result.recordset;
          }
        }
      });
    }).catch((error) => {
      console.error("Error in login:", error);
      throw error; // Re-throw the error to maintain the unhandled rejection
    });

  //   // Kiểm tra kết quả đăng nhập
  //   if (result.recordset.length > 0) {
  //     console.log('Login successful.');
  //     return result.recordset;
  //   } else {
  //     console.log('Login failed. Invalid username or password.');
  //     throw new Error('Tên đăng nhập hoặc mật khẩu không hợp lệ.');
  //   }
  // } catch (error) {
  //   console.error('Error during login:', error);
  //   throw error;
  // } finally {
  //   // Đảm bảo đóng kết nối sau khi hoàn thành
  //   await sql.close();
  // }
}

module.exports = {
  loginUser: loginUser
};
