const pg = require('pg');
require('dotenv').config()
const param={host:process.env.DBHOST,port:process.env.DBPORT, user: process.env.DBUSER, database: process.env.DB,password:process.env.DBPASSWORD, max: 100,};

// The Connection Pool for the database
// console.log(mysql_para)
async function conn(){
    const pool = await new  pg.Pool(param);
    return(pool)
}

module.exports={
    conn
}