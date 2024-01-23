const { isStringOrInt, isString, isInt, isCurrency ,isDateTime,isEmail} = require("../helpers/utils");
const { queryPostgreSQL } = require("../database/postgreSQL ");
const uuid = require('uuid');

const response = async (req, res) => {
    try {

     //   if (!isInt(req.body.id) || !isCurrency(req.body.monto) || !isString(req.body.request)) {
        if (/*!isString(req.body.id ) || */
        !isInt(req.body.respCode ) || !isInt(req.body.authorization )) 
           {
            return res.status(500).json({
                message: `Datos invalidos.`
            });
        }
      let id=  req.body.id;
      var response = "SUCCESS"
        try {
      var query=  "update  public.transaccion "
      query+=  "   set \"respCode\" ="+(req.body.respCode? req.body.respCode: null)+", \"authorization\" ="+(req.body.authorization? req.body.authorization: null)
     query+=  " where id ='"+req.body.id+"'"
        
        console.log("query ["+query+"]");
        var resp = await queryPostgreSQL(query);
        console.log("respuesta db  ["+JSON.stringify(resp)+"]");
        console.log("respuesta db  ["+resp.rowCount+"]");
     if(resp.rowCount==0)
        response="FAILED"

        }
        catch(error){
            console.log("error ["+error+"]");
        }
        var con = resp.rows;
      
        res.status(200).json({
            id,response
            
        });
    } catch (error) {
        console.log("catch ["+error+"]");
        response="FAILED."
        return res.status(500).json({
            id,
            response
           
        });
    }
}

module.exports = {
    response
}