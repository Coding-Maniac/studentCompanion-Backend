import FaceModel from "./face.model";
import canvas from "canvas"
import { createCanvasFromMedia, detectAllFaces, detectSingleFace, FaceMatcher, LabeledFaceDescriptors, matchDimensions, resizeResults } from "@vladmandic/face-api";

// ---- FACE REGISTER -------
async function uploadLabeledImages(images, label) {
    try {

        const descriptions = [];
        // Loop through the images
        for (let i = 0; i < images.length; i++) {
            const img = await canvas.loadImage(images[i]);
            // Read each face and save the face descriptions in the descriptions array
            const detections = await detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            descriptions.push(detections.descriptor);
        }

        // Create a new face document with the given label and save it in DB
        // const createFace = new FaceModel({
        //     label: label,
        //     descriptions: descriptions,
        // });
        // await createFace.save();
        await FaceModel.create({
            label: label,
            descriptions: descriptions,
        })
        return true;
    } catch (error) {
        console.log(error);
        return false;
    }
}

export const registerFace = async (req, res) => {
    // console.log(req)
    // console.log(req.files)
    const File1 = req.files.File1.tempFilePath
    const File2 = req.files.File2.tempFilePath
    const File3 = req.files.File3.tempFilePath
    const label = req.body.label
    let result = await uploadLabeledImages([File1, File2, File3], label);
    if (result) {
        res.json({ message: "Face data stored successfully" })
    } else {
        res.json({ message: "Something went wrong, please try again." })
    }
}


// -------- FACE RECOGNITION -----------

async function getDescriptorsFromDB(image) {
    // Get all the face data from mongodb and loop through each of them to read the data
    let faces = await FaceModel.find();
    for (let i = 0; i < faces.length; i++) {
        // Change the face data descriptors from Objects to Float32Array type
        for (let j = 0; j < faces[i].descriptions.length; j++) {
            faces[i].descriptions[j] = new Float32Array(Object.values(faces[i].descriptions[j]));
        }
        // Turn the DB face docs to
        faces[i] = new LabeledFaceDescriptors(faces[i].label, faces[i].descriptions);
    }

    // Load face matcher to find the matching face
    const faceMatcher = new FaceMatcher(faces, 0.6);

    // Read the image using canvas or other method
    const img = await canvas.loadImage(image);
    let temp = createCanvasFromMedia(img);
    // Process the image for the model
    const displaySize = { width: img.width, height: img.height };
    matchDimensions(temp, displaySize);

    // Find matching faces
    const detections = await detectAllFaces(img).withFaceLandmarks().withFaceDescriptors();
    const resizedDetections = resizeResults(detections, displaySize);
    const results = resizedDetections.map((d) => faceMatcher.findBestMatch(d.descriptor));
    return results;
}

export const recognizeFace = async (req, res) => {

    const File1 = req.files.File1.tempFilePath;
    let result = await getDescriptorsFromDB(File1);
    res.json({ result });

}