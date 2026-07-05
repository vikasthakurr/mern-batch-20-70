import mongoose from "mongoose";

async function connectDB() {
  await mongoose.connect(
    "mongodb+srv://vikaskumar20012001:Vikas123@mern-20-70.a1jcqev.mongodb.net/",
  );

  console.log("MongoDB Connected....");
}
export default connectDB;
