import mongoose from "mongoose";

const PdfSchema = mongoose.Schema({
    dob:{
        type: String,
        required: true
    },
    person:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    }
}, {timestamps: true});

export const Pdf = mongoose.model("Pdf", PdfSchema);