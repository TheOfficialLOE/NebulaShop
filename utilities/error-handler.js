module.exports = action => (req, res, next) => action(req, res).catch(err => {
    return res.status(err.code).json(err.message);
});