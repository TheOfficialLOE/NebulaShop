const express = require("express");
const app = express();
const config = require("config");

require("./startup/routes")(app);
require("./startup/prod")(app);

const port = process.env.PORT || 3000

app.listen(port, () => {
    console.log(`Listening on port ${port}`);
});

