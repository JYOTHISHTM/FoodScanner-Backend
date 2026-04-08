import dotenv from "dotenv";
import app from "./app";
import { connectDB } from "./core/config/db";
import { seedAdmin } from "./core/config/seedAdmin";


dotenv.config();

const PORT = process.env.PORT || 4000;

connectDB();

app.listen(PORT,async () => {
  console.log(`server running on ${PORT}`);
  await seedAdmin()

});

