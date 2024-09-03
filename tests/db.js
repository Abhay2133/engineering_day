const {Pool} = require("pg")
const secrets = require("../secrets.json")

const pool = new Pool({
  connectionString : secrets.DATABASE_URL
})
let isConnected = false;

const getPool = async () =>{
  if(!isConnected){
    try{
      await pool.connect();
      isConnected = true;
    } catch(e){
      console.error("Failed while connecting to DB")
    }
  }

  return pool
}

module.exports = {
  getPool
}