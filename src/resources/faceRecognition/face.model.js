import { model, Schema } from "mongoose";

const faceSchema = new Schema({
    label: {
        type: String,
        required: true,
        unique: true
    },
    descriptions: {
        type: Array,
        required: true
    }
})

const FaceModel = model("Face", faceSchema);
export default FaceModel