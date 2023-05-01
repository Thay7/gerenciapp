import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const Estoque = sequelize.define('TB_estoque', {
  estoque_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  estoque_quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estoque_criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estoque_editadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Produto',
      key: 'produto_id'
    }
  }
}, {
  tableName: 'TB_estoque',
  timestamps: false
});

