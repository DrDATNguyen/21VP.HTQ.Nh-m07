CREATE DATABASE QLIKHACHHANG
SELECT * FROM DichVu
USE UserDatabase
CREATE TABLE UserRole (
    UserId INT,
    Role NVARCHAR(50),
    PRIMARY KEY (UserId, Role),
    FOREIGN KEY (UserId) REFERENCES KhachHang(MaKH) ON DELETE CASCADE
);
CREATE ROLE customer_role;
CREATE ROLE employee_role;
CREATE ROLE pharmacist_role;
CREATE ROLE admin_role;
CREATE USER customer_user;

ALTER USER customer_user ADD TO ROLE customer_role;
ALTER USER employee_user ADD TO ROLE employee_role;
ALTER USER pharmacist_user ADD TO ROLE pharmacist_role;
ALTER USER admin_user ADD TO ROLE admin_role;

-- Grant permissions to the customer role/user
GRANT SELECT ON KhachHang TO customer_role;
GRANT SELECT ON HoSoBenhAn TO customer_role;
GRANT SELECT ON HeThongDatLichHen TO customer_role;
GRANT SELECT ON LichLamViec TO customer_role;
GRANT SELECT ON NhaSi TO customer_role;

-- Grant permissions to the employee role/user
GRANT SELECT, INSERT, UPDATE, DELETE ON KhachHang TO employee_role;
GRANT SELECT ON HoSoBenhAn TO employee_role;
GRANT SELECT, INSERT, UPDATE, DELETE ON HeThongDatLichHen TO employee_role;
GRANT SELECT ON LichLamViec TO employee_role;
GRANT SELECT ON NhaSi TO employee_role;
--GRANT SELECT, INSERT, UPDATE, DELETE ON ThanhToan TO employee_role;

-- Grant permissions to the pharmacist role/user
GRANT SELECT, INSERT, UPDATE, DELETE ON HeThongDatLichHen TO pharmacist_role;
GRANT SELECT ON LichLamViec TO pharmacist_role;
GRANT SELECT ON NhaSi TO pharmacist_role;
GRANT SELECT ON HoSoBenhAn TO pharmacist_role;
GRANT SELECT ON Thuoc TO pharmacist_role;

-- Grant permissions to the admin role/user
GRANT SELECT ON Thuoc TO admin_role;
GRANT SELECT ON NhanVien TO admin_role;
GRANT SELECT ON NhaSi TO admin_role;
GRANT SELECT ON KhachHang TO admin_role;

-- Create users
CREATE USER customer_user FOR LOGIN customer_user;
CREATE USER employee_user FOR LOGIN employee_user;
CREATE USER pharmacist_user FOR LOGIN pharmacist_user;

-- Grant permissions to the customer user
GRANT SELECT ON KhachHang TO customer_user;
GRANT SELECT ON HoSoBenhAn TO customer_user;
-- Grant other necessary permissions

-- Grant permissions to the employee user
GRANT SELECT, INSERT, UPDATE, DELETE ON KhachHang TO employee_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON HoSoBenhAn TO employee_user;
-- Grant other necessary permissions

-- Grant permissions to the pharmacist user
GRANT SELECT, INSERT, UPDATE, DELETE ON HeThongDatLichHen TO pharmacist_user;
GRANT SELECT, INSERT, UPDATE, DELETE ON LichLamViec TO pharmacist_user;
-- Grant other necessary permissions

-- Add roles to users if needed
ALTER ROLE customer_role ADD MEMBER customer_user;
ALTER ROLE employee_role ADD MEMBER employee_user;
ALTER ROLE pharmacist_role ADD MEMBER pharmacist_user;

CREATE TABLE KhachHang (
    MaKH INT PRIMARY KEY IDENTITY(1,1),
    HotenKH NVARCHAR(50) NOT NULL,
    Ngaysinh DATE,
    Diachi NVARCHAR(50),
    Matkhau NVARCHAR(50) NOT NULL,
    SDT INT UNIQUE NOT NULL,
	IsBlocked BIT DEFAULT 0
);

CREATE TABLE TaiKhoan (
    MaKH INT ,
    Matkhau NVARCHAR(50),
    SDT INT,
	PRIMARY KEY(SDT),
);

CREATE TABLE NhanVien (
    MaNV  INT PRIMARY KEY IDENTITY(1,1),
    HotenNV NVARCHAR(50),
    SDT INT,
	Ngaysinh DATE,
    Diachi NVARCHAR(50),
    Matkhau NVARCHAR(50),
	MaKH INT,
	IsBlocked BIT DEFAULT 0
);

CREATE TABLE NhaSi (
    MaNS INT PRIMARY KEY IDENTITY(1,1),
    HotenNS NVARCHAR(50),
    Ngaysinh DATE,
    Diachi NVARCHAR(50),
    Matkhau NVARCHAR(50),
	SDT INT,
	IsBlocked BIT DEFAULT 0
);

CREATE TABLE HoSoBenhNhan (
    MaKH INT,
    HotenBN NVARCHAR(50),
    HotenNS NVARCHAR(50),
    MaBA INT,
    MaNS INT,
	PRIMARY KEY(MaKH, MaBA, MaNS),
);

