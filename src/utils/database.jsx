import * as SQLite from "expo-sqlite";
import * as FileSystem from "expo-file-system";
import { Asset } from "expo-asset";

const databaseName = "locations.db";
const databasePath = `${FileSystem.documentDirectory}SQLite/${databaseName}`;

export async function openDatabase() {
    const dbDir = `${FileSystem.documentDirectory}SQLite`;

    // Ensure the directory exists
    await FileSystem.makeDirectoryAsync(dbDir, { intermediates: true }).catch(() => {});

    // Check if the database already exists
    const fileInfo = await FileSystem.getInfoAsync(databasePath);

    if (!fileInfo.exists) {
        console.log("Copying database from assets...");
        const asset = Asset.fromModule(require("../../../assets/locations.db"));
        await asset.downloadAsync();
        await FileSystem.copyAsync({
            from: asset.localUri,
            to: databasePath
        });
    }

    return await SQLite.openDatabaseAsync(databaseName);
}
