import { JSONFilePreset } from "lowdb/node";

const db = JSONFilePreset('db.json', { users: [] });

export default db;
