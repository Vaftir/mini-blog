import styles from "./Dashboard.module.css";

import { Link } from "react-router-dom";

//rooks

import { useAuthValue } from "../../context/AuthContext";
import { useFethDocuments } from "../../hooks/useFecthDocuments";
import { useDeleteDocument } from "../../hooks/useDeleteDocument";

const Dashboard = () => {
  const { user } = useAuthValue();

  const uid = user.uid;
  const { documents: posts, loading } = useFethDocuments("posts", null, uid);

  const { deleteDocument, loading: deleting } = useDeleteDocument("posts");

  if (loading) {
    return (
      <>
        <p>Carregando...</p>
      </>
    );
  }
  //posts do user
  return (
    <div className={styles.dashboard}>
      <h1>Dashboard</h1>
      <p>Gerencie seus posts</p>
      {posts && posts.length === 0 ? (
        <div className={styles.noposts}>
          <p>Não foram encontrados posts</p>
          <Link to="/posts/create" className="btn btn-outline">
            Criar primeiro post
          </Link>
        </div>
      ) : (
        <>
          <div className={styles.post_header}>
            <span>Titulo</span>
            <span>Açôes</span>
          </div>
          {posts &&
            posts.map((post) => (
              <>
                <div key={post.id} className={styles.post_row}>
                  <p>{post.title}</p>
                  {deleting && (
                    <button className="btn btn-outline" disabled>
                      Aguarde
                    </button>
                  )}
                  {!deleting && (
                    <div>
                      <Link
                        className="btn btn-outline"
                        to={`/posts/${post.id}`}
                      >
                        Ver
                      </Link>
                      <Link
                        className="btn btn-outline"
                        to={`/posts/edit/${post.id}`}
                      >
                        Editar
                      </Link>
                      <button
                        onClick={() => deleteDocument(post.id)}
                        className="btn btn-outline btn-danger"
                      >
                        Excluir
                      </button>
                    </div>
                  )}
                </div>
              </>
            ))}
        </>
      )}
    </div>
  );
};

export default Dashboard;
