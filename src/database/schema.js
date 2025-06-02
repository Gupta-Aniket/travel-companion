import { sqliteTable, text, real } from "drizzle-orm/sqlite-core";

export const geolocation = sqliteTable("geolocation", {
    locationName: text("location_name").notNull(),
    latitude: real("latitude").notNull(),
    longitude: real("longitude").notNull(),
    country: text("country"),
    countryCode: text("country_code")
});
