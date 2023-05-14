import { Model, DataTypes } from 'sequelize';
import sequelize from '../db.js';
import { Produto } from './Produto.js';

export class Estoque extends Model {}
Estoque.init({
  estoque_id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  produto_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Produto,
      key: 'produto_id'
    }
  },
  estoque_quantidade: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  estoque_criadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estoque_editadoEm: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    onUpdate: DataTypes.NOW
  }
}, {
  sequelize,
  modelName: 'Estoque',
  tableName: 'TB_estoque',
  timestamps: false
});

Produto.hasOne(Estoque, { foreignKey: 'produto_id', as: 'estoque' });
Estoque.belongsTo(Produto, { foreignKey: 'produto_id' });
