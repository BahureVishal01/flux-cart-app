import express,{Request, Response} from 'express';
import morgan from 'morgan';
import router from './routes/apiRoutes';
import pool from './db/db';
import { configDotenv } from 'dotenv';
const app:express.Application = express();
configDotenv();
const hostname:string = '127.0.0.1';
const PORT = process.env.PORT|| 5050
app.use(morgan("dev"));
app.use(express.json())
// app.get('/', (request:Request, response:Response)=>{
//     response.status(200).send(`<h3>Hello Anshu <h3>`);
// })
pool.connect(function (err) {
    if (err) throw err;
    setTimeout(() => {
      console.log(`  Database connected.
  |=============================================================>>`);
    }, 0);
  });
app.use('/api', router)
app.listen(PORT, ()=>{
    console.log("server is running on "+ PORT)
})