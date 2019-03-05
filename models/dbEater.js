// =============================================================
// Sequelize Model - Create Eater table in MySql
// =============================================================

module.exports = function (sequelize, DataTypes) {
  var Eater = sequelize.define("Eater",
    {
      eater_name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      timestamps: false
    }
  );

  Eater.associate = function (models) {
    Eater.belongsTo(models.Burger, {
      onDelete: "cascade",
      foreignKey: {
        allowNull: false
      }
    });
  };

  return Eater;
}
//=========================================================================
