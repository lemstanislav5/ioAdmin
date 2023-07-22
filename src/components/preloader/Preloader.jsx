import imgPreloader from './preloader.gif'
import styles from "./Preloader.module.css";

export default () => {
  return (
    <div className={styles.div}>
      <img src={imgPreloader} className={styles.preloader} alt="preloader" />
      <h2 className={styles.text}>Загрузка...</h2>
    </div>
  );
}