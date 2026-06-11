import { useEffect, useState } from "react";

import type { FormEvent } from "react";
import type { PageMessage, Playlist } from "../../types";
import {
  createPlaylist,
  deletePlaylist,
  getPlaylistsByUserId,
  removeMovieFromPlaylist,
  updatePlaylist,
} from "../../services/playlistApi";
import cinemaLogo from "../../assets/cinema_logo.png";
import "./MinhasPlaylistsPage.css";

interface MinhasPlaylistsPageProps {
  userId: string;
  onGoToHome: () => void;
}

interface SidebarProps {
  onGoToHome: () => void;
  onGoToPlaylists: () => void;
}

interface TopbarProps {
  selectedPlaylist: Playlist | null;
  hasPlaylists: boolean;
  onGoToHome: () => void;
  onGoToPlaylists: () => void;
  onCreatePlaylist: () => void;
}

interface PlaylistDetailSectionProps {
  playlist: Playlist;
  onRemoveMovie: (playlist: Playlist, movieName: string) => void;
}

interface PlaylistListSectionProps {
  playlists: Playlist[];
  onOpenPlaylist: (playlistId: string) => void;
  onEditPlaylist: (playlist: Playlist) => void;
  onDeletePlaylist: (playlist: Playlist) => void;
}

interface PlaylistModalProps {
  editingPlaylist: Playlist | null;
  playlistName: string;
  onPlaylistNameChange: (name: string) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  onClose: () => void;
}

function getErrorMessage(error: unknown, fallbackMessage: string) {
  return error instanceof Error ? error.message : fallbackMessage;
}

function getPlaylistMovieCountText(playlist: Playlist) {
  return playlist.movies.length === 0
    ? "Nenhum filme adicionado"
    : `${playlist.movies.length} filme(s)`;
}

function Sidebar({ onGoToHome, onGoToPlaylists }: SidebarProps) {
  return (
    <aside className="playlist-sidebar">
      <button
        className="playlist-logo"
        type="button"
        onClick={onGoToHome}
        aria-label="Ir para a página principal"
      >
        <img src={cinemaLogo} alt="CInema Filmes Antigos" />
      </button>

      <nav className="playlist-menu">
        <button
          className="playlist-menu-item"
          type="button"
          onClick={onGoToHome}
        >
          <span>⌂</span>
          Página Principal
        </button>

        <button
          className="playlist-menu-item active"
          type="button"
          onClick={onGoToPlaylists}
        >
          <span>≡+</span>
          Minhas Playlists
        </button>
      </nav>
    </aside>
  );
}

function Topbar({
  selectedPlaylist,
  hasPlaylists,
  onGoToHome,
  onGoToPlaylists,
  onCreatePlaylist,
}: TopbarProps) {
  return (
    <header className="playlist-topbar">
      <div>
        <p className="playlist-eyebrow">
          {selectedPlaylist ? "Playlist" : "Biblioteca pessoal"}
        </p>

        <h1>{selectedPlaylist ? selectedPlaylist.name : "Minhas Playlists"}</h1>
      </div>

      <div className="playlist-topbar-actions">
        <button
          className="playlist-secondary-button"
          type="button"
          onClick={onGoToHome}
        >
          Voltar para Página Principal
        </button>

        {!selectedPlaylist && hasPlaylists && (
          <button
            className="playlist-primary-button"
            type="button"
            onClick={onCreatePlaylist}
          >
            <span>+</span>
            Criar Nova Playlist
          </button>
        )}

        {selectedPlaylist && (
          <button
            className="playlist-secondary-button"
            type="button"
            onClick={onGoToPlaylists}
          >
            Voltar para Minhas Playlists
          </button>
        )}
      </div>
    </header>
  );
}

function PlaylistMessage({ message }: { message: PageMessage | null }) {
  if (!message) {
    return null;
  }

  return (
    <div className={`playlist-message ${message.type}`}>{message.text}</div>
  );
}

