import BaseRepo from "../core/base/baseRepository.js";
import FabricFurn from "../models/fabricFurn.js";

class FabricFurnRepo extends BaseRepo {
  constructor() {
    super(FabricFurn);
  }

  findByFurnIdWithFabric(furnId) {
    return this.model.find({ furnId }).populate("fabricId");
  }
}

export default new FabricFurnRepo();
