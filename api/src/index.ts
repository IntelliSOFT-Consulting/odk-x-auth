import express from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'

dotenv.config() // Load environment variables

//Import routes 
// import Index from './routes/main'


const app = express();
const PORT = 8080;

app.use(cors())




app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});