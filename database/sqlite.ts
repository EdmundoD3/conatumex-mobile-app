import * as SQLite from 'expo-sqlite';
import { DatabaseInitializer } from '@database/initialization/DatabaseInitializer';

const db = SQLite.openDatabaseAsync("conatumex");

let isNotInitialized = true;

export const getDatabaseConnection = async () => {
  const database = await db;
  if (isNotInitialized) {
    await DatabaseInitializer.initialize(database);
    isNotInitialized = false;
  }
  return database;
};

export default db;
