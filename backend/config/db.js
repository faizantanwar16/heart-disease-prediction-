import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected ✅");
  } catch (error) {
    console.error("Connection Error ❌", error);
    if (error.code === 8000 || error.codeName === "AtlasError") {
      console.error(
        "MongoDB Atlas rejected the credentials in MONGO_URI. Reset the database user password in Atlas → Database → Database Users, put the new password in backend/.env, and URL-encode special characters in the connection string (e.g. @ → %40)."
      );
    }
    process.exit(1);
  }
};

export default connectDB;