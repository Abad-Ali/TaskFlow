// // routes/profile.js

// import express from 'express';
// import jwt from 'jsonwebtoken';

// const router = express.Router();

// // Protected route for getting user profile
// router.get('/', (req, res) => {
//   // Extract the token from the Authorization header
//   const token = req.headers['authorization']?.split(' ')[1]; // Token comes as "Bearer <token>"

//   if (!token) {
//     return res.status(401).json({ message: 'No token provided' });
//   }

//   // Verify the token
//   jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
//     if (err) {
//       return res.status(403).json({ message: 'Invalid token' });
//     }

//     // If token is valid, decoded will contain the userId from the payload
//     res.json({
//       message: 'Profile information',
//       userId: decoded.userId
//     });
//   });
// });

// export default router;