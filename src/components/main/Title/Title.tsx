import styles from './style.module.css';

function Title() {
  return (
    <h1 className={styles['mainTitle']}>
      <span className={styles['firstLine']}>Выставки</span>
      <span className={styles['secondLine']}>Музея им. М. А. Врубеля</span>
    </h1>
  );
}

export default Title;
