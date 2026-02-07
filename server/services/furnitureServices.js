import BaseService from "../core/base/baseService.js";
import furnitureRepo from "../repositories/furnitureRepo.js";
import APIFeatures from "../utils/apiFeatures.js";

class FurnitureService extends BaseService {
  constructor() {
    super(furnitureRepo);
  }

  async getAllWithFeatures(queryString) {
    const [furniture, pages] = await Promise.all([
      new APIFeatures(this.repo.model.find(), queryString)
        .filter()
        .sort()
        .limitFields()
        .paginate(),
      new APIFeatures(this.repo.model.find(), queryString)
        .filter()
        .countDocuments(),
    ]);

    return [furniture, pages];
  }
}

export default new FurnitureService();
