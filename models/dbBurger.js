// =============================================================
// Sequelize Model - Create Burger table in MySql
// =============================================================

module.exports = function (sequelize, DataTypes) {
  var Burger = sequelize.define("Burger",
    {
      burger_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      devoured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
      },
    },
    {
      timestamps: false
    }
  );

  Burger.associate = function (models) {
    Burger.hasMany(models.Eater)
  };


return Burger;
};


//=========================================================================
