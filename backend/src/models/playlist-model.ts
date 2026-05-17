// src/models/playlist-model.ts

export interface PlaylistModel {
  id: string;
  name: string;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreatePlaylistModel {
  name: string;
  userId: string;
}

export interface UpdatePlaylistModel {
  name: string;
}