const express = require('express');
const session = require('express-session');
// const sql = require('mssql/msnodesqlv8');
const sql = require('mssql');
// const { reset } = require('nodemon');
// const dboperations = require('./cc');
// const login = require('./login');
// const config = require('./dbConfig'); 
var flash = require('connect-flash');
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
const { CONNREFUSED } = require('dns');
app.use(session({
  secret: 'your-secret-key',
  resave: false,
  saveUninitialized: false
}));

app.use(flash());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'css')));
app.use(express.static(path.join(__dirname, 'js')));
app.use(express.static(path.join(__dirname, 'img')));
app.use(express.static(path.join(__dirname, 'lib')));



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
// app.get('/', async (request, response) => {
//   try {
    
//     response.render('addDrug');

//   } catch (error) {
//     // Xử lý lỗi nếu có
//     console.error(error);
//     response.status(500).send('Internal Server Error');
//   }
// });
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
        // Lưu MaKH vào session
        req.session.MaKH = resultLogin.MaKH;
        res.render('appointment');

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
      const checkPhoneNumberQuery = `SELECT * FROM KhachHang WHERE SDT = @phoneNumber`;
      const checkPhoneNumberRequest = new sql.Request();
      checkPhoneNumberRequest.input('phoneNumber', sql.NVarChar, phoneNumber);
  
      const existingCustomer = await checkPhoneNumberRequest.query(checkPhoneNumberQuery);
  
      if (existingCustomer.recordset.length > 0) {
        return res.status(400).json({ error: 'Số điện thoại đã được sử dụng.' });
      }
  
      // Thực hiện truy vấn để thêm khách hàng mới
      const insertQuery = `
        INSERT INTO KhachHang (HotenKH, Ngaysinh, Diachi, SDT, Matkhau)
        VALUES ('${fullName}', '${birthDate}', '${address}', '${phoneNumber}', '${password}')
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
    const query = `SELECT * FROM KhachHang WHERE SDT = '${username}' AND Matkhau = '${password}'`;

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

// app.post('/appoinment', async (req, res) => {
//   try {
//     // Kết nối đến cơ sở dữ liệu
//      const connection = await sql.connect(config);

//      // Kiểm tra trạng thái kết nối
//      if (connection.connected) {
//        console.log('Connected to SQL Server successfully.');
//      } else {
//        console.log('Failed to connect to SQL Server.');
//        throw new Error('Không thể kết nối đến cơ sở dữ liệu.');
//      }

//     // Lấy thông tin từ body của request
//     const HotenKH = req.body.fullname;
//     const SDT = req.body.SDT;
//     const tenNS = req.body.selectedDoctor;
//     const ngay = req.body.date;
//     const gio = req.body.time;
//     const ngayio = ngay + ' ' + gio;

//       // Lấy MaNS từ tên nha sĩ
//       const MaNS = await getMaNSByTenNS(tenNS);

//       if (!MaNS) {
//           return res.status(400).json({ error: 'Nha sĩ không tồn tại.' });
//       }

//     // Kiểm tra thời gian rãnh của nha sĩ
//     const checkAvailabilityQuery = `
//       SELECT * FROM LichLamViec 
//       WHERE MaNS = @MaNS AND Thoigiantrong = @ngayGio
//     `;
//     const checkAvailabilityRequest = new sql.Request();
//     checkAvailabilityRequest.input('MaNS', sql.NVarChar, MaNS);
//     checkAvailabilityRequest.input('ngayGio', sql.Date, ngayGio);
//     const availabilityResult = await checkAvailabilityRequest.query(checkAvailabilityQuery);

//     if (availabilityResult.recordset.length === 0) {
//       return res.status(400).json({ error: 'Nha sĩ không có lịch làm việc vào thời điểm này.' });
//     }

