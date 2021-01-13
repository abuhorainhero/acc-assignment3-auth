const shopService = require("../services/shop.service");

// ============ shops post ===========
module.exports.create = async (req, res, next) => {
  try {
    const shop = await shopService.create(req.body);
    return res.status(200).json(shop);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ massage: "Something went wrong" });
  }
};

// ============ shops get ===========
module.exports.getAll = async (req, res, next) => {
  try {
    const shop = await shopService.getAll();
    return res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ massage: "Something went wrong" });
  }
};

// ============ shops getById =================
module.exports.getById = async (req, res, next) => {
  try {
    const shop = await shopService.getById(req.params.id);
    return res.status(200).json(shop);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ massage: "Something went wrong" });
  }
};


//  ============ shops updateById ===========
module.exports.updateById = async (req, res, next) => {
    try {
        const shop = await shopService.updateById(req.params.id);
        return res.status(200).json(shop);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ massage: "Something went wrong"})
    }
}

// ============ shops deleteById ===========
module.exports.deleteById = async (req, res, next) => {
    try {
        const shop = await shopService.deleteById(req.params.id);
        return res.status(200).json(shop);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ massage: "Something went wrong"})
    }
}
