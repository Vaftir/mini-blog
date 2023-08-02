import styles from "./CreatePost.module.css";

import { useState, useEffect } from "react";
import { Navigate, useNavigate } from "react-router-dom";
import { useAuthValue } from "../../context/AuthContext"; //para autrelar user no post

//hook para inserir
import { useIsertDoc } from "../../hooks/useInsertDoc";

const CreatePost = () => {
  const [title, setTitle] = useState("");
  const [image, setImage] = useState();
  const [body, setBody] = useState("");
  const [tags, setTags] = useState([]);
  const [formError, setFormError] = useState();

  const { user } = useAuthValue();

  const { insertDocument, response } = useIsertDoc("posts");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("");

    //vlaidade image url
    try {
      new URL(image);
    } catch (error) {
      setFormError("A imagem precisa ser uma url");
    }

    //criar o array de tags

    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos");
    }

    //checar todos so valores
    if (formError) return;
    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName,
    });

    //redirect to home page
    navigate("/mini-blog");
  };

  return (
    <div className={styles.cratePost}>
      <h2>Criar post</h2>
      <p>Escreva o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>
        <label>
          <span>Título:</span>
          <input
            type="text"
            name="title"
            required
            placeholder="Pense em um bom título..."
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </label>
        <label>
          <span>URL da imagem:</span>
          <input
            type="text"
            name="image"
            required
            placeholder="Insira uma imagem que representa seu post"
            onChange={(e) => setImage(e.target.value)}
            value={image}
          />
        </label>
        {image && (
          <div className={styles.imagecontainer}>
            <span className={styles.previewTitle}>Preview da imagem atual</span>
            <img className={styles.imagePreview} src={image} alt={title} />
          </div>
        )}
        <label>
          <span>Conteúdo:</span>
          <textarea
            type="text"
            name="body"
            required
            placeholder="Escreva sobre seu post"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          />
        </label>
        <label>
          <span>Tags:</span>
          <input
            type="text"
            name="tags"
            required
            placeholder="Insira as tags separadas por vírgula"
            onChange={(e) => setTags(e.target.value)}
            value={tags}
          />
        </label>
        {!response.loading && <button className="btn">Cadastrar</button>}
        {response.loading && (
          <button className="btn" disabled>
            Aguarde...
          </button>
        )}
        {response.error && <p className="error">{response.error}</p>}
        {formError && <p className="error">{formError}</p>}
      </form>
    </div>
  );
};

export default CreatePost;
