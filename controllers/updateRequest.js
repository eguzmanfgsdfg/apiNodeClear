const { isStringOrInt, isString, isInt, isCurrency } = require("../helpers/utils");
const { queryPostgreSQL } = require("../database/postgreSQL ");

const updateRequest = async (req, res) => {
    try {
        if (!isInt(req.body.id) || !isCurrency(req.body.monto) || !isString(req.body.request)) {
            return res.status(500).json({
                message: `Datos invalidos`
            });
        }

        var resp = await queryPostgreSQL("SELECT * FROM transacciones LIMIT 5");

        var con = resp.rows;
        var decryptedCardData = "Autentificacion correcta, falta agregar datos"
        res.status(200).json({
            decryptedCardData,
            con
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error: ${error}`
        });
    }
}

module.exports = {
    updateRequest
}