//     // Thực hiện truy vấn để đặt lịch hẹn mới
//     const insertAppointmentQuery = `
//       INSERT INTO HeThongDatLichHen (MaNS, MaKH, Ngaygio)
//       VALUES (@maNS, @maKH, @ngayGio)
//     `;
//     const insertAppointmentRequest = new sql.Request();
//     insertAppointmentRequest.input('maNS', sql.NVarChar, maNS);
//     insertAppointmentRequest.input('maKH', sql.NVarChar, maKH);
//     insertAppointmentRequest.input('ngayGio', sql.Date, ngayGio);
//     await insertAppointmentRequest.query(insertAppointmentQuery);

//     // Trả về thông báo thành công
//     res.status(200).json({ message: 'Đặt lịch hẹn thành công.' });
//   } catch (error) {
//     console.error('Error during appointment booking:', error);
//     res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
//   } finally {
//     // Đảm bảo đóng kết nối sau khi hoàn thành
//     await sql.close();
//   }
// });
app.post('/appointment', async (req, res) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const connection = await sql.connect(config);

    // Lấy thông tin từ body của request
    const SDT = parseInt(req.body.SDT, 10);
    const MaDV = req.body.selectedService;
    const maNS = req.body.selectedDoctor; // Tên nha sĩ từ người dùng
    const ngay = req.body.date;
    const HotenKH = req.body.fullname;
    const gio = req.body.time;
    const ngayGio = `${ngay.split('/').reverse().join('-')}T${gio}:00`;
    console.log(SDT);
    // console.log(tenNS);
    console.log(ngay);
    console.log(gio);
    console.log(ngayGio);
    console.log(MaDV);
    console.log(maNS);
    console.log(HotenKH);


    // Check if required fields are present
    // if (isNaN(SDT) || !tenNS || !ngayGio || !req.body.HotenKH || !req.body.Ngaysinh || !req.body.DiaChi) {
    //   return res.status(400).json({ error: 'Invalid or missing fields in the request.' });
    // }

    // Lấy MaKH từ SDT
    const maKH = await getMaKHBySDT(SDT);

    if (!maKH) {
      return res.status(400).json({ error: 'Khách hàng không tồn tại.' });
    }

    // Lấy MaNS từ tên nha sĩ
    //  const maKH = await getMaNSByTenNS(HotenKH);
    console.log(maNS);
    if (!maNS) {
      return res.status(400).json({ error: 'Nha sĩ không tồn tại.' });
    }

    // Kiểm tra sự rãnh của nha sĩ
    const checkAvailabilityQuery = `
        SELECT * FROM LichLamViec 
        WHERE MaNS = '${maNS}' AND Thoigiantrong = '${ngayGio}'
    `;
    const checkAvailabilityRequest = new sql.Request();
    checkAvailabilityRequest.input('maNS', sql.Int, maNS);
    checkAvailabilityRequest.input('ngayGio', sql.DateTime, ngayGio);
    const availabilityResult = await checkAvailabilityRequest.query(checkAvailabilityQuery);
    console.log(availabilityResult);
    if (availabilityResult.recordset.length === 0) {
      return res.status(400).json({ error: 'Nha sĩ không có lịch làm việc vào thời điểm này.' });
    }

    // Thực hiện truy vấn để đặt lịch hẹn mới
    const insertAppointmentQuery = `
        INSERT INTO HeThongDatLichHen (MaNS, HotenKH, Ngaygio, Ngaysinh, DiaChi, SDT, MaKH,MaDV)
        VALUES (@maNS, @HotenKH, @ngayGio, @ngaySinh, @diaChi, @SDT, @maKH,@MaDV)
    `;
    
    const insertAppointmentRequest = new sql.Request();
    insertAppointmentRequest.input('maNS', sql.Int, maNS);
    insertAppointmentRequest.input('HotenKH', sql.NVarChar, req.body.HotenKH); // Tên khách hàng
    insertAppointmentRequest.input('ngayGio', sql.DateTime, ngayGio);
    insertAppointmentRequest.input('ngaySinh', sql.Date, req.body.Ngaysinh); // Ngày sinh khách hàng
    insertAppointmentRequest.input('diaChi', sql.NVarChar, req.body.DiaChi); // Địa chỉ khách hàng
    insertAppointmentRequest.input('SDT', sql.Int, SDT);
    insertAppointmentRequest.input('maKH', sql.Int, maKH);
    insertAppointmentRequest.input('MaDV', sql.Int, MaDV);

    await insertAppointmentRequest.query(insertAppointmentQuery);

    // Trả về thông báo thành công
    res.status(200).json({ message: 'Đặt lịch hẹn thành công.' });
  } catch (error) {
    console.error('Error during appointment booking:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  } finally {
    // Đảm bảo đóng kết nối sau khi hoàn thành
    await sql.close();
  }
});


