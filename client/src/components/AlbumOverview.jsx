/* eslint-disable react/prop-types */
import { useState } from 'react';
import { useUser } from '../../contexts/UserContext';
import axios from 'axios';

const baseURL = 'https://jsonplaceholder.typicode.com';

export const AlbumOverview = ({ albums, setView, setSelectedAlbum, searchTerm, setSearchTerm, fetchAlbums }) => {
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
    const { user } = useUser();

  const createAlbum = async () => {
    try {
      await axios.post(`${baseURL}/albums`, {
        title: newAlbumTitle,
        userId: user.id
      });
      fetchAlbums();
      setNewAlbumTitle('');
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  return (
    <div>
      <input
        type="text"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="Search albums by title or ID"
      />
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            <a onClick={() => {
              setSelectedAlbum(album);
              setView('detail');
            }}>
              {album.id}: {album.title}
            </a>
          </li>
        ))}
      </ul>
      <div>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          placeholder="New album title"
        />
        <button onClick={createAlbum}>Create Album</button>
      </div>
    </div>
  );
};