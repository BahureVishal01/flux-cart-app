import { configDotenv } from "dotenv";
configDotenv()
interface DatabaseConfig {
    HOST: string;
    USER: string;
    PASSWORD: string;
    DB: string;
    port: number;
    dialect: string;
  }
  
  const databaseConfig: DatabaseConfig = {
    HOST: process.env.DB_HOST || 'localhost',
    USER: process.env.DB_USER || 'postgres',
    PASSWORD: process.env.DB_PASSWORD || 'root',
    DB: process.env.DB_NAME || 'fluxCartDB',
    port: parseInt(process.env.DB_PORT || '5432', 10), // Assuming default port is 5432 for PostgreSQL
    dialect: 'postgres',
  };
  
  export default databaseConfig;