// src/controllers/playlist-controller.ts

import { Request, Response } from "express";

import {
  CreatePlaylistModel,
  UpdatePlaylistModel,
} from "../models/playlist-model";

import {
  createPlaylistService,
  deletePlaylistService,
  getPlaylistsByUserIdService,
  updatePlaylistService,
} from "../services/playlist-service";

import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/errors";

// Camada responsável por receber as requisições HTTP e devolver respostas HTTP

// Usado quando o usuário deseja criar uma nova playlist
export const postPlaylist = async (req: Request, res: Response) => {
  try {
    // Os dados da playlist vêm no corpo da requisição
    const playlist: CreatePlaylistModel = req.body;

    // Chama o service para validar e criar a playlist
    const newPlaylist = await createPlaylistService(playlist);

    return res.status(201).json({
      message: "Playlist criada com sucesso",
      playlist: newPlaylist,
    });
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ConflictError) {
      return res.status(409).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro inesperado" });
  }
};

// Usado quando o usuário deseja visualizar todas as suas playlists
export const getPlaylists = async (req: Request, res: Response) => {
  try {
    // O ID do usuário vem pela rota
    const userId = String(req.params.userId);

    // Busca todas as playlists desse usuário
    const playlists = await getPlaylistsByUserIdService(userId);

    // Caso o usuário ainda não tenha playlists criadas
    if (playlists.length === 0) {
      return res.status(200).json({
        message: "Ainda não existem playlists criadas",
        playlists,
      });
    }

    return res.status(200).json({
      message: "Playlists encontradas com sucesso",
      playlists,
    });
  } catch (error: any) {
    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro inesperado" });
  }
};

// Usado quando o usuário deseja excluir uma playlist existente
export const deletePlaylist = async (req: Request, res: Response) => {
  try {
    // O ID da playlist vem pela rota
    const id = String(req.params.id);

    // Chama o service para validar e excluir a playlist
    await deletePlaylistService(id);

    return res.status(200).json({
      message: "Playlist removida com sucesso",
    });
  } catch (error: any) {
    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro inesperado" });
  }
};

// Usado quando o usuário deseja editar o nome de uma playlist existente
export const patchPlaylist = async (req: Request, res: Response) => {
  try {
    // O ID da playlist vem pela rota
    const id = String(req.params.id);

    // Os dados atualizados vêm no corpo da requisição
    const updates: UpdatePlaylistModel = req.body;

    // Chama o service para validar e atualizar a playlist
    const updatedPlaylist = await updatePlaylistService(id, updates);

    return res.status(200).json({
      message: "Playlist atualizada com sucesso",
      playlist: updatedPlaylist,
    });
  } catch (error: any) {
    if (error instanceof BadRequestError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ValidationError) {
      return res.status(400).json({ message: error.message });
    }

    if (error instanceof ConflictError) {
      return res.status(409).json({ message: error.message });
    }

    if (error instanceof NotFoundError) {
      return res.status(404).json({ message: error.message });
    }

    return res.status(500).json({ message: "Erro inesperado" });
  }
};