import style from "./success.module.css";

function Success() {
  return (
    <div className={style.outer}>
      <div className={style.box}>
        <h1>Success</h1>
        <p>Till now everything is working fine.</p>
      </div>
    </div>
  );
}

export default Success;