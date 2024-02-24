import { Pool} from 'pg';
import databaseConfig from '../configs/db.config';


  // Create a new Pool object
  const pool = new Pool({
    user: databaseConfig.USER,
    host: databaseConfig.HOST,
    database: databaseConfig.DB,
    password: databaseConfig.PASSWORD,
    port: databaseConfig.port,
    connectionTimeoutMillis: 1000000
  });
  // const connectionString = 'postgresql://postgres:mysecretpassword@172.25.0.4:5435/fluxCartDB';
  // const pool = new Pool({
  //   connectionString: connectionString,
  // });
export default pool;