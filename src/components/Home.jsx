import { useState, useEffect } from "react";
import styles from "./home.module.css";
import LoaderSell from "./LoaderSell.jsx";
import { useLoaderData, Link } from "react-router-dom";
import axios from "axios";
import { addToCart, buyRequest } from "../js/homeFxn.js";

function Home() {
  const [data, setData] = useState(null);
  const [notification, setNotification] = useState(null);
  const username = useLoaderData();
  const [selectedCategory, setSelectedCategory] = useState("No Category");

  const categories = [
    "I PHONE",
    "FURNITURE",
    "Books",
    "Anime",
    "CLOTH",
    "NO CATEGORY",
  ];

  useEffect(() => {
    const controller = new AbortController();

    const fetchData = async () => {
      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/home/first`,
          {},
          {
            signal: controller.signal,
            withCredentials: true,
          },
        );

        const obj = res.data.data;

        setData({
          user: obj,
          itemss: [],
          searched: "",
        });
      } catch (err) {
        if (err.name === "CanceledError" || err.code === "ERR_CANCELED") {
          console.log("Request canceled");
        } else {
          console.log(err);
        }
      }
    };

    fetchData();

    return () => {
      controller.abort();
    };
  }, []);

  function showNotification(message) {
    setNotification(message);
    setTimeout(() => {
      setNotification(null);
    }, 2000);
  }

  const handleSearch = async (e) => {
    e.preventDefault();
    const searched = e.target.search.value.trim();
    const normalizedSearch = searched.toUpperCase();

    if (searched === "") return;
    if (categories.includes(normalizedSearch)) {
      setSelectedCategory(normalizedSearch);
    } else {
      setSelectedCategory(null);
    }

    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/find`,
        {
          search: searched,
        },
      );

      const obj = res.data.data;

      setData((prev) => ({
        ...prev,
        itemss: obj,
        searched: searched,
      }));

      e.target.search.value = "";
    } catch (err) {
      console.error("Search error:", err);
    }
  };

  async function catSerach(cat) {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/findCat`,
        {
          category: cat,
        },
      );

      const obj = res.data.data;

      setData((prev) => ({
        ...prev,
        itemss: obj,
        searched: cat,
      }));
    } catch (err) {
      console.error(err);
    }
  }

  if (data === null) {
    return <LoaderSell username={username} />;
  }

  return (
    <div className={styles.container}>
      {notification && (
        <div className={styles.notification}>
          <span className={styles.tick}>✔</span>
          {notification}
        </div>
      )}

      {/* 🔹 Top Bar */}
      <div className={styles.topBar}>
        {/* LEFT */}
        <Link to={`/buyerdash/${username}`} className={styles.dashboardWrapper}>
          <div className={styles.profileCircle}>{username[0]}</div>
          <span className={styles.dashboardLabel}>Profile</span>
        </Link>

        {/* RIGHT */}
        <Link to="/sell" className={styles.sellBtn}>
          Switch to a Seller
        </Link>
      </div>

      {/* 🔹 Welcome */}
      <div className={styles.welcome}>
        <h2>Hi {username}, welcome to UniMart</h2>
      </div>

      {/* 🔹 Search */}
      <form className={styles.searchBox} onSubmit={handleSearch}>
        <input
          type="text"
          name="search"
          placeholder="Search product, seller or category..."
        />
        <button type="submit">Search</button>
      </form>

      {/* 🔹 Categories */}
      <div className={styles.categories}>
        {categories.map((cat, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.categoryBtn} ${
              selectedCategory === cat ? styles.active : ""
            }`}
            onClick={() => {
              catSerach(cat);
              setSelectedCategory(cat);
            }}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 🔥 SEARCH RESULTS */}
      <div className={styles.searchResults}>
        {data.itemss.length === 0 && data.searched !== "" && (
          <h3>No results found for "{data.searched}"</h3>
        )}

        {data.itemss.length > 0 && (
          <div className={styles.searchResultsGrid}>
            {data.itemss.map((item, i) => (
              <Link
                key={i}
                to={`/dashboard/${item._id}`}
                className={styles.linkWrapper}
              >
                <div className={styles.itemCard}>
                  <img
                    src={item.imageUrl}
                    alt={item.itemName}
                    className={styles.itemImg}
                  />

                  <h4>{item.itemName}</h4>
                  <p>₹ {item.price}</p>
                  <p>Owner: {item.owner}</p>
                  <p className={styles.age}>{item.ageInYears} yrs old</p>

                  <div className={styles.actions}>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        addToCart(item, username, showNotification);
                      }}
                    >
                      Add to Cart
                    </button>

                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        buyRequest(item, username, showNotification);
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

      {/* 🔹 SELLERS */}
      <div className={styles.previewSection}>
        {data.user.map((seller, idx) => (
          <div key={idx}>
            {/* Seller Card */}
            <div className={styles.linkWrapper}>
              <div className={styles.sellerBlock}>
                <div className={styles.card}>
                  <div className={styles.avatar}>{seller.username[0]}</div>
                  <div>
                    <h3>{seller.username}</h3>
                    <p>{seller.listed.length} items listed</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Items Slider */}
            <div className={styles.itemsSlider}>
              {seller.listed.map((item, i) => (
                <Link
                  key={i}
                  to={`/dashboard/${item._id}`}
                  className={styles.linkWrapper}
                >
                  <div className={styles.itemCard}>
                    <img
                      src={item.imageUrl}
                      alt={item.itemName}
                      className={styles.itemImg}
                    />

                    <h4>{item.itemName}</h4>
                    <p>₹ {item.price}</p>
                    <p className={styles.age}>{item.ageInYears} yrs old</p>

                    <div className={styles.actions}>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          addToCart(item, username, showNotification);
                        }}
                      >
                        Add to Cart
                      </button>

                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          buyRequest(item, username, showNotification);
                        }}
                      >
                        Send Buy Request
                      </button>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;
