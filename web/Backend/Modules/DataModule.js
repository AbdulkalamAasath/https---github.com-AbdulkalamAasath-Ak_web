const mongoose = require('mongoose')
const Schema = mongoose.Schema

const DataModuleSchema = new Schema(
    {
        Name:{type:String},
        Email:{type:String},
        Product_Name:{type:String},
        Product_Descrpition:{type:String},
        Address:{type:String},
        Contact_Number:{type:String},
        Customer_Address:{type:String},
        Customer_Name:{type:String},
        cid:{type:mongoose.SchemaTypes.ObjectId,
            ref:'User',
            required:true},
        Approved:{type:Boolean,default:false}
    }
)
module.exports = mongoose.model('Data',DataModuleSchema)