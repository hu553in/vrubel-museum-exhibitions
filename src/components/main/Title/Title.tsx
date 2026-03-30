import styles from './style.module.css';

function Title() {
  return (
    <div className={styles['mainTitle']}>
      <p className={styles['firstLine']}>Выставки</p>
      <p className={styles['secondLine']}>Музея им. М. А. Врубеля</p>
    </div>
  );
}

export default Title;
