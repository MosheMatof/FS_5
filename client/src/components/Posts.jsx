import { useEffect, useState } from 'react';
import axios from 'axios';
import { useUser } from '../Contexts/UserContext';

export const Posts = () => {
  const [posts, setPosts] = useState([]);
  const [newPostTitle, setNewPostTitle] = useState('');
  const [newPostBody, setNewPostBody] = useState('');
  const [editingPost, setEditingPost] = useState(null);
  const { user } = useUser();

  const baseURL = 'http://localhost:3000';

  useEffect(() => {
    fetchPosts();
  }, [user]);

  const fetchPosts = async () => {
    try {
      const response = await axios.get(`${baseURL}/posts?userId=${user.id}`);
      setPosts(response.data);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  const createPost = async () => {
    try {
      const response = await axios.post(`${baseURL}/posts`, {
        title: newPostTitle,
        body: newPostBody,
        userId: user.id
      });
      setPosts([...posts, response.data]);
      setNewPostTitle('');
      setNewPostBody('');
    } catch (error) {
      console.error('Error creating post:', error);
    }
  };

  const updatePost = async (id, newTitle, newBody) => {
    try {
      const response = await axios.put(`${baseURL}/posts/${id}`, {
        title: newTitle,
        body: newBody,
        userId: user.id
      });
      setPosts(posts.map(post => post.id === id ? response.data : post));
      setEditingPost(null);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const deletePost = async (id) => {
    try {
      await axios.delete(`${baseURL}/posts/${id}`);
      setPosts(posts.filter(post => post.id !== id));
    } catch (error) {
      console.error('Error deleting post:', error);
    }
  };

  return (
    <div>
      <h2>Posts for {user.name}</h2>
      <div>
        <input
          type="text"
          value={newPostTitle}
          onChange={(e) => setNewPostTitle(e.target.value)}
          placeholder="New post title"
        />
        <textarea
          value={newPostBody}
          onChange={(e) => setNewPostBody(e.target.value)}
          placeholder="New post body"
        />
        <button onClick={createPost}>Create Post</button>
      </div>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            {editingPost === post.id ? (
              <>
                <input
                  type="text"
                  value={post.title}
                  onChange={(e) => setPosts(posts.map(p => p.id === post.id ? {...p, title: e.target.value} : p))}
                />
                <textarea
                  value={post.body}
                  onChange={(e) => setPosts(posts.map(p => p.id === post.id ? {...p, body: e.target.value} : p))}
                />
                <button onClick={() => updatePost(post.id, post.title, post.body)}>Save</button>
                <button onClick={() => setEditingPost(null)}>Cancel</button>
              </>
            ) : (
              <>
                <h3>{post.title}</h3>
                <p>{post.body}</p>
                <button onClick={() => setEditingPost(post.id)}>Edit</button>
                <button onClick={() => deletePost(post.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};