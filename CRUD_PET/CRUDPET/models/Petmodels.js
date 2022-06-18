const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PetSchema = new Schema({
    Pet_id:String,
    PetName:String,
    PetAge:String,
})  

    

const control_data= mongoose.model('Editor',PetSchema)

module.exports = control_data