CREATE TABLE HoSoBenhAn (
    Trieuchung NVARCHAR(50),
    Ngaykham DATE,
    MaBA INT PRIMARY KEY IDENTITY(1,1),
    Lieusudung NVARCHAR(50),
    DSThuoc NVARCHAR(50),
    DSDichvu NVARCHAR(250),
	 HotenKH NVARCHAR(50) NOT NULL,
	 HotenNS NVARCHAR(50) NOT NULL,
    Ngaysinh DATE,
    Diachi NVARCHAR(50),
    SDT INT UNIQUE NOT NULL
	--PRIMARY KEY(MaBA, MaKH, MaNS),
);
Create table DichVu(
	MaDV INT PRIMARY KEY IDENTITY(1,1),
	TenDV NVARCHAR(50),
	Gia INT,
);

CREATE TABLE Thuoc (
    MaThuoc INT PRIMARY KEY IDENTITY(1,1),
    Soluongton INT,
    HSD DATE,
    TenThuoc NVARCHAR(50),
    Donvitinh NVARCHAR(50),
    Chidinh NVARCHAR(50),
);

CREATE TABLE QuanTriVien (
    HotenQTV NVARCHAR(50),
    MaThuoc INT,
    MaQTV INT PRIMARY KEY IDENTITY(1,1),
);


CREATE TABLE HeThongDatLichHen (
    MaNS INT,
    HotenKH NVARCHAR(50),
    Ngaygio DATE,
    Ngaysinh DATETIME,
    Diachi NVARCHAR(50),
    SDT INT,
	MaKH INT,
	MaDV INT,
	PRIMARY KEY(MaNS, MaKH),
);

CREATE TABLE LichLamViec (
	MaLLV INT PRIMARY KEY IDENTITY(1,1),
    Thoigiantrong DATETIME,
	Thoigianlamviec DATETIME,
    MaNS INT,
);

INSERT INTO LichLamViec (Thoigiantrong,MaNS)
VALUES 
    ('2023-02-09T08:00:00',7),
    ('2023-03-10 08:30:00',7)

DELETE FROM LichLamViec 
        WHERE MaNS = 7 AND Thoigiantrong = '2023-01-07 07:00:00'
UPDATE LichLamViec
SET Thoigianlamviec = Thoigiantrong,
    Thoigiantrong = NULL
WHERE Thoigiantrong = '2023-01-01 08:00:00.000';

SELECT * FROM LichLamViec 
        WHERE MaNS = 2 AND Thoigiantrong = '2023-01-02 09:30:00.000'
INSERT INTO LichLamViec (Thoigiantrong, MaNS)
VALUES ('2022-12-21T21:15:00', 1); -- Thay thế 1 bằng giá trị thực của MaNS
SELECT * FROM HoSoBenhAn WHERE HotenKH = 'Dat'

SELECT HotenKH FROM KhachHang WHERE MaKH = 1
ALTER TABLE HeThongDatLichHen
ALTER COLUMN  Ngaygio DATETIME;

ALTER TABLE  TaiKhoan
DROP CONSTRAINT FK_TaiKhoan_KhachHang;

ALTER TABLE TaiKhoan
ADD CONSTRAINT FK_TaiKhoan_KhachHang
FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);

ALTER TABLE  HoSoBenhNhan
DROP CONSTRAINT FK_HoSoBenhNhan_KhachHang;

ALTER TABLE HoSoBenhNhan
ADD CONSTRAINT FK_HoSoBenhNhan_KhachHang
FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);

ALTER TABLE  HoSoBenhNhan
DROP CONSTRAINT FK_HoSoBenhNhan_NhaSi;

ALTER TABLE HoSoBenhNhan
ADD CONSTRAINT FK_HoSoBenhNhan_NhaSi
FOREIGN KEY (MaNS) REFERENCES NhaSi(MaNS);

ALTER TABLE  HoSoBenhNhan
DROP CONSTRAINT FK_HoSoBenhNhan_HoSoBenhAn;

ALTER TABLE HoSoBenhNhan
ADD CONSTRAINT FK_HoSoBenhNhan_HoSoBenhAn
FOREIGN KEY (MaBA) REFERENCES HoSoBenhAn(MaBA);

ALTER TABLE  HoSoBenhAn
DROP CONSTRAINT FK_HoSoBenhAn_KhachHang;

ALTER TABLE  HoSoBenhAn
DROP CONSTRAINT FK_HoSoBenhAn_KhachHang;

ALTER TABLE HoSoBenhAn
ADD CONSTRAINT FK_HoSoBenhAn_KhachHang
FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);

ALTER TABLE  HoSoBenhAn
DROP CONSTRAINT FK_HoSoBenhAn_NhaSi;

ALTER TABLE HoSoBenhAn
ADD CONSTRAINT FK_HoSoBenhAn_NhaSi
FOREIGN KEY (MaNS) REFERENCES NhaSi(MaNS)
;
ALTER TABLE  HoSoBenhAn
DROP CONSTRAINT FK_HoSoBenhAn_Thuoc;

ALTER TABLE HoSoBenhAn
ADD CONSTRAINT FK_HoSoBenhAn_Thuoc
FOREIGN KEY (MaThuoc) REFERENCES Thuoc(MaThuoc);

ALTER TABLE  HoSoBenhAn
DROP CONSTRAINT FK_HoSoBenhAn_DichVu;

ALTER TABLE HoSoBenhAn
ADD CONSTRAINT FK_HoSoBenhAn_DichVu
FOREIGN KEY (MaDV) REFERENCES DichVu(MaDV); 

