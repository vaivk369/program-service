module.exports = function(sequelize, DataTypes) {
    const formConfig = sequelize.define("formConfig", {
      id: {
        type: DataTypes.UUID,
        allowNull: false,
      },
      channel: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      objectype: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
      },
      primarycategory: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      status: {
        type: DataTypes.ENUM("Active", "Inactive"),
        allowNull: false
      },
      context: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      context_type: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      operation: {
        type: DataTypes.STRING,
        primaryKey: true
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