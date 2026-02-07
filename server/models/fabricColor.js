import mongoose from "mongoose";

const fabricColorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  thumbnail: { type: String, required: true },
  images: { type: [String], default: [] },
  fabricId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    ref: "fabric",
  },
  furnId: {
    type: mongoose.Types.ObjectId,
    index: true,
    required: true,
    ref: "furniture",
  },
});

fabricColorSchema.index({ fabricId: 1, furnId: 1 });

const FabricColor = mongoose.model("fabriccolor", fabricColorSchema);

export default FabricColor;