ALTER TABLE QuanTriVien
ADD CONSTRAINT FK_QuanTriVien_Thuoc
FOREIGN KEY (MaThuoc) REFERENCES Thuoc(MaThuoc);

ALTER TABLE  HeThongDatLichHen
DROP CONSTRAINT FK_HeThongDatLichHen_KhachHang;

ALTER TABLE HeThongDatLichHen
ADD CONSTRAINT FK_HeThongDatLichHen_KhachHang
FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);

ALTER TABLE  LichLamViec
DROP CONSTRAINT FK_LichLamViec_NhaSi;

ALTER TABLE LichLamViec
ADD CONSTRAINT FK_LichLamViec_NhaSi
FOREIGN KEY (MaNS) REFERENCES NhaSi(MaNS);

ALTER TABLE NhanVien
ADD CONSTRAINT FK_NhanVien_KhachHang
FOREIGN KEY (MaKH) REFERENCES KhachHang(MaKH);

-- KHACHHANG 
-- Đăng nhập
go
CREATE PROCEDURE DangNhapKhachHang
    @TenDangNhap NVARCHAR(50),
    @p_matKhau NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

        DECLARE @Exists INT;

        SELECT @Exists = COUNT(*)
        FROM TaiKhoan
        WHERE SDT = @TenDangNhap AND Matkhau = @p_matKhau;

        IF @Exists > 0
        BEGIN
            SELECT 'Đăng nhập thành công!' AS result;
        END
        ELSE
        BEGIN
            SELECT 'Sai mã khách hàng hoặc mật khẩu. Vui lòng kiểm tra lại.' AS result;
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Xử lý các lỗi tại đây, có thể ghi log hoặc thông báo lỗi.
        SELECT ERROR_MESSAGE() AS ErrorMessage, ERROR_NUMBER() AS ErrorNumber;
    END CATCH
END;


-- Đăng kí khách hàng
go

CREATE PROCEDURE DangKyKhachHang
    --@p_maKhachHang INT,
    @p_hoTen NVARCHAR(255),
    @p_ngaySinh DATE,
    @p_diaChi NVARCHAR(255),
    @p_soDienThoai NVARCHAR(15),
    @p_matKhau NVARCHAR(255)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

        DECLARE @existingUser INT;
        SELECT @existingUser = COUNT(*)
        FROM KhachHang
        WHERE SDT = @p_soDienThoai;

        IF @existingUser = 0
        BEGIN
            INSERT INTO KhachHang (HotenKH, ngaySinh, diaChi, SDT, matKhau)
            VALUES (@p_hoTen, @p_ngaySinh, @p_diaChi, @p_soDienThoai, @p_matKhau);
            SELECT 'Đăng ký thành công!' AS result;
        END
        ELSE
        BEGIN
            SELECT 'Mã khách hàng đã tồn tại, vui lòng chọn mã khác.' AS result;
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Xử lý các lỗi tại đây, có thể ghi log hoặc thông báo lỗi.
        SELECT ERROR_MESSAGE() AS ErrorMessage, ERROR_NUMBER() AS ErrorNumber;
    END CATCH
END;

go

-- Đặt lich hẹn 

--CREATE PROCEDURE DatLichHen
--    @p_maNhaSi NVARCHAR(50),
--    @p_maKhachHang NVARCHAR(50),
--    @p_ngayGio DATETIME,
--    @p_diaChi NVARCHAR(50)
--AS
--BEGIN
--    BEGIN TRY
--        BEGIN TRANSACTION;

--        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

--        DECLARE @existingAppointment INT;
--        SELECT @existingAppointment = COUNT(*)
--        FROM HeThongDatLichHen
--        WHERE MaNS = @p_maNhaSi AND MaKH = @p_maKhachHang;

--        IF @existingAppointment = 0
--        BEGIN
--            INSERT INTO HeThongDatLichHen (MaNS, MaKH, Ngaygio, Diachi)
--            VALUES (@p_maNhaSi, @p_maKhachHang, @p_ngayGio, @p_diaChi);
--            SELECT 'Đặt lịch hẹn thành công!' AS result;
--        END
--        ELSE
--        BEGIN
--            SELECT 'Lịch hẹn đã tồn tại, vui lòng chọn ngày giờ khác.' AS result;
--        END

--        COMMIT;
--    END TRY
--    BEGIN CATCH
--        IF @@TRANCOUNT > 0
--            ROLLBACK;

