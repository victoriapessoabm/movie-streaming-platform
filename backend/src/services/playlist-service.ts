// src/services/playlist-service.ts

import {
  CreatePlaylistModel,
  PlaylistModel,
  UpdatePlaylistModel,
} from "../models/playlist-model";

import {
  deletePlaylist,
  getPlaylistById,
  getPlaylistByNameAndUserId,
  getPlaylistsByUserId,
  insertPlaylist,
  updatePlaylist,
} from "../repositories/playlist-repository";

import {
  BadRequestError,
  ConflictError,
  NotFoundError,
  ValidationError,
} from "../errors/errors";

// Camada responsável pelas regras de negócio das playlists

// Usado quando o usuário deseja criar uma nova playlist
export const createPlaylistService = async (
  playlist: CreatePlaylistModel,
): Promise<PlaylistModel> => {
  const { name, userId } = playlist;

  // Verifica se o usuário foi informado
  if (!userId || userId.trim() === "") {
    throw new BadRequestError("ID do usuário deve ser informado");
  }

  // Verifica se o nome da playlist foi informado
  if (!name || name.trim() === "") {
    throw new BadRequestError("O nome da playlist é obrigatório");
  }

  const playlistName = name.trim();

  // Verifica se o usuário já possui uma playlist com esse nome
  const alreadyExists = await getPlaylistByNameAndUserId(playlistName, userId);

  if (alreadyExists) {
    throw new ConflictError("Já existe uma playlist com esse nome");
  }

  // Cria a playlist no banco de dados
  const createdPlaylist = await insertPlaylist({
    name: playlistName,
    userId,
  });

  return createdPlaylist;
};

// Usado quando o usuário deseja visualizar todas as suas playlists
export const getPlaylistsByUserIdService = async (
  userId: string,
): Promise<PlaylistModel[]> => {
  // Verifica se o usuário foi informado
  if (!userId || userId.trim() === "") {
    throw new ValidationError("ID do usuário deve ser informado");
  }

  // Busca todas as playlists do usuário no banco de dados
  return await getPlaylistsByUserId(userId);
};

// Usado quando o usuário deseja excluir uma playlist existente
export const deletePlaylistService = async (id: string): Promise<void> => {
  // Verifica se o ID da playlist foi informado
  if (!id || id.trim() === "") {
    throw new ValidationError("ID da playlist deve ser informado");
  }

  // Busca a playlist antes de tentar excluir
  const playlist = await getPlaylistById(id);

  // Se a playlist não existir, retorna erro
  if (!playlist) {
    throw new NotFoundError("Playlist não encontrada");
  }

  // Exclui a playlist no banco de dados
  await deletePlaylist(id);
};

// Usado quando o usuário deseja editar o nome de uma playlist existente
export const updatePlaylistService = async (
  id: string,
  updates: UpdatePlaylistModel,
): Promise<PlaylistModel> => {
  // Verifica se o ID da playlist foi informado
  if (!id || id.trim() === "") {
    throw new ValidationError("ID da playlist deve ser informado");
  }

  // Verifica se o novo nome da playlist foi informado
  if (!updates.name || updates.name.trim() === "") {
    throw new BadRequestError("O nome da playlist é obrigatório");
  }

  // Busca a playlist que será editada
  const playlist = await getPlaylistById(id);

  // Se a playlist não existir, retorna erro
  if (!playlist) {
    throw new NotFoundError("Playlist não encontrada");
  }

  const playlistName = updates.name.trim();

  // Verifica se o usuário já possui uma playlist com esse novo nome
  const alreadyExists = await getPlaylistByNameAndUserId(
    playlistName,
    playlist.userId,
  );

  // Permite manter o mesmo nome, mas impede usar o nome de outra playlist do mesmo usuário
  if (alreadyExists && alreadyExists.id !== id) {
    throw new ConflictError("Já existe uma playlist com esse nome");
  }

  // Atualiza a playlist no banco de dados
  const updatedPlaylist = await updatePlaylist(id, {
    name: playlistName,
  });

  // Segurança extra caso a playlist deixe de existir durante a atualização
  if (!updatedPlaylist) {
    throw new NotFoundError("Não foi possível atualizar. Playlist não encontrada");
  }

  return updatedPlaylist;
};