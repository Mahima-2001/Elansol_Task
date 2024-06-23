// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// const jwt = require('jsonwebtoken');
// const mongoose = require('mongoose');

// // Connect to MongoDB
// mongoose.connect('mongodb://127.0.0.1:27017/auth-system', { useNewUrlParser: true, useUnifiedTopology: true });

// const app = express();
// const port = 5000;

// // Middleware
// app.use(cors());
// app.use(bodyParser.json());

// const User = mongoose.model('User', new mongoose.Schema({
//   name: String,
//   dob: Date,
//   email: { type: String, unique: true },
//   password: String,
// }));

// app.post('/api/register', async (req, res) => {
//   const { name, dob, email, password } = req.body;

//   try {
//     const newUser = new User({ name, dob, email, password });
//     await newUser.save();

//     const token = jwt.sign({ email }, 'secretkey', { expiresIn: '1h' });
//     res.json({ token });
//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({ message: 'Registration failed' });
//   }
// });

// app.listen(port, () => {
//   console.log(`Server running on http://localhost:${port}`);
// });





const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bodyParser = require('body-parser');
const authRoutes = require('./routes/auth');

const app = express();

mongoose.connect('mongodb://127.0.0.1:27017/auth-system', { useNewUrlParser: true, useUnifiedTopology: true });

app.use(cors());
app.use(bodyParser.json());

app.use('/api', authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


//mongodb://localhost/127.0.0.1/27017/auth-system