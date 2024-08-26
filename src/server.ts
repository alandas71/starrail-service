import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import rateLimit from "express-rate-limit";
import routes from "./routes/routes";

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  max: 1000,
  message: "Muitas tentativas, por favor tente novamente mais tarde.",
});

const corsOptions = {
  origin: "*",
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  credentials: true,
  optionsSuccessStatus: 204,
};

/* Use */
app.use(limiter);
app.use(express.json());
app.use(cors(corsOptions));
app.use("/api", routes);

/* Conexão */
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});
