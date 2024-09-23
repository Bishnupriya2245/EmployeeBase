import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema({
  f_userName: {
    type: String,
    required: true,
    unique: true,
  },
  f_Pwd: {
    type: String,
    required: true,
  },
});

export default model("User", userSchema);
