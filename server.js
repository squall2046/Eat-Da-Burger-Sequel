// =============================================================
// Node Express, Port
// =============================================================
const express = require('express');
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// ====================== Models ===============================
// Sequelize promise-based ORM
// =============================================================
const db = require("./models");

// ====================== Views ================================
// Handlebars,
// =============================================================
const exphbs = require("express-handlebars");
app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");

// ====================== Controllers ==========================
// Routes require
// =============================================================
require("./routes/html-routes.js")(app);
require("./routes/api-routes.js")(app);

// =============================================================
// Syncing our sequelize models, then listen to PORT
// =============================================================
const PORT = process.env.PORT || 8080;

db.sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => {
        console.log("PORT: ", PORT)
    });
});
