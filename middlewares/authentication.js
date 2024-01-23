const jwt = require('jsonwebtoken');
const sql = require('mssql');
const { generarJWT } = require("../helpers/utils");
const { queryPostgreSQL } = require("../database/postgreSQL ");

const authentication = async (req, res, next) => {
    const token = req.header('x-token');
    if (!token) {
        return res.status(401).json({
            msg: 'No hay token en la peticion'
        });
    }
    try {
        const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);
        console.log("user id creo " + uid);
  
        var resp= await queryPostgreSQL("SELECT * FROM public.usertest where id='"+ uid+"'");

        if(resp.rows.length>0){
            console.log(resp.rows[0].id) 
            console.log(resp.rows[0].username) 
            console.log(resp.rows[0].password) 
           // const jwt = await generarJWT('0', 1);
            //res.status(200).json({ jwt });
           }else{
            var auth="JWT invalido";
            res.status(200).json({ auth });
           }

     /*   if (uid !== 1) {
            return res.status(401).json({
                msg: 'token no valido'
            });
        }*/
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: 'token no valido'
        });
    }
};

module.exports = {
    authentication
};