import mongoose from "mongoose";

async function connectDB(uri, cb) {
    await mongoose.connect(uri);
    cb();
}

export default connectDB;
