import mongoose from "mongoose";

const fabricFurn = new mongoose.Schema({
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

fabricFurn.index({ fabricId: 1, furnId: 1 }, { unique: true });

const FabricFurn = mongoose.model("fabricfurn", fabricFurn);

export default FabricFurn;
