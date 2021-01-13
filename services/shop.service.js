const shopModel = require("../models/Shop.model");

// ============ shops post =================
module.exports.create = (shop) => {
  return shopModel.create(shop);
};

// ============ shops get =================
module.exports.getAll = () => {
  return shopModel.find();
};

// ============ shops getById =================
module.exports.getById = (id) => {
  return shopModel.findById({ _id: id });
};

// ============ shops updateById =================
module.exports.updateById = (id) => {
    return shopModel.updateOne({ _id: id })
}

//  ============ shops deleteById =================
module.exports.deleteById = (id) => {
  return shopModel.deleteOne({ _id: id });
};
