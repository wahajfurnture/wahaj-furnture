import BaseService from "../core/base/baseService.js";
import fabricRepo from "../repositories/fabricRepo.js";

class FabricService extends BaseService {
  constructor() {
    super(fabricRepo);
  }

  async findAndLimit(limit, cursor) {
    const page = (cursor - 1) * limit;
    const fabrics = await this.repo.model
      .find()
      .skip(page)
      .sort({ _id: -1 })
      .limit(limit);

    return fabrics;
  }
}

export default new FabricService();
