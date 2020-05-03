const Sequelize = require('sequelize')
const db = require('./database')


const winningAndMoney = db.define('prandwins',{
    year:{
        type: Sequelize.DATE
    },
    team: {
        type: Sequelize.STRING,
        allowNull: false
    },
    wins: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    payroll: {
        type: Sequelize.FLOAT,
        allowNull: false
    },
    imageUrl: {
        type: Sequelize.STRING
    }
})


module.exports = winningAndMoney