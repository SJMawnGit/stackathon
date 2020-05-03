const Sequelize = require('sequelize')

const db = new Sequelize('postgres://localhost:5432/mlbData',{
    logging: false,
    
})

module.exports = db