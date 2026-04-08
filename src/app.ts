import express, { Application } from "express";
import cors from "cors";
import routes from "./routes";

const app: Application = express();

app.use(express.json());
// app.use(cors());

app.use(cors({
  origin: "http://localhost:5173",  // your frontend
  credentials: true,                 // allow cookies / auth headers
  methods: ["GET", "POST", "PUT", "DELETE","PATCH", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
}));

// 🔥 use central routes
app.use("/api", routes);

app.get("/home", (req, res) => {
  res.send("Api is Running");
});

export default app;