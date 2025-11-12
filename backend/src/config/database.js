import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  process.env.DB_NAME || 'totem_db',
  process.env.DB_USER || 'root',
  process.env.DB_PASS || 'password',
  {
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 3306,
    dialect: 'mysql',
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    pool: {
      max: 5,
      min: 0,
      acquire: 60000,
      idle: 20000
    },
    dialectOptions: {
      timezone: '+00:00',
      dateStrings: true,
      typeCast: true
    },
    define: {
      timestamps: true,
      createdAt: 'fecha_creacion',
      updatedAt: 'fecha_actualizacion'
    },
    dialectOptions: {
      connectTimeout: 60000,
      // SSL para conexiones remotas seguras
      ssl: process.env.NODE_ENV === 'production' ? {
        rejectUnauthorized: false
      } : null
    },
    define: {
      timestamps: true,
      underscored: false,
      freezeTableName: true
    }
  }
);

export default sequelize;

