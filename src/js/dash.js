import axios from "axios";

async function removeFromCart(item, username, showNotif) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/dash/removefromcart`,
      {
        item,
        username,
      },
    );

    showNotif(res.data.message);
  } catch (err) {
    console.error("Error removing from cart:", err);
    showNotif("Failed to remove from cart");
  }
}

async function cancelBuyRequest(item, username, showNotif) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/dash/cancelbuyrequest`,
      {
        item,
        username,
      },
    );

    showNotif(res.data.message);
  } catch (err) {
    console.error("Error cancelling buy request:", err);
    showNotif("Failed to cancel Buy request");
  }
}
async function sellFxn(itemID, setData, handleClick, buyerUsername) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/dash/sellfxn`,
      {
        itemID: itemID,
        buyerUsername,
      },
    );

    setData(res.data);
    handleClick(`Sold successfully to ${buyerUsername}`);
  } catch (err) {
    console.error(err);
    handleClick("Error while selling");
  }
}

async function rejectSellFxn(itemID, setData, handleClick, buyerUsername) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/dash/rejectsellfxn`,
      {
        itemID: itemID,
        buyerUsername,
      },
    );

    setData(res.data);
    handleClick(`Sell Request rejected of ${buyerUsername}`);
  } catch (err) {
    console.error(err);
    handleClick("Error while rejecting");
  }
}
export { removeFromCart, cancelBuyRequest, sellFxn, rejectSellFxn };
