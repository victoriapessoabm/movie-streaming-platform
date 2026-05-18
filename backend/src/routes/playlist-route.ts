// src/routes/playlist-route.ts

import Router from "express";

import {
  deletePlaylist,
  getPlaylists,
  patchPlaylist,
  postPlaylist,
} from "../controllers/playlist-controller";

// Camada responsável por definir as rotas da feature Minhas Playlists

export const router = Router();

// Usado quando o usuário deseja criar uma nova playlist
// Body esperado: { name: string, userId: string }
router.post("/playlists", postPlaylist);

// Usado quando o usuário deseja visualizar todas as suas playlists
// O userId vem pela URL
router.get("/users/:userId/playlists", getPlaylists);

// Usado quando o usuário deseja editar o nome de uma playlist existente
// O id da playlist vem pela URL
// Body esperado: { name: string }
router.patch("/playlists/:id", patchPlaylist);

// Usado quando o usuário deseja excluir uma playlist existente
// O id da playlist vem pela URL
router.delete("/playlists/:id", deletePlaylist);