--        -- Xử lý các lỗi tại đây, có thể ghi log hoặc thông báo lỗi.
--        SELECT ERROR_MESSAGE() AS ErrorMessage, ERROR_NUMBER() AS ErrorNumber;
--    END CATCH
--END;
CREATE PROCEDURE DatLichHen
    @p_maNhaSi INT,
    @p_maKhachHang INT,
    @p_ngayGio DATETIME,
    @p_diaChi NVARCHAR(50),
    @p_hoten NVARCHAR(255),
    @p_sdt INT,
    @p_ngaysinh DATE,
    @p_maDV INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @outputMessage NVARCHAR(255);

    BEGIN TRY
        BEGIN TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;

        -- Check if customer exists
        IF NOT EXISTS (SELECT 1 FROM KhachHang WHERE MaKH = @p_maKhachHang)
        BEGIN
            -- Set the error message
            SET @outputMessage = 'Khách hàng không tồn tại.';
            ROLLBACK;
            RETURN;
        END

        -- Check if dentist exists
        IF NOT EXISTS (SELECT 1 FROM NhaSi WHERE MaNS = @p_maNhaSi)
        BEGIN
            -- Set the error message
            SET @outputMessage = 'Nha sĩ không tồn tại.';
            ROLLBACK;
            RETURN;
        END

        -- Check dentist's availability
        DECLARE @existingAppointment INT;
        SELECT @existingAppointment = COUNT(*)
        FROM LichLamViec
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_ngayGio;

        IF @existingAppointment = 0
        BEGIN
            -- Set the error message
            SET @outputMessage = 'Nha sĩ không có lịch làm việc vào thời điểm này.';
            ROLLBACK;
            RETURN;
        END

        -- Insert the appointment
        INSERT INTO HeThongDatLichHen (MaNS, HotenKH, Ngaygio, Ngaysinh, DiaChi, SDT, MaKH, MaDV)
        VALUES (@p_maNhaSi, @p_hoten, @p_ngayGio, @p_ngaysinh, @p_diaChi, @p_sdt, @p_maKhachHang, @p_maDV);

        -- Delete the availability from LichLamViec
        DELETE FROM LichLamViec 
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_ngayGio;

        -- Update the availability by inserting into LichLamViec
        INSERT INTO LichLamViec (Thoigianlamviec, MaNS)
        VALUES (@p_ngayGio, @p_maNhaSi);

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Set the error message
        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH

    -- Return the output message
    SELECT @outputMessage AS result;
END;





go
SELECT COUNT(*)
        FROM LichLamViec
        WHERE MaNS = 7 AND Thoigiantrong = '2023-02-01T08:00:00';
select * from KhachHang
-- Khai báo biến để lưu kết quả từ stored procedure
DECLARE @result NVARCHAR(MAX);

-- Gọi stored procedure DatLichHen với các tham số tương ứng
EXEC @result = DatLichHen
    @p_maNhaSi = 7,  -- Thay thế bằng giá trị MaNS thực tế
    @p_maKhachHang = 2,  -- Thay thế bằng giá trị MaKH thực tế
    @p_ngayGio = '2023-02-01T08:00:00',  -- Thay thế bằng giá trị ngày và giờ thực tế
    @p_diaChi = '123 Street, City',  -- Thay thế bằng giá trị địa chỉ thực tế
    @p_hoten = 'Khang',  -- Thay thế bằng giá trị tên khách hàng thực tế
    @p_sdt = 001,  -- Thay thế bằng giá trị số điện thoại thực tế
    @p_ngaysinh = '1990-01-01',  -- Thay thế bằng giá trị ngày sinh thực tế
    @p_maDV = 3;  -- Thay thế bằng giá trị MaDV thực tế

-- In kết quả từ stored procedure
SELECT @result AS Result;

DECLARE 
    @p_maNhaSi INT,
    @p_maKhachHang INT,
    @p_ngayGio DATETIME,
    @p_diaChi NVARCHAR(50),
    @p_hoten NVARCHAR(255),
    @p_sdt INT,
    @p_ngaysinh DATE,
    @p_maDV INT;

-- Đặt giá trị cho các tham số
SET @p_maNhaSi = 7; -- Giả sử giá trị là 1
SET @p_maKhachHang = 6; -- Giả sử giá trị là 2
SET @p_ngayGio = '2023-02-01T08:00:00'; -- Giả sử giá trị là ngày giờ mong muốn
SET @p_diaChi = '123 Đường ABC, Quận XYZ';
SET @p_hoten = 'Dat2';
SET @p_sdt = 1;
SET @p_ngaysinh = '1990/01/01'; -- Giả sử giá trị là ngày sinh mong muốn
SET @p_maDV = 3; -- Giả sử giá trị là 3

-- Thực thi stored procedure
EXEC DatLichHen 
    @p_maNhaSi,
    @p_maKhachHang,
    @p_ngayGio,
    @p_diaChi,
    @p_hoten,
    @p_sdt,
    @p_ngaysinh,
    @p_maDV;
	COMMIT;
DECLARE @Soluongton INT = 100;
DECLARE @HSD DATE = '2023-12-31';
DECLARE @TenThuoc NVARCHAR(50) = 'Paracetamolkhang';
DECLARE @Donvitinh NVARCHAR(50) = 'Tablet';
DECLARE @Chidinh NVARCHAR(50) = 'Pain relief';

-- Execute the stored procedure
EXEC sp_ThemThuoc
   @Soluongton,
   @HSD,
   @TenThuoc,
   @Donvitinh,
   @Chidinh;

-- Xem lịch hẹn 
CREATE PROCEDURE XemDanhSachLichHenTheoKhachHang
    @p_maKhachHang NVARCHAR(50)
AS
BEGIN
    BEGIN TRY
        BEGIN TRANSACTION;

        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

        SELECT MaNS, MaKH, Ngaygio, Diachi
        FROM HeThongDatLichHen
        WHERE MaKH = @p_maKhachHang;

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Xử lý các lỗi tại đây, có thể ghi log hoặc thông báo lỗi.
        SELECT ERROR_MESSAGE() AS ErrorMessage, ERROR_NUMBER() AS ErrorNumber;
    END CATCH
END;


go

-- Xem thông tin cá nhân 
CREATE PROCEDURE XemThongTinKhachHangTheoMa
    @p_maKhachHang NVARCHAR(50)
