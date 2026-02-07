import mongoose from "mongoose";

const furnitureSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  category: { type: String, required: true },
  thumbnail: { type: String, required: true },
});

const Furniture = mongoose.model("furniture", furnitureSchema);

export default Furniture;
