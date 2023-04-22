import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const Estoque = sequelize.define('Estoque', {
  peca_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  peca_descricao: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  peca_modelo: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  peca_valorRevenda: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  peca_valorCompra: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  peca_marca: {
    type: DataTypes.STRING(50),
    allowNull: false,
  },
  estoque_criadoEm: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
  estoque_atualizadoEm: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW,
  },
}, {
  tableName: 'TB_estoque',
  timestamps: false,
});