AS
BEGIN
    SELECT MaKH, HotenKH, Ngaysinh, Diachi, Matkhau, SDT
    FROM KhachHang
    WHERE MaKH = @p_maKhachHang;
END;

go

-- Sửa thông tin cá nhân
CREATE PROCEDURE SuaThongTinCaNhanKhachHang
    @p_maKhachHang INT,
    @p_hoTen NVARCHAR(50),
    @p_ngaySinh DATE,
    @p_diaChi NVARCHAR(50),
    @p_matKhau NVARCHAR(50),
    @p_soDienThoai INT
   
AS
BEGIN
    SET NOCOUNT ON; -- Tắt thông báo số hàng bị ảnh hưởng để tránh lỗi số hàng
	 DECLARE @outputMessage NVARCHAR(255);
    BEGIN TRY
        BEGIN TRANSACTION;

        -- Check if customer exists
        IF NOT EXISTS (
            SELECT 1
            FROM KhachHang
            WHERE MaKH = @p_maKhachHang
        )
        BEGIN
            SET @outputMessage = 'Mã khách hàng không tồn tại.';
            ROLLBACK; -- Rollback transaction
            RETURN;
        END

        -- Update customer information
        UPDATE KhachHang
        SET
            HotenKH = @p_hoTen,
            Ngaysinh = @p_ngaySinh,
            Diachi = @p_diaChi,
            Matkhau = @p_matKhau,
            SDT = @p_soDienThoai
        WHERE MaKH = @p_maKhachHang;

        SET @outputMessage = 'Sửa thông tin cá nhân thành công.';

        COMMIT; -- Commit transaction
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK; -- Rollback transaction

        -- Handle errors, log, or return an appropriate error message
        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;

go
DECLARE @maKhachHang INT = 1;
DECLARE @hoTen NVARCHAR(50) = N'DatVip';
DECLARE @ngaySinh DATE = '1990/01/01';
DECLARE @diaChi NVARCHAR(50) = N'CuChi';
DECLARE @matKhau NVARCHAR(50) = N'1';
DECLARE @soDienThoai INT = 12;


-- Execute the stored procedure
EXEC SuaThongTinCaNhanKhachHang
    @p_maKhachHang = @maKhachHang,
    @p_hoTen = @hoTen,
    @p_ngaySinh = @ngaySinh,
    @p_diaChi = @diaChi,
    @p_matKhau = @matKhau,
    @p_soDienThoai = @soDienThoai;


-- Display the output message
SELECT @outputMessage AS ResultMessage;

--Xem hồ sơ bệnh án
CREATE PROCEDURE XemHoSoBenhAnTheoMaKH
    @MaKH NVARCHAR(50)
AS
BEGIN
    SELECT
        HoSoBenhAn.MaBA,
        HoSoBenhAn.Trieuchung,
        HoSoBenhAn.Ngaykham,
        HoSoBenhAn.MaThuoc,
        HoSoBenhAn.Tieusudiung,
        HoSoBenhAn.DSThuoc,
        HoSoBenhAn.Dichvu
    FROM
        HoSoBenhAn
    WHERE
        HoSoBenhAn.MaKH = @MaKH;
END;
go


-- NHA SI
-- Đăng nhập nha sĩ
CREATE PROCEDURE DangNhapNhaSi
    @p_maNhaSi NVARCHAR(50),
    @p_matKhau NVARCHAR(50)
AS
BEGIN
    -- Kiểm tra đăng nhập của nha sĩ
    IF EXISTS (
        SELECT 1
        FROM NhaSi
        WHERE MaNS = @p_maNhaSi AND Matkhau = @p_matKhau
    )
    BEGIN
        SELECT 'Đăng nhập thành công!' AS result;
    END
    ELSE
    BEGIN
        SELECT 'Sai mã nha sĩ hoặc mật khẩu. Vui lòng kiểm tra lại.' AS result;
    END
END;

go

-- Thêm hồ sở bệnh nhân
CREATE PROCEDURE ThemHoSoBenhNhanTheoMaKhachHang
    @p_maKhachHang NVARCHAR(50),
    @p_hotenBN NVARCHAR(50),
    @p_hotenNS NVARCHAR(50),
    @p_maBA NVARCHAR(50),
    @p_maNS NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM HoSoBenhNhan
        WHERE MaKH = @p_maKhachHang AND MaBA = @p_maBA AND MaNS = @p_maNS
    )
    BEGIN
        INSERT INTO HoSoBenhNhan (MaKH, HotenBN, HotenNS, MaBA, MaNS)
        VALUES (@p_maKhachHang, @p_hotenBN, @p_hotenNS, @p_maBA, @p_maNS);
        SELECT 'Thêm hồ sơ bệnh nhân thành công!' AS result;
    END
    ELSE
    BEGIN
        SELECT 'Hồ sơ bệnh nhân đã tồn tại, vui lòng chọn mã bệnh án và mã nha sĩ khác.' AS result;
    END
END;

go