async function getMaNSByTenNS(tenNS) {
  const query = `SELECT MaKH FROM KhachHang WHERE HotenKH = '${tenNS}'`;
  const request = new sql.Request();
  request.input('tenNS', sql.NVarChar, tenNS);
  const result = await request.query(query);

  if (result.recordset.length > 0) {
      return result.recordset[0].MaNS;
  } else {
      return null; // Trả về null nếu không tìm thấy MaNS cho tên nha sĩ
  }
}
// Hàm này sẽ lấy MaKH từ Bảng KhachHang dựa trên SDT
async function getMaKHBySDT(SDT) {
  const query = `SELECT MaKH FROM KhachHang WHERE SDT = '${SDT}'`;
  const request = new sql.Request();
  request.input('SDT', sql.Int, SDT);
  const result = await request.query(query);

  if (result.recordset.length > 0) {
      return result.recordset[0].MaKH;
  } else {
      return null; // Trả về null nếu không tìm thấy MaKH cho SDT
  }
}
// app.get('/profile', async (req, res) => {
//   try {
//     // Lấy MaKH từ session
//     const maKH = req.session.MaKH;

//     // Sử dụng MaKH để truy vấn thông tin khách hàng từ database
//     const userProfile = await getProfileByMaKH(maKH);

//     if (userProfile) {
//       // Hiển thị thông tin khách hàng trên trang profile
//       res.render('profile', { userProfile });
//     } else {
//       // Trường hợp MaKH không hợp lệ hoặc không tìm thấy thông tin khách hàng
//       res.status(404).send('Profile not found.');
//     }
//   } catch (error) {
//     console.error('Error during profile retrieval:', error);
//     res.status(500).send('Internal Server Error');
//   }
// });
app.get('/profile', async (req, res) => {
  try {
    // Lấy thông tin từ body của request
    const maKH = req.session.MaKH; // Chắc chắn rằng bạn có thể lấy mã khách hàng từ request body
    // Kết nối đến cơ sở dữ liệu
    console.log(maKH)
    const connection = await sql.connect(config);
    // Thực hiện truy vấn SQL để lấy thông tin khách hàng từ cơ sở dữ liệu
    const getProfileQuery = `SELECT * FROM KhachHang WHERE MaKH = '${maKH}'`;
    const getProfileRequest = new sql.Request();
    getProfileRequest.input('maKH', sql.Int, maKH);
    const profileResult = await getProfileRequest.query(getProfileQuery);
    const userProfile = profileResult.recordset[0];

    // Kiểm tra xem có thông tin khách hàng hay không
    if (!userProfile) {
      return res.status(404).json({ error: 'Không tìm thấy thông tin khách hàng.' });
    }

    // Đổ thông tin vào form
    res.render('profile', { userProfile });
  } catch (error) {
    console.error('Error while fetching profile:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  }
});
app.post('/profile', async (req, res) => {
  try {
      // Kết nối đến cơ sở dữ liệu
      const connection = await sql.connect(config);

      // Lấy thông tin từ body của request
      const maKH = req.session.MaKH; // Giả sử bạn đã lưu MaKH vào session khi người dùng đăng nhập
      console.log(maKH)  
      const hotenKH = req.body.hotenKH;
      console.log(hotenKH)
      const SDT = req.body.SDT;
      console.log(SDT)
      const diaChi = req.body.diaChi;
      console.log(diaChi)
      const ngaySinh = req.body.ngaySinh;

      // Thực hiện truy vấn để cập nhật thông tin người dùng
      const updateProfileQuery = `
          UPDATE KhachHang
          SET HotenKH = '${hotenKH}', SDT = '${SDT}', DiaChi = '${diaChi}', Ngaysinh = '${ngaySinh}'
          WHERE MaKH = '${maKH}'
      `;
      const updateProfileRequest = new sql.Request();
      updateProfileRequest.input('hotenKH', sql.NVarChar, hotenKH);
      updateProfileRequest.input('SDT', sql.Int, SDT);
      updateProfileRequest.input('diaChi', sql.NVarChar, diaChi);
      updateProfileRequest.input('ngaySinh', sql.Date, ngaySinh);
      await updateProfileRequest.query(updateProfileQuery);

      // Thực hiện truy vấn để lấy thông tin khách hàng sau khi cập nhật
    const getUpdatedProfileQuery = `SELECT * FROM KhachHang WHERE MaKH = '${maKH}'`;
    const getUpdatedProfileRequest = new sql.Request();
    getUpdatedProfileRequest.input('maKH', sql.Int, maKH);
    const updatedProfileResult = await getUpdatedProfileRequest.query(getUpdatedProfileQuery);
    const updatedUserProfile = updatedProfileResult.recordset[0];

      // Trả về thông báo thành công và cập nhật thông tin trang profile
    res.render('profile', { userProfile: updatedUserProfile });
      // res.status(200).json({ message: 'Cập nhật thông tin thành công.' });
  } catch (error) {
      console.error('Error during profile update:', error);
      res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  } finally {
      // Đảm bảo đóng kết nối sau khi hoàn thành
      await sql.close();
  }
});

app.post('/addDrug', async (req, res) => {
  try {
    // Kết nối đến cơ sở dữ liệu
    const connection = await sql.connect(config);

    // Lấy thông tin từ body của request
    const nameDrug = req.body.nameDrug;
    const Information = req.body.Information;
    const Quantity = req.body.Quantity;
    const Expiredate = req.body.Expiredate;
    const unit = req.body.unit;
    console.log(nameDrug) 
    console.log(Information) 
    console.log(Quantity) 
    console.log(Expiredate) 
    console.log(unit) 
    // Kiểm tra xem ngày hết hạn có hợp lệ hay không
   
    // Thực hiện truy vấn để thêm thuốc mới
    // const addDrugQuery = `
    //   INSERT INTO Thuoc (TenThuoc, Chidinh, Soluongton, HSD,Donvitinh)
    //   VALUES ('${nameDrug}', '${Information}', '${Quantity}', '${Expiredate}', '${unit}')
    // `;
    const addDrugQuery = `
    EXEC sp_ThemThuoc
        @Soluongton = ${Quantity},
        @HSD = '${Expiredate}',
        @TenThuoc = '${nameDrug}',
        @Donvitinh = '${unit}',
        @Chidinh = '${Information}'
    `;
    
    const addDrugRequest = new sql.Request();
    addDrugRequest.input('nameDrug', sql.NVarChar, nameDrug);
    addDrugRequest.input('Information', sql.NVarChar, Information);
    addDrugRequest.input('Quantity', sql.Int, Quantity);
    addDrugRequest.input('Expiredate', sql.Date, Expiredate);
    addDrugRequest.input('unit', sql.NVarChar, unit);


    await addDrugRequest.query(addDrugQuery);

    // Trả về thông báo thành công hoặc chuyển hướng người dùng đến trang khác
    res.status(200).json({ message: 'Thêm thuốc thành công.' });
  } catch (error) {
    console.error('Error during adding drug:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  } finally {
    // Đảm bảo đóng kết nối sau khi hoàn thành
    await sql.close();
  }
});

// Định nghĩa API endpoint để lấy dữ liệu từ SQL
app.get('/ViewDrugList', async (req, res) => {
  try {
    const connection = await sql.connect(config);
    // Thực hiện truy vấn SQL để lấy dữ liệu thuốc
    const query = 'SELECT * FROM Thuoc';
    const result = await sql.query(query);

    // Render trang .ejs với dữ liệu thuốc
    res.render('ViewDrugList', { drugList: result.recordset });
  } catch (error) {
    console.error('Error fetching drug list:', error);
    res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
  }
});

// app.post('/updateDrug', async (req, res) => {
//   try {

//     const drugId = req.body.drugId;
//     console.log(drugId)
//     const updatedFields = req.body.updatedFields;
//     console.log(updatedFields)
//     const connection = await sql.connect(config);
//     // console.log(updatedFields.TenThuoc) 
//     // console.log(updatedFields.Soluongton) 
//     // console.log(updatedFields.Donvitinh) 
//     // console.log(updatedFields.Chidinh) 
//     console.log(updatedFields.HSD) 
//     console.log(drugId)
//     // Xử lý dữ liệu và thực hiện truy vấn để cập nhật thuốc
//     const updateDrugQuery = `
//       UPDATE Thuoc
//       SET
//         TenThuoc = '${updatedFields.TenThuoc}',
//         Soluongton = '${updatedFields.Soluongton}',
//         Donvitinh = '${updatedFields.Donvitinh}',
//         Chidinh = '${updatedFields.Chidinh}',
//         HSD = '${updatedFields.HSD}'
//       WHERE MaThuoc = '${drugId}'
//     `;
//     const updateDrugRequest = new sql.Request();
//     updateDrugRequest.input('maThuoc', sql.Int, drugId);
//     updateDrugRequest.input('tenThuoc', sql.NVarChar, updatedFields.TenThuoc);
//     updateDrugRequest.input('soLuongTon', sql.Int, updatedFields.Soluongton);
//     updateDrugRequest.input('donViTinh', sql.NVarChar, updatedFields.Donvitinh);
//     updateDrugRequest.input('chiDinh', sql.NVarChar, updatedFields.Chidinh);
//     updateDrugRequest.input('hsd', sql.Date, updatedFields.HSD);

//     await updateDrugRequest.query(updateDrugQuery);

//     res.status(200).json({ message: 'Cập nhật thành công.' });
//   } catch (error) {
//     console.error('Error during drug update:', error);
//     res.status(500).json({ error: 'Đã xảy ra lỗi trong quá trình xử lý.' });
//   }
// });

// app.post('/deleteDrug', async (req, res) => {
//   try {
//     const TenThuoc = req.body.TenThuoc;
//     console.log(TenThuoc)
//     // Assuming you have a SQL connection configured and 'sql' library imported
//     const connection = await sql.connect(config);

//     // Add logic to delete the drug with the specified ID from the database
//     const deleteDrugQuery = `
//       DELETE FROM Thuoc
//       WHERE TenThuoc = ${TenThuoc}
//     `;
    
//     const deleteDrugRequest = new sql.Request();
//     await deleteDrugRequest.query(deleteDrugQuery);

//     // Send a success response
//     res.status(200).json({ message: 'Drug deleted successfully.' });
//   } catch (error) {
//     console.error('Error during drug deletion:', error);
//     res.status(500).json({ error: 'An error occurred during drug deletion.' });
//   } finally {
//     // Close the SQL connection
//     await sql.close();
//   }
// });
app.delete('/deleteDrug/:id', async (req, res) => {
  try {
    const drugId = req.params.id;

    // Connect to the SQL Server
    const connection = await sql.connect(config);

    // Perform the delete query
    const deleteDrugQuery = `
      DELETE FROM Thuoc
      WHERE MaThuoc = '${drugId}'
    `;

    const deleteDrugRequest = new sql.Request();
    await deleteDrugRequest.query(deleteDrugQuery);

    // Close the SQL Server connection
    await sql.close();

    // Respond with success message
    res.status(200).json({ message: 'Delete successful.' });
  } catch (error) {
    console.error('Error during drug deletion:', error);
    res.status(500).json({ error: 'An error occurred during the deletion.' });
  }
});



app.post('/search', async (req, res) => {
  try {
    const connection = await sql.connect(config);
    const searchName = req.body.searchName;
    // console.log(searchName)
    // Perform a database query to find the drug by name
    const findDrugQuery = `
      SELECT * FROM Thuoc
      WHERE TenThuoc = '${searchName}'
    `;

    const findDrugRequest = new sql.Request();
    const result = await findDrugRequest.query(findDrugQuery);

    if (result.recordset.length === 0) {
      return res.render('UpdateDrug', { error: 'Drug not found.' });
    }

    const foundDrug = result.recordset[0];

    // Render the search results with drug information
    res.render('UpdateDrug', { drug: foundDrug });
  } catch (error) {
    console.error('Error during drug search:', error);
    res.status(500).json({ error: 'An error occurred while searching for the drug.' });
  }
});
app.post('/updateDrug', async (req, res) => {
  try {
    // Connect to the SQL Server
    const connection = await sql.connect(config);

    // Extract data from the request body
    const nameDrug = req.body.nameDrug;
    const information = req.body.Information;
    const quantity = req.body.Quantity;
    const expireDate = req.body.Expiredate;
    const unit = req.body.unit;

    // Perform the update query with parameterized queries
    const updateDrugQuery = `
      UPDATE Thuoc
      SET
        Chidinh = @Information,
        Soluongton = @Quantity,
        HSD = @Expiredate,
        Donvitinh = @unit
      WHERE TenThuoc = @nameDrug
    `;

    const updateDrugRequest = new sql.Request();
    updateDrugRequest.input('nameDrug', sql.NVarChar, nameDrug);
    updateDrugRequest.input('Information', sql.NVarChar, information);
    updateDrugRequest.input('Quantity', sql.Int, quantity);
    updateDrugRequest.input('Expiredate', sql.Date, new Date(expireDate));
    updateDrugRequest.input('unit', sql.NVarChar, unit);

    await updateDrugRequest.query(updateDrugQuery);

    // Close the SQL Server connection
    await sql.close();
    res.redirect('/UpdateDrug');
    // Respond with success message
    // res.status(200).json({ message: 'Update successful.' });
  } catch (error) {
    console.error('Error during drug update:', error);
    res.status(500).json({ error: 'An error occurred during the update.' });
  }
});
 app.get('/updateDrug', (req, res) => {
  res.render('UpdateDrug');

 });
 // Assuming you have already set up your Express app and SQL connection

app.post('/addAccount', async (req, res) => {
  try {
    const connection = await sql.connect(config);
      const fullName = req.body.fullName;
      const password = req.body.password;
      const birthDate = req.body.birthDate;
      const address = req.body.address;
      const phoneNumber = req.body.phoneNumber;
      const accountType = req.body.accountType;
      console.log(fullName)
      console.log(accountType)
      // Perform the necessary SQL operations based on the account type
      // Insert the data into the corresponding table (Customer, Employee, Pharmacist)

      // Example SQL query for inserting into the Customer table
      let insertQuery = '';

      switch (accountType) {
          case 'KhachHang':
              insertQuery = `
                  INSERT INTO KhachHang (HotenKH, Matkhau, Ngaysinh, Diachi, SDT)
                  VALUES ('${fullName}', '${password}', '${birthDate}', '${address}', '${phoneNumber}')
              `;
              break;
          case 'NhanVien':
              insertQuery = `
                  INSERT INTO NhanVien (HotenNV, Matkhau, Ngaysinh, Diachi, SDT)
                  VALUES ('${fullName}', '${password}', '${birthDate}', '${address}', '${phoneNumber}')
              `;
              break;
          case 'NhaSi':
              insertQuery = `
                  INSERT INTO NhaSi (HotenNS, Matkhau, Ngaysinh, Diachi, SDT)
                  VALUES ('${fullName}', '${password}', '${birthDate}', '${address}', '${phoneNumber}')
              `;
              break;
          default:
              throw new Error('Invalid account type.');
      }

      // Execute the SQL query
      const request = new sql.Request();
      await request.query(insertQuery);

      res.status(200).json({ message: 'Account added successfully.' });
  } catch (error) {
      console.error('Error during account creation:', error);
      res.status(500).json({ error: 'An error occurred during account creation.' });
  }
});
app.post('/viewAccounts', async (req, res) => {
  try {
    const connection = await sql.connect(config);
      const accountType = req.body.accountType;
      console.log(accountType )
      let viewQuery = '';

      switch (accountType) {
          case 'customer':
              viewQuery = 'SELECT HotenKH AS Name, SDT AS PhoneNumber, Matkhau AS PassWord FROM KhachHang';
              break;
          case 'employee':
              viewQuery = 'SELECT HotenNV AS Name, SDT AS PhoneNumber, Matkhau AS PassWord FROM NhanVien';
              break;
          case 'pharmacist':
              viewQuery = 'SELECT HotenNS AS Name, SDT AS PhoneNumber, Matkhau AS PassWord FROM NhaSi';
              break;
          default:
              throw new Error('Invalid account type.');
      }

      const request = new sql.Request();
      const result = await request.query(viewQuery);

      // res.json(result.recordset);
      res.render('ViewAccountList', { result: result.recordset });
  } catch (error) {
      console.error('Error during account view:', error);
      res.status(500).json({ error: 'An error occurred during account view.' });
  }
});
app.get('/ViewAccountList', (req, res) => {
  res.render('ViewAccountList');

 });
 // Your route to handle blocking/unblocking accounts
// app.post('/blockAccount', async (req, res) => {
//   try {
//     // Extract data from the request body
//     const accountId = req.body.accountId;
//     const isBlocked = req.body.isBlocked;
//     console.log(accountId)
//     console.log(isBlocked)
//     // Connect to the SQL Server
//     const connection = await sql.connect(config);

//     // Perform the update query based on accountId and isBlocked
//     const updateQuery = `
//       UPDATE KhachHang
//       SET IsBlocked = ${isBlocked ? 1 : 0}
//       WHERE MaKH = ${accountId}
//     `;

//     await connection.query(updateQuery);

//     // Send a success response
//     res.redirect('/ViewAccountList')
//   } catch (error) {
//     console.error('Error updating account status:', error);
//     res.status(500).json({ error: 'An error occurred while updating account status.' });
//   } finally {
//     // Close the SQL Server connection
//     await sql.close();
//   }
// });

app.post('/blockAccount/:accountType/:accountId/:isBlocked', async (req, res) => {
  try {
      const { accountType, accountId, isBlocked } = req.params;

      // Create a SQL connection pool
      const pool = await sql.connect(config);

      // Define the update query based on account type
      let updateQuery = '';
      if (accountType === 'customer') {
          updateQuery = `UPDATE KhachHang SET IsBlocked = ${isBlocked} WHERE MaKH = ${accountId}`;
      } else if (accountType === 'employee') {
          updateQuery = `UPDATE NhanVien SET IsBlocked = ${isBlocked} WHERE MaNV = ${accountId}`;
      } else if (accountType === 'pharmacist') {
          updateQuery = `UPDATE NhaSi SET IsBlocked = ${isBlocked} WHERE MaNS = ${accountId}`;
      } else {
          throw new Error('Invalid account type');
      }

      // Execute the update query
      const result = await pool.request().query(updateQuery);

      // Respond with a success message or handle errors
      res.json({ message: 'Account status updated successfully' });
  } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
  }
});
// app.post('/blockAccount/:accountId/:isBlocked', async (req, res) => {
//   try {
//       const { accountId, isBlocked } = req.params;
//       const connection = await sql.connect(config);

//       const updateQuery = `UPDATE KhachHang SET IsBlocked = ${isBlocked} WHERE MaKH = ${accountId}`;
//       await connection.query(updateQuery);

//       res.sendStatus(200);
//   } catch (error) {
//       console.error('Error updating account status:', error);
//       res.status(500).json({ error: 'An error occurred while updating account status.' });
//   } finally {
//       await sql.close();
//   }
// });


  // Your SQL Server configuration

  app.post('/RegisterMedicalRecords', async (req, res) => {
    try {
        const {
            fullName,
            nameDoctor,
            clinicDate,
            dosageUsed,
            listDrugs,
            birthDate,
            address,
            phoneNumber,
            serviceType
        } = req.body;
        console.log(fullName )
        console.log(nameDoctor )
        console.log(serviceType )
        const connection = await sql.connect(config);

        // Insert data into the HoSoBenhAn table
        const query = `
            INSERT INTO HoSoBenhAn (Trieuchung, Ngaykham, Lieusudung, DSThuoc, DSDichvu, HotenKH, HotenNS, Ngaysinh, Diachi, SDT)
            VALUES ('${clinicDate}', '${clinicDate}', '${dosageUsed}', '${listDrugs}', '${serviceType}', '${fullName}', '${nameDoctor}', '${birthDate}', '${address}', '${phoneNumber}')
        `;

        await connection.query(query);

        res.redirect('/RegisterMedicalRecords')
    } catch (error) {
        console.error('Error adding medical record:', error);
        res.status(500).json({ error: 'An error occurred while adding the medical record.' });
    } finally {
        await sql.close();
    }
});
app.get('/RegisterMedicalRecords', (req, res) => {
  res.render('RegisterMedicalRecords');

 });

app.get('/getServices', async (req, res) => {
  try {
      const connection = await sql.connect(config);
      const query = 'SELECT * FROM DichVu';
      const result = await connection.query(query);
      res.json(result.recordset);
  } catch (error) {
      console.error('Error fetching services:', error);
      res.status(500).json({ error: 'An error occurred while fetching services.' });
  } finally {
      await sql.close();
  }
});
app.get('/viewMedicalRecords', async (req, res) => {
  try {
      const connection = await sql.connect(config);

      // Adjust the query according to your table structure
      const query = 'SELECT * FROM HoSoBenhAn';

      const result = await connection.query(query);

      res.render('viewMedicalRecords', { result: result.recordset });
  } catch (error) {
      console.error('Error fetching medical records:', error);
      res.status(500).json({ error: 'An error occurred while fetching medical records.' });
  } finally {
      await sql.close();
  }
});
app.get('/getServicesAndDoctors', async (req, res) => {
  try {
      const connection = await sql.connect(config);

      // Fetch services
      const servicesQuery = 'SELECT * FROM DichVu';
      const servicesResult = await connection.query(servicesQuery);
      const services = servicesResult.recordset;

      // Fetch doctors
      const doctorsQuery = 'SELECT * FROM NhaSi';
      const doctorsResult = await connection.query(doctorsQuery);
      const doctors = doctorsResult.recordset;

      res.json({ services, doctors });
  } catch (error) {
      console.error('Error fetching services and doctors:', error);
      res.status(500).json({ error: 'An error occurred while fetching services and doctors.' });
  } finally {
      await sql.close();
  }
});


