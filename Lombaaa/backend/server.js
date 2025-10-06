	// backend/server.js
	const express = require('express');
	const cors = require('cors');
	const bcrypt = require('bcryptjs');
	const jwt = require('jsonwebtoken');
	const app = express();
	const PORT = 5000;
	const JWT_SECRET = 'rahasiaLombaaa';
	// Middleware
	app.use(cors());
	app.use(express.json());
	// Database Sementara (In-Memory)
	let users = [];
	// --- RUTE AUTH ---
	// REGISTER
	app.post('/api/auth/register', async (req, res) => {
	  const { name, email, password } = req.body;
	  const userExists = users.find(user => user.email === email);
	  if (userExists) {
	    return res.status(400).json({ message: 'Email sudah terdaftar' });
	  }
	  const hashedPassword = await bcrypt.hash(password, 10);
	  const newUser = { id: users.length + 1, name, email, password: hashedPassword };
	  users.push(newUser);
	  res.status(201).json({ message: 'User berhasil didaftarkan!' });
	});
	// LOGIN
	app.post('/api/auth/login', async (req, res) => {
	  const { email, password } = req.body;
	  const user = users.find(u => u.email === email);
	  if (!user) {
	    return res.status(400).json({ message: 'Email atau password salah' });
	  }
	  const isMatch = await bcrypt.compare(password, user.password);
	  if (!isMatch) {
	    return res.status(400).json({ message: 'Email atau password salah' });
	  }
	  const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, { expiresIn: '1h' });
	  res.json({ message: 'Login berhasil!', token, user: { id: user.id, name: user.name, email: user.email } });
	});
	// Jalankan server
	app.listen(PORT, () => {
	  console.log(`Server berjalan di http://localhost:${PORT}`);
	});




	