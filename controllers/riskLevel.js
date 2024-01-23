const { isStringOrInt, isString, isInt, isCurrency ,isDateTime,isEmail,python,init} = require("../helpers/utils");
const { queryPostgreSQL } = require("../database/postgreSQL ");
const uuid = require('uuid');

const riskLevel = async (req, res) => {

    init();
    try {

     //   if (!isInt(req.body.id) || !isCurrency(req.body.monto) || !isString(req.body.request)) {
        if (!isInt(req.body.merchant ) || !isInt(req.body.subMerchant  )|| !isCurrency(req.body.amount  )|| !isInt(req.body.currency  )|| !isString(req.body.promoMonths  )
          ||!isInt(req.body.months ) || !isDateTime(req.body.date  )|| !isString(req.body.entryMode  )|| !isStringOrInt(req.body.serial  )|| !isString(req.body.acquirer)
          ||!isInt(req.body.card ) || !isInt(req.body.expYear  )|| !isInt(req.body.expMonth  )|| !isInt(req.body.reference  )|| !isString(req.body.reference2)
          ||!isStringOrInt(req.body.merchantName ) || !isString(req.body.operation  )|| !isInt(req.body.bin  )|| !isString(req.body.country  )|| !isInt(req.body.mcc)
          ||!isString(req.body.trigger  )|| !isString(req.body.authentication  )|| !isStringOrInt(req.body.account)
          || ((req.body.trigger =="POST" )  ? ((!isInt(req.body.respCode )) || !isInt(req.body.authorization )) : false)
          || ((req.body.entryMode =="ECO" )  ? ((!isEmail(req.body.email )) || !isString(req.body.cardholderName )) : false)
          ||!isInt(req.body.postalCodeClient ) || !isString(req.body.cityClient  )|| !isString(req.body.stateClient  )|| !isInt(req.body.additionalAmount  )
//          req.body.postalCodeClient+"' ,'"+ req.body.cityClient+"' , '"+ req.body.stateClient+"' , "+(req.body.additionalAmount? req.body.additionalAmount: null)    +""
          ) {
            return res.status(500).json({
                message: `Datos invalidos.`
            });
        }
      let uaid=  uuid.v4()
      let rand=Math.floor(Math.random() * 100);
        try {
      var query=  "INSERT INTO public.transaccion("
      query+=  "    id, merchant, \"subMerchant\", amount, currency, \"promoMonths\", months, date, \"entryMode\", serial, acquirer, card, \"expYear\", \"expMonth\", reference, reference2, \"merchantName\", operation, bin, country, mcc, authentication, account, trigger, \"respCode\", \"authorization\", \"cardholderName\", email, score, \"CreationDate\""
//      query+=  " \"acquirer\", \"card\", \"expYear\", \"expMonth\", \"reference\", \"reference2\", \"merchantName\", \"operation\", \"bin\", \"country\","
  //    query+=  "  \"mcc\", \"authentication\", \"account\", \"trigger\", \"respCode\", \"authorization\", \"cardholderName\", \"email\", \"score\", \"CreationDate\")"
  query+=  " ,   \"postalCodeClient\",\"cityClient\",\"stateClient\",\"additionalAmount\""

  query+=  "   )    VALUES "
      query+=  "       ("
      query+=   "'"+uaid +"'"+",'"+ req.body.merchant+"','"+ req.body.subMerchant+"',"+ req.body.amount+","+ req.body.currency+", '"+ req.body.promoMonths+"',"+ req.body.months+", TO_TIMESTAMP('"+ req.body.date +"', 'dd-mm-yyyy hh24:mi:ss'), '"+ req.body.entryMode+"' , '"+ req.body.serial+"' ,"
      query+= " '"+req.body.acquirer+"' , "+ req.body.card+" , "+ req.body.expYear+" , "+ req.body.expMonth+" ,"+ req.body.reference+", '"+ req.body.reference2+"' , '"+ req.body.merchantName+"' , '"+ req.body.operation+"' ,"+req.body.bin+", '"+ req.body.country+"' ,"
      query+=     " "+  req.body.mcc+" ,'"+ req.body.authentication+"' , "+ req.body.account+" , '"+ req.body.trigger+"' ,"+ (req.body.respCode? req.body.respCode: null)+","+(req.body.authorization? req.body.authorization: null)  +", '"+ req.body.cardholderName+"' , '"+ req.body.email+"',"+ rand+", TO_TIMESTAMP('"+ req.body.date +"', 'dd-mm-yyyy hh24:mi:ss')  "
      query+=     " , '"+  req.body.postalCodeClient+"' ,'"+ req.body.cityClient+"' , '"+ req.body.stateClient+"' , "+(req.body.additionalAmount? req.body.additionalAmount: null)    +""

        query+=      " );"
        
        console.log("query ["+query+"]");
        var resp = await queryPostgreSQL(query);
        }
        catch(error){
            console.log("error ["+error+"]");
        }
        console.log("python  ["+"]");
        const resp1=await      python(    ".\\python\\risk.py  ","\"'215afakhjda76382904','3265709.0','9048689.0','0',1235.45,'0','484','MSI','3','45255.6527893519','CHIP','PB452544','[BZP173]UTS_8457239_BR','BANREGIO_TPV','4000123412341230','2024','12','7012334455','PAGO TACOS','TINTORERIA 1','SALE','402766','US','32750','Longwood','FL','CREDIT','MasterCard','5399','00','PRE','0','123.45','josele@gmail.com','Josele','Cruz','PIN','12345566'\"")
        var con = resp.rows;
        var decryptedCardData = "Autentificacion correcta, falta agregar datos"
        //let resp1_=resp1.replace("\r","").replace("\"","").replace('\"',"").replace("\n","")
      // let  resp1__=parseFloat(resp1_)
        console.log("resp1 ["+resp1+"]");
        res.status(200).json({
            
            id:uaid,score:+resp1
        });
    } catch (error) {
        return res.status(500).json({
            message: `Internal server error: ${error}`
        });
    }
}

module.exports = {
    riskLevel
}