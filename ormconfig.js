module.exports = {
    "type": "postgres",
    "host": process.env.DB_HOST,
    "port": process.env.DB_PORT,
    "username": process.env.DB_USER,
    "password": process.env.DB_PASS,
    "database": process.env.DB_NAME,
    "synchronize": false,
    "logging": false,
    "entities": ["entities/*.ts"],
    "migrations": ["migrations/*.ts"],
    "subscribers": ["subscribers/*.ts"],
    "cli": {
        "entitiesDir": "entities",
        "migrationsDir": "migrations",
        "subscribersDir": "subscribers"
    }
};
