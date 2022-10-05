const mongoose = require("mongoose");

mongoose
  .connect(process.env.DATABASE_CONNECTION)
  .then(() => {
    console.log("Veritabanina basarili sekilde baglanildi");
  })
  .catch((err) => console.log("Veritabanina baglanilamadi"));
