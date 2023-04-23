import { DataTypes } from 'sequelize';
import sequelize from '../db.js';


export const Produto = sequelize.define('TB_produto', {
    produto_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    produto_nome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    produto_descricao: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    produto_valorCompra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    produto_valorVenda: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    produto_criadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    },
    produto_atualizadoEm: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      onUpdate: DataTypes.NOW
    }
  }, {
    tableName: 'TB_produto',
    timestamps: false
  });