import express, { Request, Response } from "express";
import { router as movieRouter } from "./routes/movie-routes";
import { router as playlistRouter } from "./routes/playlist-route";

const app = express();

app.use(express.json());

// Rotas de filmes
app.use("/", movieRouter);

// Rotas de playlists
app.use("/", playlistRouter);

app.get("/", (req: Request, res: Response) => {
  res.json({ mensagem: "API funcionando!" });
});

app.listen(3000, () => {
  console.log("Servidor rodando em http://localhost:3000");
});