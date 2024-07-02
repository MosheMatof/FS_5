/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const baseURL = 'http://localhost:3000';

export const AlbumDetail = ({ album, setView }) => {
  const [photos, setPhotos] = useState([]);
  const [page, setPage] = useState(1);
  const [newPhotoTitle, setNewPhotoTitle] = useState('');
  const [newPhotoUrl, setNewPhotoUrl] = useState('');

  useEffect(() => {
    fetchPhotos();
  }, [album, page]);

  const fetchPhotos = async () => {
    try {
      const response = await axios.get(`${baseURL}/photos?albumId=${album.id}&_page=${page}&_limit=10`);
      setPhotos(prevPhotos => [...prevPhotos, ...response.data]);
    } catch (error) {
      console.error('Error fetching photos:', error);
    }
  };

  const addPhoto = async () => {
    try {
      await axios.post(`${baseURL}/photos`, {
        albumId: album.id,
        title: newPhotoTitle,
        url: newPhotoUrl,
        thumbnailUrl: newPhotoUrl
      });
      setNewPhotoTitle('');
      setNewPhotoUrl('');
      setPhotos([]);
      setPage(1);
      fetchPhotos();
    } catch (error) {
      console.error('Error adding photo:', error);
    }
  };

  const deletePhoto = async (photoId) => {
    try {
      await axios.delete(`${baseURL}/photos/${photoId}`);
      setPhotos(photos.filter(photo => photo.id !== photoId));
    } catch (error) {
      console.error('Error deleting photo:', error);
    }
  };

  const updatePhoto = async (photoId, newTitle) => {
    try {
      await axios.put(`${baseURL}/photos/${photoId}`, {
        title: newTitle,
        albumId: album.id
      });
      setPhotos(photos.map(photo => 
        photo.id === photoId ? { ...photo, title: newTitle } : photo
      ));
    } catch (error) {
      console.error('Error updating photo:', error);
    }
  };

  return (
    <div>
      <button onClick={() => setView('overview')}>Back to Albums</button>
      <h3>{album.title}</h3>
      <div>
        {photos.map((photo) => (
          <div key={photo.id}>
            <img src={photo.thumbnailUrl} alt={photo.title} />
            <p>{photo.title}</p>
            <button onClick={() => deletePhoto(photo.id)}>Delete</button>
            <button onClick={() => {
              const newTitle = prompt('Enter new title', photo.title);
              if (newTitle) updatePhoto(photo.id, newTitle);
            }}>Edit</button>
          </div>
        ))}
      </div>
      <button onClick={() => setPage(prevPage => prevPage + 1)}>Load More</button>
      <div>
        <input
          type="text"
          value={newPhotoTitle}
          onChange={(e) => setNewPhotoTitle(e.target.value)}
          placeholder="New photo title"
        />
        <input
          type="text"
          value={newPhotoUrl}
          onChange={(e) => setNewPhotoUrl(e.target.value)}
          placeholder="New photo URL"
        />
        <button onClick={addPhoto}>Add Photo</button>
      </div>
    </div>
  );
};