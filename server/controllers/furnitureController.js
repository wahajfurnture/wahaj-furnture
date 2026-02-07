import ResponseFormatter from "../core/ResponseFormatter.js";
import fabricColorService from "../services/fabricColorServices.js";
import fabricFurnService from "../services/fabricFurnServices.js";
import furnitureService from "../services/furnitureServices.js";

export const getSofas = async (req, res) => {
  req.query.category = "sofa";
  req.query.limit = 20;
  const limit = req.query.limit;
  const [furniture, count] = await furnitureService.getAllWithFeatures(
    req.query,
  );

  const totalPages = Math.ceil(count / limit);

  return ResponseFormatter.success(
    res,
    { data: furniture, count: totalPages },
    "All Furniture retrieved successfully",
  );
};

export const getCurtains = async (req, res) => {
  req.query.category = "curtain";
  req.query.limit = 20;
  const limit = req.query.limit;
  const [furniture, count] = await furnitureService.getAllWithFeatures(
    req.query,
  );

  const totalPages = Math.ceil(count / limit);

  return ResponseFormatter.success(
    res,
    { data: furniture, count: totalPages },
    "All Furniture retrieved successfully",
  );
};

export const getAllFurn = async (req, res) => {
  const limit = req.query.limit * 1 || 10;
  const [furniture, count] = await furnitureService.getAllWithFeatures(
    req.query,
  );

  const hasNextPage = furniture.length > limit;

  if (hasNextPage) {
    furniture.pop();
  }

  const totalPages = Math.ceil(count / limit);

  return ResponseFormatter.success(
    res,
    { data: furniture, count: totalPages },
    "All Furniture retrieved successfully",
  );
};

export const getFurn = async (req, res) => {
  let { id } = req.params;

  const furniture = await furnitureService.findById(id, "Furniture", false);

  const fabrics = await fabricFurnService.getFabricsByFurnId(id, true);

  const furnitureWithFabrics = {
    ...furniture.toObject(),
    fabrics,
  };

  return ResponseFormatter.success(
    res,
    furnitureWithFabrics,
    "Furniture with fabrics retrieved successfully",
  );
};

export const getFabricColors = async (req, res, next) => {
  const { fabricId, furnId } = req.params;

  const colors = await fabricColorService.getColorsByFabricAndFurn(
    fabricId,
    furnId,
    true,
  );

  return ResponseFormatter.success(
    res,
    colors,
    "Fabric colors retrieved successfully",
  );
};
