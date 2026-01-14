import { ref, onValue, set, push, update, get } from "firebase/database";
import { db } from "./firebase";

export const subscribeToData = (path: string, callback: (data: any) => void) => {
    const dataRef = ref(db, path);
    return onValue(dataRef, (snapshot) => {
        const val = snapshot.val();
        console.log(`Data received for ${path}:`, val); // Debug log
        callback(val);
    }, (error) => {
        console.error(`Error subscribing to ${path}:`, error); // Error log
    });
};

export const writeData = async (path: string, data: any) => {
    const dataRef = ref(db, path);
    await set(dataRef, data);
};

export const pushData = async (path: string, data: any) => {
    const dataRef = ref(db, path);
    await push(dataRef, data);
};

export const updateData = async (path: string, updates: any) => {
    const dataRef = ref(db, path);
    await update(dataRef, updates);
};

export const getData = async (path: string) => {
    const dataRef = ref(db, path);
    const snapshot = await get(dataRef);
    return snapshot.val();
};
