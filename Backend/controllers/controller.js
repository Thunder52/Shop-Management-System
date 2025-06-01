import  Phone  from '../models/phones.js';

export const getPhones=async(req,res)=>{
    try {
        const phones=await Phone.find().sort({purchaseDate:-1});
        res.status(200).json(phones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const getPhonesbyId=async(req,res)=>{
    const {id}=req.params;
    try {
        const phone =await Phone.findById(id);
        if(!phone){
            return res.status(404).json({message:'Phone not found'});
        }
        res.status(200).json(phone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}
export const addPhone=async(req,res)=>{
    let {brand,model,imei,purchaseDate,warrantyExpiry,costPrice,expectedSellingPrice,condition,seller,sellerAadharNumber,sellerAadharImage,status,notes}=req.body;
    if(!purchaseDate){
        purchaseDate=new Date();
    }
    if(!warrantyExpiry){
        warrantyExpiry=new Date(new Date().setFullYear(new Date().getFullYear() + 1));
    }
    try {
        const newPhone=new Phone({
            brand,
            model,
            imei,
            purchaseDate,
            warrantyExpiry,
            costPrice,
            expectedSellingPrice,
            condition,
            seller,
            sellerAadharNumber,
            sellerAadharImage,
            status,
            notes
        });
        const savedPhone = await newPhone.save();
        res.status(201).json(savedPhone);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

export const searchPhones = async (req, res) => {
    const { query } = req.params;
    try {
        const phones = await Phone.find({
            $or: [
                { brand: new RegExp(query, 'i') },
                { model: new RegExp(query, 'i') },
                { imei: new RegExp(query, 'i') }
            ]
        });
        res.status(200).json(phones);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
export const markAsSold = async (req, res) => {
    const { id } = req.params;
    const buyerData = req.body;
    try {
        const phone = await Phone.findById(id);
        if (!phone) {
            return res.status(404).json({ message: 'Phone not found' });
        }
        phone.sold = true;
        phone.soldDate = new Date();
        phone.soldPrice = buyerData.price; 
        phone.status = 'Sold';
        phone.buyer = buyerData.buyer;
        phone.buyerAddress = buyerData.buyerAddress;
        const updatedPhone = await phone.save();
        res.status(200).json(updatedPhone);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

export const deletePhone=async(req,res)=>{
    const {id}=req.params;
    try {
        const phone =await Phone.findByIdAndDelete(id);
        if(!phone){
            return res.status(404).json({message:'Phone not found'});
        }
        res.status(200).json({message:'Phone deleted successfully'});
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}