import BaseService from "../core/base/baseService.js";
import fabricColorRepo from "../repositories/fabricColorRepo.js";
import AppError from "../core/AppError.js";

class FabricColorService extends BaseService {
  constructor() {
    super(fabricColorRepo);
  }

  async getColorsByFabricAndFurn(fabricId, furnId, allowEmpty = false) {
    const colors = await this.repo.findByFabricAndFurn(fabricId, furnId);

    if (!allowEmpty && !colors.length) {
      throw new AppError("Fabric Colors Not Found", 404);
    }

    return colors;
  }
}

export default new FabricColorService();
