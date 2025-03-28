
const connection = {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 3306,
    user: process.env.DB_USERNAME || 'root',
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE || '',
};

const dbConfig = {
    client: 'mysql2',
    connection,
    pool: { min: 0, max: 10 },
}

// It will use NODE_ENV as key.
// Default is `development` if NODE_ENV is not set.
export default {
    development: dbConfig,
};
