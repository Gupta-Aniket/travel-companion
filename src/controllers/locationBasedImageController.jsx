import { openDatabase } from "../utils/database";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { sql } from "drizzle-orm";
import { geolocation } from "../database/schema";

export async function getRandomLocation() {
    console.log("getRandomLocation called");

    try {
        const dbInstance = await openDatabase();
        // console.log("Database instance:", dbInstance);

        const db = drizzle(dbInstance);
        // console.log("Drizzle instance:", db);

        const result = await db
            .select({
                locationName: geolocation.locationName,
                latitude: geolocation.latitude,
                longitude: geolocation.longitude
            })
            .from(geolocation)
            .orderBy(sql`RANDOM()`)
            .limit(1);

        console.log("Query result:", result);
        return result;
    } catch (error) {
        console.error("Error in getRandomLocation:", error);
        return null;
    }
}

