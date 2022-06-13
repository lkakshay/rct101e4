import styles from "./Button.module.css";

function ButtonComponent({ title, handlePage, id }) {
  return (
    <button id={id}  onClick={()=>handlePage(title)} data-testid="button-component" className={styles.button}>
      {title}
    </button>
  );
}

export default ButtonComponent;
