import express from "express";
import {getPhones,getPhonesbyId,addPhone,searchPhones,markAsSold,deletePhone} from '../controllers/controller.js';

const route=express.Router();

route.get('/phones',getPhones);
route.get('/phones/:id',getPhonesbyId);
route.post('/phone',addPhone);
route.get('/phones/search', searchPhones );
route.patch('/phones/:id/sell', markAsSold );
route.delete('/phones/:id',deletePhone);

export default route;