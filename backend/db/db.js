import mongoose from "mongoose";

export const mongodbConnection = () => {
    mongoose.connect(process.env.MONGOOSE_URL, {
        dbName: "netflix",
    }).then(() => {
        console.log("connected to MongoDB");
    }).catch((err) => {
        console.log("error connecting to MongoDB", err);
    })
}