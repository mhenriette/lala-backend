import { config } from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";

config();

export const dataSourceOptions: DataSourceOptions = {
  // source
  type: "postgres",
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
  port: Number(process.env.DATABASE_PORT) || 5432,
  database: process.env.DATABASE_NAME,
  ssl: {
    rejectUnauthorized: false,
  },

  // configs
  synchronize: false,
  dropSchema: false,
  logging: false,
  entities: ["./src/database/entities/**/*.ts"],
  migrations: ["./src/database/migrations/**/*.ts"],
  migrationsTableName: "migration_table",
};

const dataSource = new DataSource(dataSourceOptions);
export default dataSource;