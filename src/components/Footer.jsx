import styles from "./Footer.module.css";

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <h3>Escreva sobre o que voce tem interesse!</h3>
      <p>
        Mini Blog by <span>Yago Faria </span>&copy; 2023
      </p>
    </footer>
  );
};

export default Footer;
