import BaseRepo from "../core/base/baseRepository.js";
import Furniture from "../models/furniture.js";

class FurnitureRepo extends BaseRepo {
  constructor() {
    super(Furniture);
  }
}

export default new FurnitureRepo();
