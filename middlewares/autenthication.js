const jwt = require("jsonwebtoken");
const crypto = require("crypto");
const path = require('path');

require('dotenv').config({
    path: path.resolve(__dirname, '../.env')
})

const generateToken = async (user) => {
    const payload = {
        userId: user._id,
        username: user.username,
        email: user.email,
    };


    return jwt.sign(payload, process.env.SECRET_KEY);

}

const authenticateToken = (req, res, next) => {
    console.log("sdasda")
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Pobierz token z nagłówka
    console.log(token, 'askbdada tok tok')
    if (!token) {
      return res.sendStatus(401); // Brak tokenu - brak dostępu
    }
  
    jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
      if (err) {
        return res.sendStatus(403); // Nieprawidłowy token - brak dostępu
      }
      req.user = user; // Przypisz użytkownika z tokena do obiektu req
      next(); // Przejdź do kolejnej funkcji pośredniej lub obsługi żądania
    });
  };

module.exports = { generateToken, authenticateToken }