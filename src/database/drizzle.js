import { drizzle } from "drizzle-orm/expo-sqlite";
import { openDatabase } from "../utils/database";

export async function getDb() {
    const sqlite = await openDatabase();
    return drizzle(sqlite);
}