function PlaylistDetailSection({
  playlist,
  onRemoveMovie,
}: PlaylistDetailSectionProps) {
  return (
    <section className="playlist-detail-section">
      <div className="playlist-list-header">
        <div>
          <p className="playlist-eyebrow">Filmes adicionados</p>
          <h2>{playlist.name}</h2>
        </div>

        <span>{playlist.movies.length} filme(s) na playlist</span>
      </div>

      {playlist.movies.length === 0 ? (
        <div className="playlist-movies-empty">
          <h3>Nenhum filme adicionado</h3>
          <p>Esta playlist ainda não possui filmes adicionados.</p>
        </div>
      ) : (
        <div className="playlist-movies-grid">
          {playlist.movies.map((movieName) => (
            <article className="playlist-movie-card" key={movieName}>
              <div className="playlist-movie-poster"></div>

              <div className="playlist-movie-info">
                <h3>{movieName}</h3>
                <p>Filme salvo em {playlist.name}</p>

                <button
                  className="playlist-danger-button"
                  type="button"
                  onClick={() => onRemoveMovie(playlist, movieName)}
                >
                  Remover da playlist
                </button>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}

function EmptyPlaylistState({
  onCreatePlaylist,
}: {
  onCreatePlaylist: () => void;
}) {
  return (
    <section className="playlist-empty-state">
      <div className="playlist-empty-card">
        <span className="playlist-empty-back-icon">▤</span>
        <span className="playlist-empty-front-icon">≡+</span>
        <span className="playlist-empty-dot" />
      </div>

      <h2>Nenhuma playlist encontrada</h2>

      <p>
        Comece a organizar seus clássicos favoritos criando sua primeira
        playlist.
      </p>

      <button
        className="playlist-primary-button big"
        type="button"
        onClick={onCreatePlaylist}
      >
        <span>+</span>
        Criar Nova Playlist
      </button>

      <div className="playlist-placeholder-grid">
        <div />
        <div />
        <div />
      </div>
    </section>
  );
}

function PlaylistListSection({
  playlists,
  onOpenPlaylist,
  onEditPlaylist,
  onDeletePlaylist,
}: PlaylistListSectionProps) {
  return (
    <section className="playlist-list-section">
      <div className="playlist-list-header">
        <div>
          <p className="playlist-eyebrow">Organização</p>
          <h2>Suas playlists</h2>
        </div>

        <span>{playlists.length} playlist(s)</span>
      </div>

      <div className="playlist-grid">
        {playlists.map((playlist) => (
          <article className="playlist-card" key={playlist.id}>
            <div className="playlist-card-cover">≡</div>

            <div className="playlist-card-body">
              <h3>{playlist.name}</h3>
              <p>{getPlaylistMovieCountText(playlist)}</p>

              <div className="playlist-card-actions">
                <button
                  className="playlist-primary-button"
                  type="button"
                  onClick={() => onOpenPlaylist(playlist.id)}
                >
                  Abrir
                </button>

                <button
                  className="playlist-secondary-button"
                  type="button"
                  onClick={() => onEditPlaylist(playlist)}
                >
                  Editar
                </button>

                <button
                  className="playlist-danger-button"
                  type="button"
                  onClick={() => onDeletePlaylist(playlist)}
                >
                  Remover
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function PlaylistModal({
  editingPlaylist,
  playlistName,
  onPlaylistNameChange,
  onSubmit,
  onClose,
}: PlaylistModalProps) {
  return (
    <div className="playlist-modal-backdrop">
      <section className="playlist-modal">
        <div className="playlist-modal-header">
          <div>
            <p className="playlist-eyebrow">
              {editingPlaylist ? "Editar playlist" : "Nova playlist"}
            </p>

            <h2>
              {editingPlaylist
                ? "Alterar nome da playlist"
                : "Criar nova playlist"}
            </h2>
          </div>

          <button
            className="playlist-close-button"
            type="button"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <form className="playlist-form" onSubmit={onSubmit}>
          <label htmlFor="playlist-name">Nome da playlist</label>

          <input
            id="playlist-name"
            type="text"
            placeholder="Ex: Filmes clássicos"
            value={playlistName}
            onChange={(event) => onPlaylistNameChange(event.target.value)}
            autoFocus
          />

          <div className="playlist-form-actions">
            <button
              type="button"
              className="playlist-secondary-button"
              onClick={onClose}
            >
              Cancelar
            </button>

            <button type="submit" className="playlist-primary-button">
              {editingPlaylist ? "Salvar alterações" : "Criar Playlist"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

export function MinhasPlaylistsPage({
  userId,
  onGoToHome,
}: MinhasPlaylistsPageProps) {
  const [playlists, setPlaylists] = useState<Playlist[]>([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState<PageMessage | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [playlistName, setPlaylistName] = useState("");
  const [editingPlaylist, setEditingPlaylist] = useState<Playlist | null>(null);
  const [selectedPlaylistId, setSelectedPlaylistId] = useState<string | null>(
    null,
  );

  const selectedPlaylist =
    playlists.find((playlist) => playlist.id === selectedPlaylistId) ?? null;

  const hasPlaylists = playlists.length > 0;

  useEffect(() => {
    async function loadPlaylists() {
      try {
        setLoading(true);

        const data = await getPlaylistsByUserId(userId);
        setPlaylists(data.playlists);

        setMessage(
          data.playlists.length === 0
            ? {
                type: "info",
                text: "Ainda não existem playlists criadas",
              }
            : null,
        );
      } catch (error) {
        setMessage({
          type: "error",
          text: getErrorMessage(error, "Erro inesperado ao buscar playlists"),
        });
      } finally {
        setLoading(false);
      }
    }

    void loadPlaylists();
  }, [userId]);

  function openCreateModal() {
    setEditingPlaylist(null);
    setPlaylistName("");
    setIsModalOpen(true);
    setMessage(null);
  }

  function openEditModal(playlist: Playlist) {
    setEditingPlaylist(playlist);
    setPlaylistName(playlist.name);
    setIsModalOpen(true);
    setMessage(null);
  }

  function closeModal() {
    setIsModalOpen(false);
    setEditingPlaylist(null);
    setPlaylistName("");
  }

  function showSuccessMessage(text: string) {
    setMessage({
      type: "success",
      text,
    });
  }

  function showErrorMessage(error: unknown, fallbackMessage: string) {
    setMessage({
      type: "error",
      text: getErrorMessage(error, fallbackMessage),
    });
  }

  function updatePlaylistInState(updatedPlaylist: Playlist) {
    setPlaylists((currentPlaylists) =>
      currentPlaylists.map((playlist) =>
        playlist.id === updatedPlaylist.id ? updatedPlaylist : playlist,
      ),
    );
  }

  async function handleCreatePlaylist(name: string) {
    const data = await createPlaylist({
      name,
      userId,
    });

    setPlaylists((currentPlaylists) => [data.playlist, ...currentPlaylists]);
    showSuccessMessage(data.message);
  }

  async function handleUpdatePlaylist(playlist: Playlist, name: string) {
    const data = await updatePlaylist(playlist.id, {
      name,
    });

    updatePlaylistInState(data.playlist);
    showSuccessMessage(data.message);
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedName = playlistName.trim();

    if (!trimmedName) {
      setMessage({
        type: "error",
        text: "O nome da playlist é obrigatório",
      });
      return;
    }

    try {
      if (editingPlaylist) {
        await handleUpdatePlaylist(editingPlaylist, trimmedName);
      } else {
        await handleCreatePlaylist(trimmedName);
      }

      closeModal();
    } catch (error) {
      showErrorMessage(error, "Erro inesperado ao salvar playlist");
    }
  }

  async function handleDelete(playlist: Playlist) {
    const confirmed = window.confirm(
      `Deseja remover a playlist "${playlist.name}"?`,
    );

    if (!confirmed) {
      return;
    }

    try {
      const data = await deletePlaylist(playlist.id);

      setPlaylists((currentPlaylists) =>
        currentPlaylists.filter((item) => item.id !== playlist.id),
      );

      if (selectedPlaylistId === playlist.id) {
        setSelectedPlaylistId(null);
      }

      showSuccessMessage(data.message);
    } catch (error) {
      showErrorMessage(error, "Erro inesperado ao remover playlist");
    }
  }

  async function handleRemoveMovie(playlist: Playlist, movieName: string) {
    try {
      const data = await removeMovieFromPlaylist({
        userId,
        playlistName: playlist.name,
        movieName,
      });

      updatePlaylistInState(data.playlist);
      showSuccessMessage(data.message);
    } catch (error) {
      showErrorMessage(error, "Erro inesperado ao remover filme da playlist");
    }
  }

  function goToPlaylistsList() {
    setSelectedPlaylistId(null);
  }

  return (
    <div className="playlist-shell">
      <Sidebar onGoToHome={onGoToHome} onGoToPlaylists={goToPlaylistsList} />

      <div className="playlist-main">
        <Topbar
          selectedPlaylist={selectedPlaylist}
          hasPlaylists={hasPlaylists}
          onGoToHome={onGoToHome}
          onGoToPlaylists={goToPlaylistsList}
          onCreatePlaylist={openCreateModal}
        />

        <main className="playlist-content">
          <PlaylistMessage message={message} />

          {loading && (
            <p className="playlist-loading">Carregando playlists...</p>
          )}

          {!loading && selectedPlaylist && (
            <PlaylistDetailSection
              playlist={selectedPlaylist}
              onRemoveMovie={handleRemoveMovie}
            />
          )}

          {!loading && !selectedPlaylist && !hasPlaylists && (
            <EmptyPlaylistState onCreatePlaylist={openCreateModal} />
          )}

          {!loading && !selectedPlaylist && hasPlaylists && (
            <PlaylistListSection
              playlists={playlists}
              onOpenPlaylist={setSelectedPlaylistId}
              onEditPlaylist={openEditModal}
              onDeletePlaylist={handleDelete}
            />
          )}
        </main>
      </div>

      {isModalOpen && (
        <PlaylistModal
          editingPlaylist={editingPlaylist}
          playlistName={playlistName}
          onPlaylistNameChange={setPlaylistName}
          onSubmit={handleSubmit}
          onClose={closeModal}
        />
      )}
    </div>
  );
}