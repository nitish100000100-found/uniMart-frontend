import { useState, useEffect } from "react";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import LoaderSell from "./LoaderSell.jsx";
import styles from "./sell.module.css";
import { handleSubmitSell } from "../js/extraFxn.js";
import Listed from "./Listed.jsx";
import Adding from "./Adding.jsx";

function Sell() {
  const username = useLoaderData();

  const [data, setData] = useState(null);
  const [error, setError] = useState([]);
  const [fileName, setFileName] = useState("");
  const [adding, setAdding] = useState("off");

  useEffect(() => {
    const callDB = async () => {
      try {
    
const res = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/sell/firstDB`,
  { username },
);   
        const d = res.data.data;
        setData({
          listed: d.listed ? d.listed : [],
          sold: d.sold ? d.sold : [],
        });
      } catch (err) {
        console.log(err);
        setError(["Failed to fetch data"]);
      }
    };
    callDB();
  }, []);

  if (data === null) {
    return <LoaderSell username={username} />;
  }

  return (
    <div className={styles.container}>
      <div className={styles.topRight}>
        <Link to={`/home/${username}`} className={styles.homeBtn}>
          Go to Home
        </Link>
        <Link to="/sellerdash" className={styles.homeBtn}>
          Go to Seller Dashboard
        </Link>
      </div>

      <h1 className={styles.header}>Hi {username}</h1>
      <h1 className={styles.header}>Welcome to UniMart Seller Section</h1>

      {/* ===== LISTED ===== */}
      <div className={styles.section}>
        <h2>Listed Items</h2>
      </div>

      <Listed lis={data.listed} forChange={setData} />

      <div className={`${styles.section} ${styles.sellSectionWrapper}`}>
        {adding === "on" && (
          <div className={styles.addingOverlay}>
            <Adding />
          </div>
        )}

        <h2>Sell Item</h2>

        {error.length > 0 && (
          <div className={styles.errorBox}>
            <ul>
              {error.map((err, i) => (
                <li key={i}>{err}</li>
              ))}
            </ul>
          </div>
        )}

        <form
          className={styles.formBox}
          encType="multipart/form-data"
          onSubmit={(e) => {
            handleSubmitSell(
              e,
              username,
              setData,
              setError,
              setFileName,
              setAdding,
            );
          }}
        >
          <input type="text" name="itemName" placeholder="Item Name" required />
          <textarea name="description" placeholder="Description" />
          <input type="number" name="price" placeholder="Price" required />
          <input
            type="number"
            name="productAgeYears"
            placeholder="How many years old?"
            min="0"
          />
          <input type="text" name="section" placeholder="Category" />
          <p className={styles.note}>Only PNG, JPG, JPEG files are allowed</p>
          <label className={styles.customFile}>
            {fileName ? "📎 " + fileName : "Choose an image"}
            <input
              type="file"
              name="photo"
              accept="image/png, image/jpeg"
              className={styles.hiddenInput}
              onChange={(e) => {
                const file = e.target.files[0];
                setFileName(file ? file.name : "");
              }}
            />
          </label>
          <button type="submit">Upload</button>
        </form>
      </div>

      {/* ===== SOLD ===== */}
      <div className={styles.section}>
        <h2>Sold Items</h2>

        <div className={styles.soldGrid}>
          {data.sold.length === 0 ? (
            <p className={styles.emptyMsg}>Nothing sold yet</p>
          ) : (
            data.sold.map((item, i) => (
              <div key={i} className={styles.soldCard}>
                {/* Image */}
                <div className={styles.soldCardImage}>
                  {item.imageUrl ? (
                    <img src={item.imageUrl} alt={item.itemName} />
                  ) : (
                    <span className={styles.noImg}>No Image</span>
                  )}
                </div>

                {/* Badge + Age */}
                <div className={styles.soldCardTop}>
                  <span className={styles.soldBadge}>✓ Sold</span>
                </div>

                {/* Name */}
                <p className={styles.soldName}>{item.itemName}</p>

                {/* Section */}
                <p className={styles.soldSection}>{item.section}</p>

                {/* Footer */}
                <div className={styles.soldCardFooter}>
                  <span className={styles.soldPrice}>₹{item.price}</span>
                  <span className={styles.soldTo}>Sold To → {item.soldTo}</span>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}

export default Sell;
