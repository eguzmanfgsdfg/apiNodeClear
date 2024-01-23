const { Pool } = require('pg');

const queryPostgreSQL  = async (queryText) => {
    try {
        try {
            const pool = new Pool({
                'host': 'db-dmrzl-bzpnac.cry7lrrhvglg.us-east-2.rds.amazonaws.com',
                'database': 'transaccion_api',
                'user': 'postgres',
                'password': 'G3n3r42023!.',
                'port': '5432'  
            });
            await pool.connect()
           const res = await pool.query(queryText)

           return res;
        } catch (err) {
           console.error(err);
           return {};
        } 
    } catch (error) {
        return {};
    }
};

module.exports = {
    queryPostgreSQL
}