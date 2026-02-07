import ResponseFormatter from "../core/ResponseFormatter.js";
import fabricColorService from "../services/fabricColorServices.js";
import fabricFurnService from "../services/fabricFurnServices.js";
import furnitureService from "../services/furnitureServices.js";
import fabricService from "../services/fabricServices.js";

export const getAllFabrics = async (req, res) => {
  const limit = 20;
  const fabrics = await fabricService.findAndLimit(limit, req.query.page);

  const hasNextPage = fabrics.length > limit - 1;

  if (hasNextPage) {
    fabrics.pop();
  }

  return ResponseFormatter.success(
    res,
    { data: fabrics, hasNextPage },
    "All Fabrics retrieved successfully",
  );
};

export const createFurn = async (req, res) => {
  const data = req.body;

  const furniture = await furnitureService.create(data);

  ResponseFormatter.success(res, furniture, "تم إضافة الأثاث بنجاح", 201);
};

export const createFabric = async (req, res) => {
  const data = req.body;
  const fabric = await fabricService.create(data);

  ResponseFormatter.success(res, fabric, "تم إضافة القماش بنجاح", 201);
};

export const createColor = async (req, res) => {
  const data = req.body;

  if (!data.images) {
    data.images = [];
  } else if (!Array.isArray(data.images)) {
    data.images = [data.images];
  }

  const fabricColor = await fabricColorService.create(data);

  ResponseFormatter.success(res, fabricColor, "تم إضافة اللون بنجاح", 201);
};

export const editFurn = async (req, res) => {
  const { furnId } = req.params;
  const data = req.body;

  const furnitureUpdate = await furnitureService.findByIdAndUpdate(
    furnId,
    data,
    "الأثاث",
  );

  ResponseFormatter.success(res, furnitureUpdate, "تم تحديث الأثاث بنجاح", 200);
};

export const editFabric = async (req, res) => {
  const { fabricId } = req.params;
  const data = req.body;
  const fabricUpdate = await fabricService.findByIdAndUpdate(
    fabricId,
    data,
    "القماش",
  );

  ResponseFormatter.success(res, fabricUpdate, "تم تحديث القماش بنجاح", 200);
};

export const editColor = async (req, res) => {
  const { colorId } = req.params;
  const data = req.body;

  if (data.images && !Array.isArray(data.images)) {
    data.images = [data.images];
  }

  const fabricUpdate = await fabricColorService.findByIdAndUpdate(
    colorId,
    data,
    "لون القماش",
  );

  ResponseFormatter.success(res, fabricUpdate, "تم تحديث اللون بنجاح", 200);
};

export const associateFabricWithFurn = async (req, res) => {
  const { furnId, fabricId } = req.body;

  if (!furnId || !fabricId) {
    return ResponseFormatter.error(
      res,
      "يجب توفير معرف الأثاث ومعرف القماش",
      400,
    );
  }

  await Promise.all([
    furnitureService.findById(furnId, "الأثاث", false),
    fabricService.findById(fabricId, "القماش", false),
  ]);

  const association = await fabricFurnService.create({
    furnId,
    fabricId,
  });

  ResponseFormatter.success(
    res,
    association,
    "تم ربط القماش بالأثاث بنجاح",
    201,
  );
};

export const deleteFurn = async (req, res) => {
  const { furnId } = req.params;

  await Promise.all([
    fabricColorService.delete({ furnId }, "لون القماش", true),
    fabricFurnService.delete({ furnId }, "ربط الأثاث", true),
    furnitureService.findByIdAndDelete(furnId, "الأثاث"),
  ]);

  ResponseFormatter.success(res, null, "تم حذف الأثاث بنجاح", 200);
};

export const deleteFabric = async (req, res) => {
  const { fabricId } = req.params;

  await Promise.all([
    fabricFurnService.delete({ fabricId }, "القماش", true),
    fabricColorService.delete({ fabricId }, "لون القماش", true),
    fabricService.findByIdAndDelete(fabricId, "القماش"),
  ]);

  ResponseFormatter.success(res, null, "تم حذف القماش بنجاح", 200);
};

export const deleteColor = async (req, res) => {
  const { colorId } = req.params;

  await fabricColorService.findByIdAndDelete(colorId, "لون القماش");

  ResponseFormatter.success(res, null, "تم حذف اللون بنجاح", 200);
};

export const removeAssociation = async (req, res) => {
  const { furnId, fabricId } = req.body;

  if (!furnId || !fabricId) {
    return ResponseFormatter.error(
      res,
      "يجب توفير معرف الأثاث ومعرف القماش",
      400,
    );
  }

  await fabricFurnService.deleteOne({ furnId, fabricId });

  ResponseFormatter.success(
    res,
    null,
    "تم إزالة الربط بين القماش والأثاث بنجاح",
    200,
  );
};

export const getFabricsByFurnId = async (req, res) => {
  const { furnId } = req.params;

  if (!furnId) {
    return ResponseFormatter.error(res, "يجب توفير معرف الأثاث", 400);
  }

  const fabricFurns = await fabricFurnService.getFabricsByFurnId(furnId, true);

  const fabricIds = fabricFurns.map((fabric) => fabric?._id);

  ResponseFormatter.success(
    res,
    fabricIds,
    "تم الحصول على أقمشة الأثاث بنجاح",
    200,
  );
};