-- Thêm hồ sơ bệnh án
CREATE PROCEDURE ThemHoSoBenhAnTheoMaKhachHang
    @p_maKhachHang NVARCHAR(50),
    @p_trieuChung NVARCHAR(50),
    @p_ngayKham DATE,
    @p_maBA NVARCHAR(50),
    @p_maNS NVARCHAR(50),
    @p_maThuoc NVARCHAR(50),
    @p_tieuSuDung NVARCHAR(50),
    @p_dsThuoc NVARCHAR(50),
    @p_dichVu NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM HoSoBenhAn
        WHERE MaKH = @p_maKhachHang AND MaBA = @p_maBA AND MaNS = @p_maNS
    )
    BEGIN
        INSERT INTO HoSoBenhAn (MaKH, Trieuchung, Ngaykham, MaBA, MaNS, MaThuoc, Tieusudiung, DSThuoc, Dichvu)
        VALUES (@p_maKhachHang, @p_trieuChung, @p_ngayKham, @p_maBA, @p_maNS, @p_maThuoc, @p_tieuSuDung, @p_dsThuoc, @p_dichVu);
        SELECT 'Thêm hồ sơ bệnh án thành công!' AS result;
    END
    ELSE
    BEGIN
        SELECT 'Hồ sơ bệnh án đã tồn tại, vui lòng chọn mã bệnh án và mã nha sĩ khác.' AS result;
    END
END;

go

-- Xem lịch hẹn
CREATE PROCEDURE XemLichHenTheoMaNhaSi
    @p_maNhaSi NVARCHAR(50)
AS
BEGIN
    SELECT *
    FROM HeThongDatLichHen
    WHERE MaNS = @p_maNhaSi;
END;
go

-- Thêm lịch làm việc 
CREATE PROCEDURE ThemLichLamViec
    @p_maNhaSi NVARCHAR(50),
    @p_thoiGianTrong DATE
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM NhaSi
        WHERE MaNS = @p_maNhaSi
    )
    BEGIN
        SELECT 'Mã nha sĩ không tồn tại.' AS result;
        RETURN;
    END

    IF NOT EXISTS (
        SELECT 1
        FROM LichLamViec
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianTrong
    )
    BEGIN
        INSERT INTO LichLamViec (MaNS, Thoigiantrong)
        VALUES (@p_maNhaSi, @p_thoiGianTrong);

        SELECT 'Thêm lịch làm việc thành công!' AS result;
    END
    ELSE
    BEGIN
        SELECT 'Lịch làm việc đã tồn tại.' AS result;
    END
END;

go
--	Xóa lịch làm việc 
CREATE PROCEDURE XoaLichLamViecNhaSi
    @p_maNhaSi NVARCHAR(50),
    @p_thoiGianTrong DATE
AS
BEGIN
    -- Kiểm tra xem mã nha sĩ có tồn tại không
    IF NOT EXISTS (
        SELECT 1
        FROM NhaSi
        WHERE MaNS = @p_maNhaSi
    )
    BEGIN
        SELECT 'Mã nha sĩ không tồn tại.' AS result;
        RETURN;
    END
    IF NOT EXISTS (
        SELECT 1
        FROM LichLamViec
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianTrong
    )
    BEGIN
        SELECT 'Lịch làm việc không tồn tại.' AS result;
        RETURN;
    END
    DELETE FROM LichLamViec
    WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianTrong;

    SELECT 'Xóa lịch làm việc thành công.' AS result;
END;
go

-- Sửa lịch làm việc
CREATE PROCEDURE SuaLichLamViecNhaSi
    @p_maNhaSi NVARCHAR(50),
    @p_thoiGianTrong DATE,
    @p_thoiGianMoi DATE
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM NhaSi
        WHERE MaNS = @p_maNhaSi
    )
    BEGIN
        SELECT 'Mã nha sĩ không tồn tại.' AS result;
        RETURN;
    END

    IF NOT EXISTS (
        SELECT 1
        FROM LichLamViec
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianTrong
    )
    BEGIN
        SELECT 'Lịch làm việc không tồn tại.' AS result;
        RETURN;
    END

    IF EXISTS (
        SELECT 1
        FROM LichLamViec
        WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianMoi
    )
    BEGIN
        SELECT 'Lịch làm việc mới đã tồn tại.' AS result;
        RETURN;
    END
    UPDATE LichLamViec
    SET Thoigiantrong = @p_thoiGianMoi
    WHERE MaNS = @p_maNhaSi AND Thoigiantrong = @p_thoiGianTrong;
    SELECT 'Sửa lịch làm việc thành công.' AS result;
END;
go

-- NHANVIEN
-- Đăng nhập
CREATE PROCEDURE DangNhapNhanVien
    @p_taiKhoan NVARCHAR(50),
    @p_matKhau NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM NhanVien
        WHERE MaNV = @p_taiKhoan AND Matkhau = @p_matKhau
    )
    BEGIN
        SELECT 'Đăng nhập không thành công. Tên đăng nhập hoặc mật khẩu không đúng.' AS result;
        RETURN;
    END
    SELECT 'Đăng nhập thành công.' AS result;
END;
go

-- Đặt lịch hẹn 
CREATE PROCEDURE DatLichHenNhanVien
    @p_MaKH NVARCHAR(50),
    @p_Ngaygio DATE,
    @p_Diachi NVARCHAR(50),
    @p_SDT INT,
    @p_MaNS NVARCHAR(50)
