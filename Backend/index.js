import express from 'express';
import env from 'dotenv';
import connectDB from './config/db.js';
import routes from './Routes/phoneRoutes.js';
import cors from 'cors';
import path from 'path';

env.config();
const app=express();
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const PORT = process.env.PORT || 3000;
connectDB();
const __dirname = path.resolve();
app.use(cors({
    origin: '*'
}));

if(process.env.NODE_ENV==='production'){
    app.use(express.static(path.join(__dirname,'../frontend/dist')));
    app.get('/', (req, res) => {
        res.sendFile(path.resolve(__dirname, '..' ,'frontend', 'dist', 'index.html'));
    });
}
app.use('/api',routes);
app.listen(PORT,()=>{
    console.log(`server is running on port ${PORT}`);
});