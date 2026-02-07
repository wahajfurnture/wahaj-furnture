import mongoose from "mongoose";

const fabricSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
});

const Fabric = mongoose.model("fabric", fabricSchema);

export default Fabric;
