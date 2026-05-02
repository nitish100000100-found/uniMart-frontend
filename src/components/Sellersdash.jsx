import { useEffect, useState } from "react";
import { useLoaderData } from "react-router-dom";
import styles from "./sellerdash.module.css";
import axios from "axios";
import LoaderSell from "./LoaderSell.jsx";
import { sellFxn, rejectSellFxn } from "../js/dash.js";

function SellerDash() {
  const username = useLoaderData();

  const [data, setData] = useState(null);
  const [notif, setNotif] = useState("");

  useEffect(() => {
    const sendRequest = async () => {
      try {
       const res = await axios.post(
  `${import.meta.env.VITE_API_BASE_URL}/dash/sellerdash`,
  { username },
);
        setData(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    sendRequest();
    const id = setInterval(sendRequest, 3000);
    return () => clearInterval(id);
  }, []);

  if (data === null) return <LoaderSell username={username} />;

  function handleClick(message) {
    setNotif(message);
    setTimeout(() => setNotif(""), 2500);
  }

  return (
    <div className={styles.container}>
      {/* 🔔 Toast Notification — top-right */}
      {notif && <div className={styles.notification}>{notif}</div>}

      {/* ══ TOP SECTION ══════════════════════════════ */}
      <div className={styles.top}>
        {/* Profile Card */}
        <div className={styles.profileCard}>
          <div className={styles.avatar}>
            {data.user.username[0].toUpperCase()}
          </div>

          <div className={styles.info}>
            <h2>{data.user.username}</h2>
            <p>{data.user.email}</p>
            <p>{data.user.phone}</p>
          </div>
        </div>

        {/* Actions — top-right */}
        <div className={styles.actions}>
          <a href="/" className={styles.homeLink}>
            ← Go Home
          </a>
        </div>
      </div>

      {/* Sub-title */}
      <p className={styles.dashTitle}>
        Welcome back, <span>{username}</span> — your seller dashboard
      </p>

      {/* ══ BOTTOM SECTION ═══════════════════════════ */}
      <div className={styles.sectionLabel}>Purchase Requests</div>

      <div className={styles.bottom}>
        {data.seller.purchaseRequests.length === 0 && <p>No requests yet</p>}

        {data.seller.purchaseRequests.map((req, i) => (
          <div key={i} className={styles.card}>
            <img
              src={req.item.imageUrl}
              className={styles.img}
              alt={req.item.itemName}
            />

            <h3>{req.item.itemName}</h3>
            <p>₹ {req.item.price}</p>
            <p>{req.item.ageInYears} yrs old</p>
            <p>{req.item.section}</p>
            <p>Requested by: {req.requestedBy}</p>

            <div className={styles.btnBox}>
              <button
                onClick={() =>
                  rejectSellFxn(
                    req.itemId,
                    setData,
                    handleClick,
                    req.requestedBy,
                  )
                }
              >
                Cancel
              </button>
              <button
                onClick={() =>
                  sellFxn(req.itemId, setData, handleClick, req.requestedBy)
                }
              >
                Sell to {req.requestedBy}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default SellerDash;
