// =============================================================
// Sequelize Model require
// =============================================================
const db = require("../models");

// =============================================================
// Html Routes
// =============================================================
module.exports = function (app) {

    app.get("/api/", (req, res) => {
        db.Burger.findAll({
            include: [db.Eater]
        })
            .then((allBurger) => {
                res.json(allBurger);
            })
    });


    app.post("/api/burger/:burgerName", (req, res) => {
        db.Burger.create({
            burger_name: req.params.burgerName,
        })
            .then((createBurger) => {
                res.json(createBurger);
            })
    });


    app.post("/api/eater/:eaterName", (req, res) => {
        console.log("req.body:_________", req.body)

        db.Eater.create({
            eater_name: req.params.eaterName,
            BurgerId: req.body.foreignKey
        })
            .then((createEater) => {
                console.log(createEater)
                res.json(createEater);
            })
    });


    app.put("/api/update/:burgerId", (req, res) => {
        db.Burger.update({
            devoured: 1,
        }, {
                where: { id: req.params.burgerId }
            })
            .then((updateState) => {
                res.json(updateState);
            })
    })
}