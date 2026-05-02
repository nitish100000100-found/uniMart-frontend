import { addToCart, buyRequest } from "../js/homeFxn.js";
import { useState, useEffect } from "react";
import { useLoaderData, Link, useParams } from "react-router-dom";
import axios from "axios";
import LoaderSell from "./LoaderSell.jsx";
import Error from "./Error.jsx";
import styles from "./itemDashBoard.module.css";

function ItemDashboard() {
  const [data, setData] = useState(null);
  const [notification, setNotification] = useState(null);

  const username = useLoaderData();
  const { id } = useParams();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/home/item`,
          { id },
        );
        const resData = res.data;

        if (resData.message === "Item not found") {
          setData({ message: "Item not found" });
          return;
        }

        setData({
          message: "Item found",
          itemms: resData.data,
          moredata: resData.moreData,
          user: resData.user,
        });
      } catch (err) {
        setData({ message: "Item not found" });
      }
    };
    fetchItem();
    const interval = setInterval(fetchItem, 2000);
    return () => clearInterval(interval);
  }, [id]);

  const showNotification = (msg) => {
    setNotification(msg);
    setTimeout(() => setNotification(null), 3000);
  };

  const handleAddToCart = (msg) => {
    showNotification(msg);
  };

  const handleBuyRequest = (msg) => {
    showNotification(msg);
  };

  if (!data) return <LoaderSell username={username} />;
  if (data.message !== "Item found")
    return <Error mess={data.message} id={id} />;

  const item = data.itemms;
  const more = data.moredata;
  const user = data.user;

  return (
    <div className={styles.page}>
      <Link to="/" className={styles.backLink}>
        ← Back to UniMart
      </Link>

      {/* TOAST */}
      {notification && <div className={styles.toast}>{notification}</div>}

      <div className={styles.layout}>
        {/* MAIN */}
        <div className={styles.mainCard}>
          <div className={styles.ownerBadge}>
            <div className={styles.ownerAvatar}>
              {item.owner?.[0]?.toUpperCase()}
            </div>

            <div>
              <div className={styles.ownerName}>{item.owner}</div>
              <div className={styles.ownerLabel}>Item owner</div>

              {/* ✅ NEW (email + phone) */}
              <div className={styles.ownerEmail}>Seller Mail: {user.email}</div>
              <div className={styles.ownerPhone}>
                Seller Phone: {user.phone}
              </div>
            </div>
          </div>

          <div className={styles.imgWrap}>
            {item.imageUrl ? (
              <img src={item.imageUrl} className={styles.img} />
            ) : (
              <div className={styles.imgPlaceholder}>No Image</div>
            )}
          </div>

          <h1 className={styles.itemName}>{item.itemName}</h1>
          <p className={styles.itemPrice}>₹ {item.price}</p>

          <div className={styles.metaRow}>
            <span className={styles.metaPill}>
              {item.section || "NO CATEGORY"}
            </span>
            <span className={styles.metaPill}>{item.ageInYears} yrs old</span>
          </div>

          {item.description && (
            <p className={styles.itemDesc}>{item.description}</p>
          )}

          <div className={styles.actions}>
            <button
              className={`${styles.btn} ${styles.btnCart}`}
              onClick={() => {
                addToCart(item, username, handleAddToCart);
              }}
            >
              Add to Cart
            </button>

            <button
              className={`${styles.btn} ${styles.btnBuy}`}
              onClick={() => buyRequest(item, username, handleBuyRequest)}
            >
              Send Buy Request
            </button>
          </div>
        </div>

        {/* SIDEBAR */}
        <div className={styles.sidebar}>
          <h2 className={styles.sidebarTitle}>More from {item.owner}</h2>

          {!more || more.length === 0 ? (
            <div className={styles.noMore}>No more items</div>
          ) : (
            <div className={styles.moreList}>
              {more.map((m) => (
                <Link
                  to={`/dashboard/${m._id}`}
                  state={{ username }}
                  key={m._id}
                  className={styles.moreCard}
                >
                  <div className={styles.moreImgWrap}>
                    {m.imageUrl ? (
                      <img src={m.imageUrl} className={styles.moreImg} />
                    ) : (
                      <div className={styles.moreImgPlaceholder}>No Img</div>
                    )}
                  </div>

                  <div className={styles.moreInfo}>
                    <p className={styles.moreName}>{m.itemName}</p>
                    <p className={styles.morePrice}>₹ {m.price}</p>
                    <p className={styles.moreMeta}>
                      {m.section} · {m.ageInYears} yrs
                    </p>

                    <div className={styles.moreActions}>
                      <button
                        className={`${styles.btn} ${styles.btnCart}`}
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(m, username, handleAddToCart);
                        }}
                      >
                        Add To Cart
                      </button>

                      <button
                        className={`${styles.btn} ${styles.btnBuy}`}
                        onClick={(e) => {
                          e.preventDefault();
                          buyRequest(m, username, handleBuyRequest);
                        }}
                      >
                        Send Buy Request
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemDashboard;
