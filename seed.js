const { initializeApp } = require("firebase/app");
const { getDatabase, ref, set } = require("firebase/database");

const firebaseConfig = {
  apiKey: "AIzaSyA3keI2wDinvm81432YQaplvW4C05sm9Gc",
  authDomain: "aquatrack-1.firebaseapp.com",
  databaseURL: "https://aquatrack-1-default-rtdb.firebaseio.com",
  projectId: "aquatrack-1",
  appId: "1:577450349372:web:34581fd58176aee6c48439",
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

function randomInRange(min, max, decimals = 1) {
  const value = Math.random() * (max - min) + min;
  return parseFloat(value.toFixed(decimals));
}

async function seed() {
  const now = Date.now();
  const readings = {};

  for (let i = 0; i < 20; i++) {
    const timestamp = now - i * 30_000;
    readings[timestamp] = {
      pH: randomInRange(6.8, 8.2),
      tds: randomInRange(200, 600, 0),
      turbidity: randomInRange(0, 100),
      temperature: randomInRange(18, 32),
      timestamp,
    };
  }

  await set(ref(db, "readings"), readings);
  console.log("Pushed 20 readings to readings/");
  console.log("Timestamps range:", new Date(now - 19 * 30_000).toISOString(), "→", new Date(now).toISOString());
  process.exit(0);
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
