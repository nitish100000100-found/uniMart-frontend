import { useEffect, useState } from "react";
import axios from "axios";
import { useLoaderData, Link } from "react-router-dom";
import LoaderSell from "./LoaderSell.jsx";
import styles from "./buyerdash.module.css";
import { changeEmail, changePass, changePhone, logOut } from "../js/homeFxn.js";
import { Form } from "react-router-dom";
import { buyRequest } from "../js/homeFxn.js";
import { removeFromCart, cancelBuyRequest } from "../js/dash.js";

const BuyerDash = () => {
  const username = useLoaderData();

  const [data, setData] = useState(null);
  const [notif, setNotif] = useState("");

  const showNotif = (msg) => {
    setNotif(msg);
    setTimeout(() => {
      setNotif("");
    }, 2500);
  };

  useEffect(() => {
    let controller;
    let isFetching = false;

    const getData = async () => {
      if (isFetching) return;

      isFetching = true;
      controller = new AbortController();

      try {
        const res = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/home/buyerdash`,
          { username },
          { signal: controller.signal },
        );

        setData({
          user: res.data.user,
          buyer: res.data.buyer,
        });
      } catch (err) {
        if (err.code !== "ERR_CANCELED") {
          console.log(err);
        }
      } finally {
        isFetching = false;
      }
    };

    getData();

    const intervalId = setInterval(getData, 3000);

    return () => {
      if (controller) controller.abort();
      clearInterval(intervalId);
    };
  }, []);

  const getData = async () => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/home/buyerdash`,
        {
          username,
        },
      );

      setData({
        user: res.data.user,
        buyer: res.data.buyer,
      });
    } catch (err) {
      console.log(err);
    }
  };

  if (data === null) {
    return <LoaderSell username={username} />;
  }

  const user = data.user;
  const buyer = data.buyer;

  return (
    <div className={styles.container}>
      {/* NOTIFICATION */}
      {notif !== "" && <div className={styles.notif}>{notif}</div>}

      {/* TOP */}
      <div className={styles.top}>
        {/* LEFT — Back button + Profile card stacked */}
        <div className={styles.leftCol}>
          {/* BACK BUTTON */}
          <Link to="/" className={styles.backBtn}>
            <span className={styles.backArrow}>&#8592;</span>
            Back to Home
          </Link>

          {/* USER INFO */}
          <div className={styles.userBox}>
            <div className={styles.avatar}>
              {user.username[0].toUpperCase()}
            </div>
            <div>
              <h2>{user.username}</h2>
              <p>Email: {user.email}</p>
              <p>Phone: {user.phone}</p>
            </div>
          </div>
        </div>

        {/* ACTIONS */}
        <div className={styles.actions}>
          <div className={styles.topRight}>
            <Form method="post">
              <button className={styles.logout}>Logout</button>
            </Form>
          </div>

          {/* PASSWORD */}
          <form
            className={`${styles.form} ${styles.passForm}`}
            onSubmit={(e) => {
              e.preventDefault();
              changePass(e, showNotif, username);
            }}
          >
            <h4>Change Password</h4>
            <div className={styles.passInputs}>
              <input
                type="password"
                name="oldPassword"
                placeholder="Old password"
                required
              />
              <input
                type="password"
                name="newPassword"
                placeholder="New password"
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Re-enter  new password"
                required
              />
            </div>
            <button type="submit">Update</button>
          </form>

          {/* PHONE */}
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              changePhone(e, showNotif, username);
            }}
          >
            <h4>Change Phone</h4>
            <input
              type="text"
              placeholder="New phone"
              required
              name="newPhone"
            />
            <button type="submit">Update</button>
          </form>

          {/* EMAIL */}
          <form
            className={styles.form}
            onSubmit={(e) => {
              e.preventDefault();
              changeEmail(e, showNotif, username);
            }}
          >
            <h4>Change Email</h4>
            <input
              type="email"
              placeholder="New email"
              required
              name="newEmail"
            />
            <button type="submit">Update</button>
          </form>
        </div>
      </div>

      {/* BOTTOM */}
      <div className={styles.bottom}>
        {/* CART */}
        <div className={styles.card}>
          <h3>Cart</h3>

          {buyer.wishlist.length === 0 && (
            <p className={styles.empty}>Cart is empty</p>
          )}

          {buyer.wishlist.map((item) => (
            <Link to={"/dashboard/" + item._id} key={item._id}>
              <div className={styles.item}>
                <img src={item.imageUrl} alt="" />
                <p>{item.itemName}</p>

                <span>Owner: {item.owner}</span>
                <span>Price: {item.price}</span>

                <div className={styles.btnRow}>
                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await removeFromCart(item, username, showNotif);
                      await getData();
                    }}
                  >
                    Remove from Cart
                  </button>

                  <button
                    onClick={async (e) => {
                      e.preventDefault();
                      await buyRequest(item, username, showNotif);
                      await getData();
                    }}
                  >
                    Send Buy Request
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* PREVIOUS */}
        <div className={styles.card}>
          <h3>Previous Purchase</h3>

          {buyer.previousPurchases.length === 0 && (
            <p className={styles.empty}>No purchases yet</p>
          )}

          {buyer.previousPurchases.map((item) => (
            <div className={styles.item} key={item._id}>
              <img src={item.imageUrl} alt="" />
              <p>{item.itemName}</p>
              <span>Previous Owner: {item.owner}</span>
              <span>Cost: {item.price}</span>
            </div>
          ))}
        </div>

        {/* REQUEST */}
        <div className={styles.card}>
          <h3>Request Sent</h3>

          {buyer.requestSend.length === 0 && (
            <p className={styles.empty}>No requests sent</p>
          )}

          {buyer.requestSend.map((item) => (
            <Link to={"/dashboard/" + item._id} key={item._id}>
              <div className={styles.item}>
                <img src={item.imageUrl} alt="" />
                <p>{item.itemName}</p>
                <span>Owner: {item.owner}</span>
                <span>Cost: {item.price}</span>

                <button
                  onClick={async (e) => {
                    e.preventDefault();
                    await cancelBuyRequest(item, username, showNotif);
                    await getData();
                  }}
                >
                  Cancel Buy Request
                </button>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default BuyerDash;
