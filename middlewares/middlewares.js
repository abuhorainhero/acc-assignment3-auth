module.exports.first = function (req, res, next) {
    console.log("1st Middleware");
    next();
}

module.exports.second = function (req, res, next) {
    console.log("2nd Middleware");
    next();
}

module.exports.third = function (req, res, next) {
    console.log("3rd Middleware");
    return res.send("Done");
}