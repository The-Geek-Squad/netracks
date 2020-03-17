module.exports = {
    HOST: "localhost",
    USER: "netrack",
    PASSWORD: "StrongPassword",
    DB: "netracks",
    dialect: "mysql",
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  };