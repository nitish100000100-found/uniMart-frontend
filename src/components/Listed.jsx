import { useState } from "react";
import styles from "./listed.module.css";
import { deleteListed } from "../js/extraFxn.js";
import Removing from "./Remove.jsx";

function Listed({ lis, forChange }) {
  const [selectedItem, setSelectedItem] = useState(null);
  const [removing, setRemoving] = useState(null); 

  if (!lis || lis.length === 0) {
    return (
      <div className={styles.empty}>
        <h2>Nothing listed</h2>
        <p>You haven’t listed any products yet.</p>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      {lis.map((item) => (
        <div key={item._id} className={styles.card}>
          
          <img
            src={item.imageUrl}
            alt={item.itemName}
            className={styles.image}
          />

          <div className={styles.content}>
            <h3>{item.itemName}</h3>
            <p>{item.description}</p>

            <p className={styles.price}>₹{item.price}</p>
            <p className={styles.section}>Section: {item.section}</p>

            <p>
              Used for: {item.ageInYears} year
              {item.ageInYears !== 1 ? "s" : ""}
            </p>
          </div>

          <button
            className={styles.crossBtn}
            onClick={() => setSelectedItem(item)}
          >
            ✖
          </button>

          {/* ✅ ONLY this card overlay */}
          {removing?._id === item._id && <Removing />}
        </div>
      ))}

      {/* POPUP */}
      {selectedItem && (
        <div className={styles.overlay}>
          <div className={styles.popup}>
            <p>
              Are you sure you want to unlist{" "}
              <b>{selectedItem.itemName}</b>?
            </p>

            <div className={styles.actions}>
              <button onClick={() => setSelectedItem(null)}>
                No
              </button>

              <button
                onClick={() => {
                  deleteListed(
                    selectedItem,
                    forChange,
                    setRemoving 
                  );
                  setSelectedItem(null);
                }}
              >
                Yes
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Listed;