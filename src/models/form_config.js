module.exports = function(sequelize, DataTypes) {
    const formConfig = sequelize.define("formConfig", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false
      },
      objectype: {
        type: DataTypes.STRING,
        allowNull: false
      },
      primarycategory: {
        type: DataTypes.STRING
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull: false
      },
      context: {
        type: DataTypes.STRING
      },
      context_type: {
        type: DataTypes.STRING
      },
      operation: {
        type: DataTypes.STRING
      },
      data: {
        type: DataTypes.JSONB
      },
      createdby: {
        type: DataTypes.STRING
      },
      updatedby: {
        type: DataTypes.STRING
      },
      createdon: {
        type: DataTypes.DATE
      },
      updatedon: {
        type: DataTypes.DATE
      }
    }, {
        timestamps: false,
        freezeTableName: true
    });
    return formConfig;
  };