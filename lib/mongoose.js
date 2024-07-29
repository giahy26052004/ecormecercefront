import mongoose from "mongoose";

export function mongooseConnect() {
  if (mongoose.connection.readyState === 1) {
    console.log("Connect");
    return mongoose.connection.asPromise();
  } else {
    console.log("UnConnecting");
    const uri = process.env.MONGODB_URI;
    return mongoose.connect(uri);
  }
}
