const jwt = require("jsonwebtoken");

function checkRestauranteToken(req, res, next) {
    const authHeader = req.headers["authorization"];
    const restauranteToken = authHeader && authHeader.split(" ")[1];

    if (!restauranteToken) {
        return res.status(401).json({
            message: "Access denied!"
        });
    }

    try {
        const restauranteSecret = process.env.RESTAURANTE_SECRET;

        const decoded = jwt.verify(restauranteToken, restauranteSecret);

        req.restaurante = decoded;

        next();
    } catch (err) {
        return res.status(401).json({
            message: "Invalid or expired token!"
        });
    }
}

module.exports = checkRestauranteToken;