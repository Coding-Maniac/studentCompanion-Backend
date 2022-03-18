import FaceModel from "./face.model";

async function uploadLabeledImages(images, label) {
    try {

        const descriptions = [];
        // Loop through the images
        for (let i = 0; i < images.length; i++) {
            const img = await canvas.loadImage(images[i]);
            // Read each face and save the face descriptions in the descriptions array
            const detections = await faceapi.detectSingleFace(img).withFaceLandmarks().withFaceDescriptor();
            descriptions.push(detections.descriptor);
        }

        // Create a new face document with the given label and save it in DB
        const createFace = new FaceModel({
            label: label,
            descriptions: descriptions,
        });
        await createFace.save();
        return true;
    } catch (error) {
        console.log(error);
        return (error);
    }
}

export const registerFace = () => {
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