module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define("Task", {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      description: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      dateTime: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    }); 
  
    return Task;
  };
  