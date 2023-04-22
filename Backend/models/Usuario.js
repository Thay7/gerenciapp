import { DataTypes } from 'sequelize';
import sequelize from '../db.js';
import { Empresa } from './Empresa.js';

export const Usuario = sequelize.define('Usuario', {
  usuarios_id: {

    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  usuarios_nome: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  usuarios_email: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  usuarios_login: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  usuarios_senha: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  usuarios_empresa: {
    type: DataTypes.STRING(100),
    allowNull: false,
  },
  empresa_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  }
}, {
  tableName: 'TB_usuarios',
});


Usuario.belongsTo(Empresa, { foreignKey: 'empresa_id' });
Empresa.hasMany(Usuario, { foreignKey: 'empresa_id' });

export default Usuario;