//
import styles from "./Home.module.css";

//hooks

import { useNavigate, Link } from "react-router-dom";

import { useState } from "react";
import { useFethDocuments } from "../../hooks/useFecthDocuments";

//components

import PostDetail from "../../components/PostDetail";

const Home = () => {
  const [query, setQuerty] = useState("");
  // importando hook
  const { documents: posts, loading } = useFethDocuments("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    if (query) {
      return navigate(`/search?q=${query}`);
    }
  };

  return (
    <div className={styles.home}>
      <h1>Veja os nossos posts mais recentes</h1>
      <form onSubmit={handleSubmit} className={styles.search_form}>
        <input
          type="text"
          placeholder="ou busque por tags..."
          onChange={(e) => setQuerty(e.target.value)}
        />
        <button className="btn btn-dark">Pesquisar </button>
      </form>
      <div>
        {loading && <p>Carregando...</p>}
        {posts &&
          posts.map((post) => (
            <>
              <PostDetail key={post.id} post={post} />
            </>
          ))}
        {posts && posts.length === 0 && (
          <div className={styles.noposts}>
            <p>Não foram encontrados posts</p>
            <Link to="/posts/create" className="btn btn-outline">
              Criar primeiro post
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;