// =============================================================
// Sequelize Model require
// =============================================================
const db = require("../models");

// =============================================================
// Html Routes
// =============================================================
module.exports = function (app) {

	// Homepage:
	app.get('/', (req, res) => {
		db.Burger.findAll({
			include: [{model: db.Eater}],
			order: [['burger_name']]
		})
			.then((data) => {
				var hbsObject = { burgers: data };
				console.log(hbsObject)
				res.render('index', hbsObject);
			})
	});
}


