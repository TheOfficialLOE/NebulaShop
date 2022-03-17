const express = require("express");
const router = express.Router();

// We'll manage products CRUD operations here...


router.post("/add", async (req, res) => {
    return res.send(req.isSuperAdmin);
});


module.exports = router