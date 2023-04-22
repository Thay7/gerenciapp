import { DataTypes } from 'sequelize';
import sequelize from '../db.js';

export const Empresa = sequelize.define('TB_empresa', {
    empresa_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    empresa_razaoSocial: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_nomeFantasia: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_cnpj: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_logradouro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_bairro: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_cidade: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_uf: {
      type: DataTypes.STRING,
      allowNull: false
    },
    empresa_numero: {
      type: DataTypes.STRING,
      allowNull: false
    }
  });
