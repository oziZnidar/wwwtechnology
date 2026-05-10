import express from 'express';
import 'dotenv/config';
import { db_initialize_create } from "./db.js";
import itemsRouter from "./routes/items.js";
import authRouter from "./routes/auth.js"; // Import Auth Router

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use('/items', itemsRouter);
app.use('/auth', authRouter);

app.get('/health', (req, res) => {
  res.json({ status: 'ok' });
});

db_initialize_create().then(() => {
  console.log("DB initialized and tables created");
  
  app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}`);
  });
}).catch(err => {
  console.error("Failed to initialize database:", err);
});