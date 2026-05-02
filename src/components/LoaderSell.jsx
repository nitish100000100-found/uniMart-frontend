import styles from "./loaderSell.module.css";

function LoaderSell({ username }) {
  return (
    <div className={styles.wrapper}>
      <div className={styles.card}>
        
        <h1 className={styles.title}>
          Hi {username}
        </h1>
        <p className={styles.subtitle}>
          Preparing your UniMart dashboard...
        </p>

        <div className={styles.spinner}></div>

      </div>
    </div>
  );
}

export default LoaderSell;