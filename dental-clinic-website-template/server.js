const express = require('express');
const session = require('express-session');
// const sql = require('mssql/msnodesqlv8');
const sql = require('mssql');
// const { reset } = require('nodemon');
// const dboperations = require('./cc');
// const login = require('./login');
// const config = require('./dbConfig'); 
// var flash = require('connect-flash');
//bring in mongoose
// const mongoose = require('mongoose');

//bring in method override
// const BlogControllers = require('./controllers/blogControllers')
// const methodOverride = require('method-override');
// const userRouter = require('./routes/userrouter');
// const blogRouter = require('./routes/blogsrouter');
// const Blog = require('./models/Blog');
const app = express();
const bodyParser = require('body-parser');
const path = require('path');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: true
}));

// app.use(flash());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'css')));
// app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));


//set template engine
app.set('view engine', 'ejs');
// app.use(express.urlencoded({ extended: false }));
// app.use(methodOverride('_method'));
//route for the index
app.set('views', path.join(__dirname, 'views'))
// app.set('font-users', path.join(__dirname, 'font-users'))
app.use(express.static(path.join(__dirname, 'public')));
const config = {
    user: 'sa',
    password: '123456',
    server: 'DESKTOP-2GRJTVJ\\SQLEXPRESS',
    DSN: 'abc', 
    database: 'UserDatabase' ,
    options: {
      encrypt: true, // Use this option if you're on Windows Azure
      trustServerCertificate: true, // Use this option to trust self-signed certificates
  }
};

// var express = require('express');
// var app = express();

app.get('/', function (req, res) {
   
    // var sql = require("mssql");

    // config for your database
    // connect to your database
    sql.connect(config, function (err) {
    
        if (err) console.log(err);
        try {
    
            res.render('login');
        
          } catch (error) {
            // Xử lý lỗi nếu có
            console.error(error);
            res.status(500).send('Internal Server Error');
          }
        // create Request object
        // var request = new sql.Request();
           
        // // query to the database and get the records
        // request.query('select * from Users', function (err, recordset) {
            
        //     if (err) console.log(err)

        //     // send records as a response
        //     res.send(recordset);
            
        // });
    });
});

var server = app.listen(5000, function () {
    console.log('Server is running..');
});
// async function main() {
//   try {
//     const result = await dboperations.getLoginDetails();
//     console.log("Kết nối đến SQL Server thành công.");
//     console.log("Kết quả:", result);
//   } catch (error) {
//     console.error("Lỗi kết nối đến SQL Server:", error);
//   }
// //   const username = 'user3'; // Thay thế bằng tên đăng nhập thực tế
// // const password = 'password1'; // Thay thế bằng mật khẩu thực tế

// // try {
// //  const user = await dbOperations.loginUser(username, password);
// //  if (user.length > 0) {
// //    console.log('Login successful:', user);
// //  } else {
// //    console.log('Login failed. User not found or invalid credentials.');
// //  }
// // } catch (error) {
// //  console.error('Error during login process:', error);
// // }
// }
// dboperations.getLoginDetails().then(result=>{
// console.log(result);


// })
app.get('/', async (request, response) => {
  try {
    
    response.render('login');

  } catch (error) {
    // Xử lý lỗi nếu có
    console.error(error);
    response.status(500).send('Internal Server Error');
  }
});
//Route xử lý đăng nhập
app.post('/login',async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  console.log(username);
  console.log(password);

  try {
    // Sử dụng await khi gọi hàm loginUser
    const resultLogin = await loginUser(username, password);

    if (resultLogin) {
        // Login successful, resultLogin contains user data
        res.send('Login successful');
      } else {
        // Login failed, resultLogin is null or a designated failure indicator
        res.send('Login failed. Invalid credentials.');
      }
    } catch (error) {
      console.error('Error during login process:', error);
      res.status(500).send('Internal Server Error');
    }
  });
// app.post('/signup', async (req, res) => {
//   try {
//      // Kết nối đến cơ sở dữ liệu
//      const connection = await sql.connect(config);

