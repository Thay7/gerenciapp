import {Sequelize} from 'sequelize'

const sequelize = new Sequelize('estoque', 'admin', 'root', {
  host: 'localhost',
  dialect: 'mysql'
});

export default sequelize;