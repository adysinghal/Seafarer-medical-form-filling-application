import mongoose from 'mongoose';
const { Schema } = mongoose;

const UserSchema = new Schema({
    firstName:{
        type: String,
        required: true,
    },
    middleName:{
        type: String
    },
    lastName:{
        type: String,
        required: true
    }
}, { timestamps: true });

export const User = mongoose.model("User", UserSchema);