AS
BEGIN
    IF NOT EXISTS (
        SELECT 1
        FROM KhachHang
        WHERE MaKH = @p_MaKH
    )
    BEGIN
        SELECT 'Mã khách hàng không tồn tại.' AS result;
        RETURN;
    END

    IF NOT EXISTS (
        SELECT 1
        FROM NhaSi
        WHERE MaNS = @p_MaNS
    )
    BEGIN
        SELECT 'Mã nhà sĩ không tồn tại.' AS result;
        RETURN;
    END

    INSERT INTO HeThongDatLichHen (MaNS, HotenKH, Ngaygio, Ngaysinh, Diachi, SDT, MaKH)
    VALUES (@p_MaNS, (SELECT HotenKH FROM KhachHang WHERE MaKH = @p_MaKH), @p_Ngaygio, (SELECT Ngaysinh FROM KhachHang WHERE MaKH = @p_MaKH), @p_Diachi, @p_SDT, @p_MaKH);

    SELECT 'Đặt lịch hẹn thành công.' AS result;
END;
go

-- Xem thuốc
CREATE PROCEDURE XemDanhSachThuoc
AS
BEGIN
    SELECT
        MaThuoc,
        Soluongton,
        HSD,
        TenThuoc,
        Donvitinh,
        Chidinh
    FROM
        Thuoc;
END;
go

/*
-- Lập hóa đơn 
CREATE PROCEDURE LapHoaDonTheoMaKH
    @p_MaKH NVARCHAR(50)
AS
BEGIN
    -- Kiểm tra xem mã khách hàng có tồn tại không
    IF NOT EXISTS (
        SELECT 1
        FROM KhachHang
        WHERE MaKH = @p_MaKH
    )
    BEGIN
        SELECT 'Mã khách hàng không tồn tại.' AS result;
        RETURN;
    END

    -- Lập hóa đơn cho khách hàng
    DECLARE @NgayLap DATE = GETDATE();
    DECLARE @TongTien INT = 0;

    INSERT INTO HoaDon (MaKH, NgayLap, TongTien)
    VALUES (@p_MaKH, @NgayLap, @TongTien);

    -- Lấy thông tin hóa đơn vừa lập
    DECLARE @MaHoaDon NVARCHAR(50);
    SET @MaHoaDon = (SELECT SCOPE_IDENTITY());

    -- Tính tiền và cập nhật hóa đơn chi tiết
    INSERT INTO HoaDonChiTiet (MaHoaDon, MaThuoc, SoLuong, DonGia)
    SELECT
        @MaHoaDon,
        HSA.MaThuoc,
        COUNT(HSA.MaThuoc) AS SoLuong,
        T.DonGia
    FROM
        HoSoBenhAn HSA
    INNER JOIN
        Thuoc T ON HSA.MaThuoc = T.MaThuoc
    WHERE
        HSA.MaKH = @p_MaKH
    GROUP BY
        HSA.MaThuoc, T.DonGia;

    -- Tính tổng tiền và cập nhật vào hóa đơn
    SET @TongTien = (SELECT SUM(SoLuong * DonGia) FROM HoaDonChiTiet WHERE MaHoaDon = @MaHoaDon);
    UPDATE HoaDon SET TongTien = @TongTien WHERE MaHoaDon = @MaHoaDon;

    SELECT 'Lập hóa đơn thành công.' AS result;
END;
*/

-- QUANTRIVIEN
-- Xem thuốc
CREATE PROCEDURE XemDanhSachThuocQTV
AS
BEGIN
    SELECT
        MaThuoc,
        Soluongton,
        HSD,
        TenThuoc,
        Donvitinh,
        Chidinh
    FROM
        Thuoc;
END;
go

-- Thêm thuốc
CREATE PROCEDURE sp_ThemThuoc
    @Soluongton INT,
    @HSD DATE,
    @TenThuoc NVARCHAR(50),
    @Donvitinh NVARCHAR(50),
    @Chidinh NVARCHAR(50)

AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @outputMessage NVARCHAR(255);
    BEGIN TRY
        BEGIN TRANSACTION;
        SET TRANSACTION ISOLATION LEVEL READ COMMITTED;

        IF NOT EXISTS (SELECT 1 FROM Thuoc WHERE TenThuoc = @TenThuoc)
        BEGIN
            INSERT INTO Thuoc (Soluongton, HSD, TenThuoc, Donvitinh, Chidinh)
            VALUES (@Soluongton, @HSD, @TenThuoc, @Donvitinh, @Chidinh);

            SET @outputMessage = 'Đã thêm loại thuốc thành công.';

            COMMIT;
        END
        ELSE
        BEGIN
            -- Loại thuốc đã tồn tại, set thông báo
            SET @outputMessage = 'Loại thuốc có tên ' + @TenThuoc + ' đã tồn tại. Vui lòng chọn tên khác.';

            ROLLBACK;
        END
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Xử lý lỗi, set thông báo
        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;
go
-- Declare variables with sample values
DECLARE @Soluongton INT = 200;
DECLARE @HSD DATE = '2023-12-31';
DECLARE @TenThuoc NVARCHAR(50) = 'Hiroxin';
DECLARE @Donvitinh NVARCHAR(50) = 'Tablet';
DECLARE @Chidinh NVARCHAR(50) = 'Pain relief';

-- Execute the stored procedure
EXEC sp_ThemThuoc
   @Soluongton,
   @HSD,
   @TenThuoc,
   @Donvitinh,
   @Chidinh;

-- Sửa thuốc
CREATE PROCEDURE SuaThuoc
    @Soluongton INT,
    @HSD DATE,
    @TenThuoc NVARCHAR(50),
    @Donvitinh NVARCHAR(50),
    @Chidinh NVARCHAR(50)
   
