const { generarJWT } = require("../helpers/utils");
const { queryPostgreSQL } = require("../database/postgreSQL ");

const login = async (req, res) => {
    try {
        var flag = 'true';
        console.log("Integracion continua OK " + req.header('username'));
        console.log("Integracion continua OK " + req.header('password'));
        var ip = req.header('x-forwarded-for') || req.ip;
        console.log("Integracion continua OK " +ip );
        var ip1 = req.header('x-forwarded-for') || req.connection.remoteAddress;
        console.log("Integracion continua OK " +ip1 );
        try {

            var resp = await queryPostgreSQL("SELECT * FROM public.usertest where username='" + req.header('username') + "' and password ='" + req.header('password') + "'");

            console.log("max " + resp.rows.length);
            if (resp.rows.length > 0) {
                console.log(resp.rows[0].id)
                console.log(resp.rows[0].username)
                console.log(resp.rows[0].password)
                const jwt = await generarJWT('0', resp.rows[0].id);
                res.status(200).json({ token:jwt , user:resp.rows[0].username});
            } else {
                var auth = "no auntetifcado ";
                res.status(200).json({ auth });
            }

        } catch (err) {
            console.error(err);
        }

    } catch (error) {
        return res.status(500).json({ message: `Internal server error: ${error}` });
    }
};

module.exports = {
    login
}