import express from "express";
import cors from 'cors'
import * as dotenv from 'dotenv'
import * as path from 'path'

dotenv.config() // Load environment variables

//Import routes 
// import Index from './routes/main'


const app = express();
const PORT = 8080;

app.use(cors())

app.use(express.static(path.resolve(__dirname, '../../ui/build')));

// All other GET requests not handled before will return our React app
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../../ui/build', 'index.html'));
});


app.listen(PORT, () => {
  console.log(`⚡️[server]: Server is running at http://localhost:${PORT}`);
});