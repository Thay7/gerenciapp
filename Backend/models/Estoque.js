import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const Estoque = sequelize.define('TB_estoque', {
    estoque_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estoque_produtoNome: {
      type: DataTypes.STRING,
      allowNull: false
    },
    estoque_produtoDescricao: {
      type: DataTypes.TEXT,
    },
    estoque_produtoMarca: {
      type: DataTypes.STRING
    },
    estoque_produtoQuantidade: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    estoque_produtoValorCompra: {
      type: DataTypes.DECIMAL(10, 2),
      allowNull: false
    },
    estoque_produtoValorVenda: {
      type: DataTypes.DECIMAL(10, 2),
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
    }
  }, {
    tableName: 'TB_estoque',
    timestamps: false
  });
  