//      // Kiểm tra trạng thái kết nối
//      if (connection.connected) {
//        console.log('Connected to SQL Server successfully.');
//      } else {
//        console.log('Failed to connect to SQL Server.');
//        throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
//      }

//     // Lấy thông tin từ body của request
//     const fullName = req.body.fullName;
//     const password = req.body.password;
//     const birthDate = req.body.birthDate;
//     const address = req.body.address;
//     const phoneNumber = req.body.phoneNumber;


//     // Kiểm tra xem số điện thoại đã tồn tại chưa
//     // const checkPhoneNumberQuery = `SELECT * FROM Customer WHERE PhoneNumber = '${phoneNumber}'`;
//     // const existingCustomer = await sql.query(checkPhoneNumberQuery);

//     // if (existingCustomer.recordset.length > 0) {
//     //   return res.status(400).json({ error: 'Số điện thoại đã được sử dụng.' });
//     // }

//     // Thực hiện truy vấn để thêm khách hàng mới
//     const insertQuery = `
//       INSERT INTO Customer (FullName, BirthDate, Address, PhoneNumber, Password)
//       VALUES ('${fullName}', '${birthDate}', '${address}', '${phoneNumber}', '${password}')
//     `;
//     const request = new sql.Request();
// request.input('fullName', sql.NVarChar, fullName);
// request.input('birthDate', sql.Date, birthDate);
// request.input('address', sql.NVarChar, address);
// request.input('phoneNumber', sql.NVarChar, phoneNumber);
// request.input('password', sql.NVarChar, password);

//   try {
//     const result = await request.query(insertQuery);
//     console.log('Insert successful:', result);
//   } catch (error) {
//     console.error('Error during insert:', error);
//   }
    
//     await sql.query(insertQuery);
//     const result = await sql.query(insertQuery);
//     console.log(result);

//     // Trả về thông báo thành công
//     res.status(200).json({ message: 'Đăng ký tài khoản thành công.' });
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
//   } finally {
//     // Đảm bảo đóng kết nối sau khi hoàn thành
//     await sql.close();
//   }
// });
app.post('/signup', async (req, res) => {
    try {
      // Kết nối đến cơ sở dữ liệu
      const connection = await sql.connect(config);
  
      // Kiểm tra trạng thái kết nối
      if (!connection.connected) {
        console.log('Failed to connect to SQL Server.');
        throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
      }
  
      // Lấy thông tin từ body của request
      const fullName = req.body.fullName;
      const password = req.body.password;
      const birthDate = req.body.birthDate;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
  
      // Kiểm tra xem số điện thoại đã tồn tại chưa
      const checkPhoneNumberQuery = `SELECT * FROM Customer WHERE PhoneNumber = @phoneNumber`;
      const checkPhoneNumberRequest = new sql.Request();
      checkPhoneNumberRequest.input('phoneNumber', sql.NVarChar, phoneNumber);
  
      const existingCustomer = await checkPhoneNumberRequest.query(checkPhoneNumberQuery);
  
      if (existingCustomer.recordset.length > 0) {
        return res.status(400).json({ error: 'Số điện thoại đã được sử dụng.' });
      }
  
      // Thực hiện truy vấn để thêm khách hàng mới
      const insertQuery = `
        INSERT INTO Customer (FullName, BirthDate, Address, PhoneNumber, Password)
        VALUES (@fullName, @birthDate, @address, @phoneNumber, @password)
      `;
  
      const insertRequest = new sql.Request();
      insertRequest.input('fullName', sql.NVarChar, fullName);
      insertRequest.input('birthDate', sql.Date, birthDate);
      insertRequest.input('address', sql.NVarChar, address);
      insertRequest.input('phoneNumber', sql.NVarChar, phoneNumber);
      insertRequest.input('password', sql.NVarChar, password);
  
      const result = await insertRequest.query(insertQuery);
      console.log('Insert successful:', result);
  
      // Trả về thông báo thành công
      res.status(200).json({ message: 'Đăng ký tài khoản thành công.' });
    } catch (error) {
      if (error.name === 'RequestError' && error.number === 2627) {
        // Xử lý lỗi khi vi phạm ràng buộc duy nhất (số điện thoại trùng lặp)
        res.status(400).json({ error: 'Số điện thoại đã được sử dụng.' });
      } else {
        console.error('Error during signup:', error);
        res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
      }
    } finally {
      // Đảm bảo đóng kết nối sau khi hoàn thành
      await sql.close();
    }
  });
  
