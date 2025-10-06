-- ecoapp.sql
-- Buat database
CREATE DATABASE IF NOT EXISTS ecoapp CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE ecoapp;

-- Tabel users
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    balance DECIMAL(10,2) DEFAULT 0.00,
    phone VARCHAR(20),
    address TEXT,
    profile_picture VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel laporan_sampah
CREATE TABLE laporan_sampah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    jenis_sampah ENUM('plastik', 'kertas', 'logam', 'kaca', 'organik', 'elektronik', 'lainnya') NOT NULL,
    lokasi VARCHAR(255) NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    deskripsi TEXT,
    foto VARCHAR(255),
    status ENUM('dilaporkan', 'diproses', 'selesai') DEFAULT 'dilaporkan',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel marketplace_karya
CREATE TABLE marketplace_karya (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    nama_produk VARCHAR(100) NOT NULL,
    deskripsi TEXT NOT NULL,
    harga DECIMAL(10,2) NOT NULL,
    foto VARCHAR(255),
    kategori ENUM('kerajinan', 'furnitur', 'aksesoris', 'seni', 'lainnya') DEFAULT 'kerajinan',
    stok INT DEFAULT 1,
    status ENUM('active', 'sold', 'inactive') DEFAULT 'active',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel tukar_sampah
CREATE TABLE tukar_sampah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    jenis_sampah VARCHAR(50) NOT NULL,
    berat DECIMAL(8,2) NOT NULL,
    poin_earned INT NOT NULL,
    status ENUM('pending', 'diverifikasi', 'ditolak', 'selesai') DEFAULT 'pending',
    tanggal_tukar TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    tanggal_verifikasi TIMESTAMP NULL,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel transaksi_balance
CREATE TABLE transaksi_balance (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    jenis ENUM('topup', 'purchase', 'refund', 'reward') NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    deskripsi TEXT,
    saldo_sebelum DECIMAL(10,2) NOT NULL,
    saldo_sesudah DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Tabel bank_sampah
CREATE TABLE bank_sampah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(100) NOT NULL,
    alamat TEXT NOT NULL,
    latitude DECIMAL(10,8),
    longitude DECIMAL(11,8),
    phone VARCHAR(20),
    jam_operasional VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Tabel harga_sampah
CREATE TABLE harga_sampah (
    id INT AUTO_INCREMENT PRIMARY KEY,
    jenis_sampah VARCHAR(50) UNIQUE NOT NULL,
    harga_per_kg DECIMAL(8,2) NOT NULL,
    satuan VARCHAR(20) DEFAULT 'kg',
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabel orders (untuk marketplace)
CREATE TABLE orders (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    product_id INT,
    quantity INT NOT NULL,
    total_harga DECIMAL(10,2) NOT NULL,
    status ENUM('pending', 'diproses', 'dikirim', 'selesai', 'dibatalkan') DEFAULT 'pending',
    alamat_pengiriman TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (product_id) REFERENCES marketplace_karya(id) ON DELETE CASCADE
);

-- Insert data sample untuk bank_sampah
INSERT INTO bank_sampah (nama, alamat, latitude, longitude, phone, jam_operasional) VALUES
('Bank Sampah Induk Jakarta', 'Jl. Merdeka No. 123, Jakarta Pusat', -6.208763, 106.845599, '021-1234567', '08:00-16:00 Senin-Jumat'),
('Bank Sampah Hijau Lestari', 'Jl. Sudirman Kav. 25, Jakarta Selatan', -6.229728, 106.822136, '021-7654321', '07:00-15:00 Setiap Hari'),
('Bank Sampah Eco Friendly', 'Jl. Thamrin No. 45, Jakarta Utara', -6.180495, 106.828896, '021-9876543', '09:00-17:00 Senin-Sabtu');

-- Insert data sample untuk harga_sampah
INSERT INTO harga_sampah (jenis_sampah, harga_per_kg, satuan) VALUES
('plastik', 3000.00, 'kg'),
('kertas', 2000.00, 'kg'),
('logam', 5000.00, 'kg'),
('kaca', 1500.00, 'kg'),
('elektronik', 8000.00, 'kg'),
('organik', 1000.00, 'kg');

-- Insert user sample (password: password123)
INSERT INTO users (name, email, password, balance) VALUES 
('Admin EcoApp', 'admin@ecoapp.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 100000.00),
('User Demo', 'user@demo.com', '$2y$10$92IXUNpkjO0rOQ5byMi.Ye4oKoEa3Ro9llC/.og/at2.uheWG/igi', 50000.00);

-- Insert sample data untuk marketplace_karya
INSERT INTO marketplace_karya (user_id, nama_produk, deskripsi, harga, kategori) VALUES
(1, 'Tas dari Plastik Daur Ulang', 'Tas cantik dibuat dari plastik kemasan bekas yang didaur ulang', 75000.00, 'kerajinan'),
(2, 'Pot Bunga dari Botol Plastik', 'Pot bunga unik dari botol plastik bekas dengan desain kreatif', 25000.00, 'kerajinan'),
(1, 'Furnitur dari Kayu Palet', 'Meja kecil dari kayu palet bekas yang diolah kembali', 150000.00, 'furnitur');

-- Insert sample data untuk laporan_sampah
INSERT INTO laporan_sampah (user_id, jenis_sampah, lokasi, deskripsi, status) VALUES
(2, 'plastik', 'Jl. Merdeka No. 123', 'Tumpukan sampah plastik di pinggir jalan', 'dilaporkan'),
(2, 'organik', 'Taman Kota Jakarta', 'Sampah daun dan ranting menumpuk', 'diproses');

-- Buat index untuk performa
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_laporan_user ON laporan_sampah(user_id);
CREATE INDEX idx_laporan_status ON laporan_sampah(status);
CREATE INDEX idx_marketplace_user ON marketplace_karya(user_id);
CREATE INDEX idx_marketplace_status ON marketplace_karya(status);
CREATE INDEX idx_tukar_user ON tukar_sampah(user_id);
CREATE INDEX idx_transaksi_user ON transaksi_balance(user_id);