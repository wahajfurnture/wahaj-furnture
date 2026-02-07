import BaseService from "../core/base/baseService.js";
import fabricFurnRepo from "../repositories/fabricFurnRepo.js";
import AppError from "../core/AppError.js";

class FabricFurnService extends BaseService {
  constructor() {
    super(fabricFurnRepo);
  }

  async getFabricsByFurnId(furnId, allowEmpty = false) {
    const fabricFurns = await this.repo.findByFurnIdWithFabric(furnId);

    if (!allowEmpty && !fabricFurns.length) {
      throw new AppError("Fabrics Not Found", 404);
    }

    // Transform to match old response format (array of fabrics)
    const fabrics = fabricFurns.map((ff) => ff.fabricId);

    return fabrics;
  }
}

export default new FabricFurnService();
