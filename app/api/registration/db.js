import {Pool} from "pg";
import fs from "node:fs"
import path from "node:path";

// Define the connection string
const secrets = JSON.parse(fs.readFileSync(path.join(path.resolve(), 'secrets.json')).toString())
const connectionString = secrets.DATABASE_URL;

// Create a new client instance
const pool = new Pool({
  connectionString
});

let isConnected = false;

export async function getPool(){
  if(!isConnected) {
    try {
      await pool.connect();
      isConnected = true;
    } catch(error){
      console.error({"db.js connection error : ": error})
    }
  }
  return pool;
}
