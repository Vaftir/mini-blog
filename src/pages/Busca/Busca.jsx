import styles from "./Busca.module.css";

//hooks personalizados
import { useFethDocuments } from "../../hooks/useFecthDocuments";
import { useQuery } from "../../hooks/useQuery";

//hooks prontos
import { Link } from "react-router-dom";

//components
import PostDetail from "../../components/PostDetail";

const Busca = () => {
  const query = useQuery();

  const search = query.get("q"); // esse atributo é "q" porque eu coloquei "/search?q="

  const { documents: posts } = useFethDocuments("posts", search);

  return (
    <div className={styles.searchContainer}>
      <h2>Busca</h2>
      <p>{search}</p>
      <div>
        {posts && posts.length === 0 && (
          <div className={styles.empty}>
            <p>Não foram encontrados posts a partir da sua busca... </p>
            <Link to="/" className="btn btn-outline">
              Voltar
            </Link>
          </div>
        )}
        {posts &&
          posts.map((posts) => <PostDetail key={posts.id} post={posts} />)}
      </div>
    </div>
  );
};

export default Busca;
