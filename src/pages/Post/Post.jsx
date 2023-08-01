import styles from "./Post.module.css";

//hoks
import { useFethDocument } from "../../hooks/useFecthDocument";
import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  const { document: post, loading } = useFethDocument("posts", id);

  return (
    <div className={styles.post_container}>
      {loading && <p>Carregando post...</p>}
      {post && (
        <div>
          <h1>{post.title}</h1>
          <img src={post.image} alt={post.title} />
          <div className={styles.texto}>
            <span>{post.body}</span>
          </div>
          <h3>Esse post trata sobre:</h3>
          <div className={styles.tags}>
            {post.tagsArray.map((tag) => (
              <p key={tag}>
                <span>#</span>
                {tag}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Post;
