import mongoose from "mongoose";

export const ConnectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGO_URL}`);
        console.log("MongoDB is Connected");
        
    } catch (error) {
        console.error(`MongoDB connection error: ${error.message}`);
        await mongoose.disconnect();
        process.exit(1);
        
    }
}