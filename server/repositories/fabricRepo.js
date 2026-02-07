import BaseRepo from "../core/base/baseRepository.js";
import Fabric from "../models/fabric.js";

class FabricRepo extends BaseRepo {
  constructor() {
    super(Fabric);
  }
}

export default new FabricRepo();
