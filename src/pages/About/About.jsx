//css
import { Link } from "react-router-dom";
import styles from "../About/About.module.css";

const About = () => {
  return (
    <div className={styles.about}>
      <h2>
        Sobre o Mini <span>Blog</span>
      </h2>
      <p>
        Esse projeto consiste em um blog feito com React no front-end e Firebase
        no back-end. Foi feito para testar conceitos de react Hooks ,como
        useState e useEffect, solidificar Context além de aplicar react Routes
      </p>
      <Link to="/posts/create" className="btn btn-outline">
        Criar post
      </Link>
    </div>
  );
};

export default About;
