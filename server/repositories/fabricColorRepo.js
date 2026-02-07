import BaseRepo from "../core/base/baseRepository.js";
import FabricColor from "../models/fabricColor.js";

class FabricColorRepo extends BaseRepo {
  constructor() {
    super(FabricColor);
  }

  findByFabricAndFurn(fabricId, furnId) {
    return this.model.find({ fabricId, furnId });
  }
}

export default new FabricColorRepo();
