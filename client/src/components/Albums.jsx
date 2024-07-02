import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';

export const Albums = () => {
  const [albums, setAlbums] = useState([]);
  const [newAlbumTitle, setNewAlbumTitle] = useState('');
  const [editingAlbum, setEditingAlbum] = useState(null);
  const { user } = useUser();

  const baseURL = 'http://localhost:3000';

  useEffect(() => {
    fetchAlbums();
  }, [user]);

  const fetchAlbums = async () => {
    try {
      const response = await axios.get(`${baseURL}/albums?userId=${user.id}`);
      setAlbums(response.data);
    } catch (error) {
      console.error('Error fetching albums:', error);
    }
  };

  const createAlbum = async () => {
    try {
      const response = await axios.post(`${baseURL}/albums`, {
        title: newAlbumTitle,
        userId: user.id
      });
      setAlbums([...albums, response.data]);
      setNewAlbumTitle('');
    } catch (error) {
      console.error('Error creating album:', error);
    }
  };

  const updateAlbum = async (id, newTitle) => {
    try {
      const response = await axios.put(`${baseURL}/albums/${id}`, {
        title: newTitle,
        userId: user.id
      });
      setAlbums(albums.map(album => album.id === id ? response.data : album));
      setEditingAlbum(null);
    } catch (error) {
      console.error('Error updating album:', error);
    }
  };

  const deleteAlbum = async (id) => {
    try {
      await axios.delete(`${baseURL}/albums/${id}`);
      setAlbums(albums.filter(album => album.id !== id));
    } catch (error) {
      console.error('Error deleting album:', error);
    }
  };

  return (
    <div>
      <h2>Albums for {user.name}</h2>
      <div>
        <input
          type="text"
          value={newAlbumTitle}
          onChange={(e) => setNewAlbumTitle(e.target.value)}
          placeholder="New album title"
        />
        <button onClick={createAlbum}>Create Album</button>
      </div>
      <ul>
        {albums.map((album) => (
          <li key={album.id}>
            {editingAlbum === album.id ? (
              <>
                <input
                  type="text"
                  value={album.title}
                  onChange={(e) => setAlbums(albums.map(a => a.id === album.id ? {...a, title: e.target.value} : a))}
                />
                <button onClick={() => updateAlbum(album.id, album.title)}>Save</button>
                <button onClick={() => setEditingAlbum(null)}>Cancel</button>
              </>
            ) : (
              <>
                {album.title}
                <button onClick={() => setEditingAlbum(album.id)}>Edit</button>
                <button onClick={() => deleteAlbum(album.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};