// app.post('/signup', async (req, res) => {
//   try {
//     // Kết nối đến cơ sở dữ liệu
//     await sql.connect(config);

//     // Kiểm tra trạng thái kết nối
//     if (sql.connected) {
//       console.log('Connected to SQL Server successfully.');
//     } else {
//       console.log('Failed to connect to SQL Server.');
//       return res.status(500).json({ error: 'Không thể kết nối đến cơ sở dữ liệu.' });
//     }

//     // Tiếp tục với xử lý đăng ký...
//   } catch (error) {
//     console.error('Error during signup:', error);
//     res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
//   } finally {
//     // Đảm bảo đóng kết nối sau khi hoàn thành
//     await sql.close();
//   }
// });

async function loginUser(username, password) {
  try {
    // Kết nối đến cơ sở dữ liệu
    const connection = await sql.connect(config);

  // Kiểm tra trạng thái kết nối
  if (connection.connected) {
    console.log('Connected to SQL Server successfully.');
  } else {
    console.log('Failed to connect to SQL Server.');
    throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
  }
    // Chuẩn bị truy vấn SQL
    const query = `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`;

    // Thực hiện truy vấn
    const result = await sql.query(query);

    if (result.recordset.length > 0) {
        // Đăng nhập thành công, trả về dữ liệu người dùng
        return result.recordset[0];
      } else {
        // Đăng nhập thất bại, trả về null hoặc một giá trị khác để chỉ định thất bại
        return null;
      }
    } catch (error) {
      console.error('Error during login:', error);
      throw error;
    } finally {
      await sql.close();
    }
  }
// async function loginUser(username, password) {
  
//   // Tạo pool kết nối
//   const connection = await sql.connect(config);

//   // Kiểm tra trạng thái kết nối
//   if (connection.connected) {
//     console.log('Connected to SQL Server successfully.');
//   } else {
//     console.log('Failed to connect to SQL Server.');
//     throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
//   }

//   // Tạo truy vấn kiểm tra đăng nhập
//   const loginQuery = `SELECT * FROM Users WHERE Username = '${username}' AND Password = '${password}'`;
//   // const params = [username, password];
//   return new Promise((resolve, reject) => {
//     sql.query(config, loginQuery,(err, result) => {
//       if (err) {
//         reject(err);
//       } else {
//         resolve(result);
//         if (result.recordset.length > 0) {
//           console.log('Login successful.');
//           return result.recordset;
//         }
//       }
//     });
//   }).catch((error) => {
//     console.error("Error in login:", error);
//     throw error; // Re-throw the error to maintain the unhandled rejection
//   });
// }

// //listen port
// app.listen(5000); 

// var express = require('express');
// var app = express();

// app.get('/', function (req, res) {
   
//     var sql = require("mssql");

//     // config for your database
//     var config = {
//         user: 'sa',
//         password: '123456',
//         server: 'DESKTOP-2GRJTVJ\\SQLEXPRESS',
//         DSN: 'abc', 
//         database: 'UserDatabase' ,
//         options: {
//           encrypt: true, // Use this option if you're on Windows Azure
//           trustServerCertificate: true, // Use this option to trust self-signed certificates
//       }
//     };

//     // connect to your database
//     sql.connect(config, function (err) {
    
//         if (err) console.log(err);

//         // create Request object
//         var request = new sql.Request();
           
//         // query to the database and get the records
//         request.query('select * from Users', function (err, recordset) {
            
//             if (err) console.log(err)

//             // send records as a response
//             res.send(recordset);
            
//         });
//     });
// });

// var server = app.listen(5000, function () {
//     console.log('Server is running..');
// });