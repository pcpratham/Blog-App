const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    blogs:{
        type:Array,
        default:[]
    }
});


// //hashing of passwords just before saving them
// userSchema.pre('save',async (req,res)=>{
//     const user = this;
    
//     if(user.isModified('password')){
//         const salt = await bcrypt.genSalt(10);
//         user.password = await bcrypt.hash(user.password,salt);
//     }
// })

module.exports = mongoose.model('user',userSchema);