AS
BEGIN
    SET NOCOUNT ON;
		DECLARE @outputMessage NVARCHAR(255);

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Thuoc WHERE TenThuoc = @TenThuoc)
        BEGIN
            UPDATE Thuoc
            SET
                Soluongton = @Soluongton,
                HSD = @HSD,
                Donvitinh = @Donvitinh,
                Chidinh = @Chidinh
            WHERE TenThuoc = @TenThuoc;

            SET @outputMessage = 'Đã cập nhật thông tin thuốc thành công.';

            COMMIT;
        END
        ELSE
        BEGIN
            -- Không tìm thấy loại thuốc, set thông báo
            SET @outputMessage = 'Không tìm thấy loại thuốc có mã ' + @TenThuoc + '.';

            ROLLBACK;
        END
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        -- Xử lý lỗi, set thông báo
        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;

go
DECLARE @Soluongton INT = 200;
DECLARE @HSD DATE = '2023-12-31';
DECLARE @TenThuoc NVARCHAR(50) = 'kichduc';
DECLARE @Donvitinh NVARCHAR(50) = 'Tablet';
DECLARE @Chidinh NVARCHAR(50) = 'Pain relief';

-- Execute the stored procedure
EXECUTE SuaThuoc
   @Soluongton,
   @HSD,
   @TenThuoc,
   @Donvitinh,
   @Chidinh;
-- Xóa thuốc
CREATE PROCEDURE sp_XoaThuoc
    @MaThuoc INT
AS
BEGIN
    SET NOCOUNT ON;
    DECLARE @outputMessage NVARCHAR(255);

    SET TRANSACTION ISOLATION LEVEL SERIALIZABLE;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF EXISTS (SELECT 1 FROM Thuoc WITH (UPDLOCK, HOLDLOCK) WHERE MaThuoc = @MaThuoc)
        BEGIN
            DELETE FROM Thuoc
            WHERE MaThuoc = @MaThuoc;

            SET @outputMessage = 'Đã xóa loại thuốc thành công.';
        END
        ELSE
        BEGIN
            SET @outputMessage = 'Không tìm thấy loại thuốc có mã ' + @MaThuoc + '.';
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;

go

-- Thêm khách hàng
CREATE PROCEDURE sp_ThemKhachHang
    @HotenKH NVARCHAR(50),
    @Ngaysinh DATE,
    @Diachi NVARCHAR(50),
    @Matkhau NVARCHAR(50),
    @SDT INT

AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @outputMessage NVARCHAR(255);

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM KhachHang WHERE SDT = @SDT)
        BEGIN
            INSERT INTO KhachHang (HotenKH, Ngaysinh, Diachi, Matkhau, SDT)
            VALUES ( @HotenKH, @Ngaysinh, @Diachi, @Matkhau, @SDT);

            SET @outputMessage = 'Đã thêm khách hàng thành công.';
        END
        ELSE
        BEGIN
            SET @outputMessage = 'Khách hàng có số điện thoại ' + @SDT + ' đã tồn tại.';
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;

go

-- Thêm nha sĩ
CREATE PROCEDURE sp_ThemNhaSi
    @HotenNS NVARCHAR(50),
    @Ngaysinh DATE,
    @Diachi NVARCHAR(50),
    @Matkhau NVARCHAR(50),
    @SDT INT
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @outputMessage NVARCHAR(255);

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM NhaSi WHERE  SDT  = @SDT)
        BEGIN
            INSERT INTO NhaSi (HotenNS, Ngaysinh, Diachi, Matkhau,SDT)
            VALUES (@HotenNS, @Ngaysinh, @Diachi, @Matkhau,@SDT);

            SET @outputMessage = 'Đã thêm nha sĩ thành công.';
        END
        ELSE
        BEGIN
            SET @outputMessage = 'Nha sĩ có số điện thoại ' + @SDT + ' đã tồn tại.';
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;

go

-- Thêm nhân viên
CREATE PROCEDURE sp_ThemNhanVien
    @HotenNV NVARCHAR(50),
	@Ngaysinh Date,
    @SDT INT,
    @Matkhau NVARCHAR(50),
    @Diachi NVARCHAR(50)
    
AS
BEGIN
    SET NOCOUNT ON;
	DECLARE @outputMessage NVARCHAR(255);

	SET TRANSACTION ISOLATION LEVEL READ COMMITTED;
    BEGIN TRY
        BEGIN TRANSACTION;

        IF NOT EXISTS (SELECT 1 FROM NhanVien WHERE SDT = @SDT)
        BEGIN
            INSERT INTO NhanVien (HotenNV, SDT, Matkhau, Ngaysinh,Diachi)
            VALUES (@HotenNV, @SDT, @Matkhau, @Ngaysinh,@SDT);

            SET @outputMessage = 'Đã thêm nhân viên thành công.';
        END
        ELSE
        BEGIN
            SET @outputMessage = 'Nhân viên có số điện thoại ' + @SDT + ' đã tồn tại.';
        END

        COMMIT;
    END TRY
    BEGIN CATCH
        IF @@TRANCOUNT > 0
            ROLLBACK;

        SET @outputMessage = 'Đã xảy ra lỗi trong quá trình xử lý: ' + ERROR_MESSAGE();
    END CATCH
END;


















