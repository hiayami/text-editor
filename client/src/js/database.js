import { openDB } from 'idb';

const initdb = async () =>
  openDB('teddy', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('teddy')) {
        console.log('teddy database already exists');
        return;
      }
      db.createObjectStore('teddy', { keyPath: 'id' });
      console.log('teddy database created');
    },
  });

// method that accepts some content and adds it to the database
export const putDb = async (content) => 
{console.log('PUT to the database');
const teddyDb = await openDB('teddy', 1);
const tx = teddyDb.transaction('teddy', 'readwrite');
const store = tx.objectStore('teddy');
const request = store.put({ id: 1, text: content });
const result = await request;
console.log('🚀 - data saved to the database', result);
};

// method that gets all the content from the database
export const getDb = async () => {
  console.log('Get all content from the database');
  const teddyDb = await openDB('teddy', 1);
  const tx = teddyDb.transaction('teddy', 'readonly');
  const store = tx.objectStore('teddy');
  const request = store.getAll();
  const result = await request;
  console.log('result.value', result);
  return result?.[0]?.text;
};

initdb();
