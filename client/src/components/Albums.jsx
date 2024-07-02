import { useState, useEffect } from 'react';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';  
import { AlbumOverview } from './AlbumOverview';
import { AlbumDetail } from './AlbumDetail';

const baseURL =  'http://localhost:3000';

export const Albums = () => {
  const [view, setView] = useState('overview');
  const [albums, setAlbums] = useState([]);
  const [selectedAlbum, setSelectedAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const { user } = useUser();

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

  const filteredAlbums = albums.filter(album => 
    album.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    album.id.toString().includes(searchTerm)
  );

  return (
    <div>
      <h2>Albums for {user.name}</h2>
      {view === 'overview' ? (
        <AlbumOverview 
          albums={filteredAlbums} 
          setView={setView}
          setSelectedAlbum={setSelectedAlbum}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          fetchAlbums={fetchAlbums}
        />
      ) : (
        <AlbumDetail 
          album={selectedAlbum} 
          setView={setView}
        />
      )}
    </div>
  );
};