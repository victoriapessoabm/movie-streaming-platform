// src/repositories/playlist-repository.ts

import { CreatePlaylistModel, PlaylistModel, UpdatePlaylistModel } from "../models/playlist-model";
import { prisma } from "../database/prisma";

// Camada responsável pela interação com o banco de dados

// usado quando o usuário deseja visualizar todas as suas playlists
export const getPlaylistsByUserId = async ( //busca todas as playlists de um usuário específico
  userId: string,
): Promise<PlaylistModel[]> => {
  return await prisma.playlist.findMany({
    where: {
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

// Usado para buscar uma playlist específica por ID para excluir ou editar
export const getPlaylistById = async ( // Busca uma playlist específica por ID
  id: string,
): Promise<PlaylistModel | null> => {
  return await prisma.playlist.findUnique({
    where: {
      id,
    },
  });
};

// Usado para verificar se já existe uma playlist com o mesmo nome para o mesmo usuário antes de criar uma nova
export const getPlaylistByNameAndUserId = async ( // Busca uma playlist específica por nome e ID do usuário
  name: string,
  userId: string,
): Promise<PlaylistModel | null> => {
  return await prisma.playlist.findFirst({
    where: {
      name,
      userId,
    },
  });
};

// Usado quando o usuário deseja criar uma nova playlist
export const insertPlaylist = async ( // Insere uma nova playlist no banco de dados
  playlist: CreatePlaylistModel,
): Promise<PlaylistModel> => {
  return await prisma.playlist.create({
    data: playlist,
  });
};

// Usado quando o usuário deseja excluir uma playlist existente
export const deletePlaylist = async (id: string): Promise<boolean> => { // Exclui uma playlist do banco de dados
  const playlist = await prisma.playlist.findUnique({
    where: {
      id,
    },
  });

  if (playlist) {
    await prisma.playlist.delete({
      where: {
        id,
      },
    });

    return true;
  }

  return false;
};

// Usado quando o usuário deseja editar uma playlist existente
export const updatePlaylist = async ( // Atualiza uma playlist existente no banco de dados
  id: string,
  updates: UpdatePlaylistModel,
): Promise<PlaylistModel | null> => {
  const playlist = await prisma.playlist.findUnique({
    where: {
      id,
    },
  });

  if (playlist) {
    return await prisma.playlist.update({
      where: {
        id,
      },
      data: updates,
    });
  }

  return null;
};