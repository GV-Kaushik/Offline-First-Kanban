import { openDB } from "idb";

const DB_NAME = "kanban-db";
const STORE_NAME = "tasks";

export async function getDB() {
  return openDB(DB_NAME, 1, {
    upgrade(db) {
      if (!db.objectStoreNames.contains(STORE_NAME)) {
        db.createObjectStore(STORE_NAME);
      }
    },
  });
}

export async function saveTasks(tasks) {
  const db = await getDB();
  await db.put(STORE_NAME, tasks, "tasks");
}

export async function loadTasks() {
  const db = await getDB();
  return (await db.get(STORE_NAME, "tasks")) || [];
}
