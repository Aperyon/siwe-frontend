import { useEffect, useState } from "react";
import { BACKEND_URL } from "../variables";

export default function PostList() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const url = `${BACKEND_URL}/posts`;
    const response = await fetch(url, { credentials: "include" });
    const postsData = await response.json();
    setPosts(postsData);
  }

  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.text}</li>
      ))}
    </ul>
  );
}
