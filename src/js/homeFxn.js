import axios from "axios";
import { redirect } from "react-router-dom";

async function addToCart(item, username, showNotification) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/home/addtocart`,
      {
        item,
        username,
      },
    );

    showNotification(res.data.message);
  } catch (err) {
    console.error(err);

    showNotification("Server error, try again later");
  }
}

// async function buyRequest(item, username, showNotification) {
//   try {
//     const res = await axios.post(
//       "http://localhost:3000/home/buyrequest",
//       {
//         item,
//         username,
//       }
//     );

//     showNotification(res.data.message);
//     console.log("buy request sent");

//   } catch (err) {
//     console.error(err);
//     showNotification("Server error, try again later");
//   }
// }
async function buyRequest(item, username, showNotification) {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/home/buyrequest`,
      {
        item,
        username,
      },
    );
    showNotification(res.data.message);
    console.log("buy request sent");
  } catch (err) {
    console.error(err);
    showNotification("Server error, try again later");
  }
}

async function changePass(e, showNotif, username) {
  const form = e.target;
  const oldPass = form.oldPassword.value.trim();
  const newPass = form.newPassword.value.trim();
  const confirmPass = form.confirmPassword.value.trim();

  if (!oldPass) return showNotif("Old password cannot be empty");
  if (!newPass) return showNotif("New password cannot be empty");
  if (!confirmPass) return showNotif("Confirm password cannot be empty");

  if (newPass !== confirmPass) {
    return showNotif("Passwords do not match");
  }

  if (oldPass === newPass) {
    return showNotif("New password must be different");
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/home/changepassword`,
      { username, oldPass, newPass },
      { withCredentials: true },
    );

    if (res.data.success) {
      e.target.reset();
      showNotif("Password updated successfully");
    } else {
      showNotif(res.data.message || "Failed to update password");
    }
  } catch (err) {
    showNotif("Server error while updating password");
    console.log(err);
  }
}

async function changeEmail(e, showNotif, username) {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const newEmail = e.target.newEmail.value.trim();

  if (!newEmail) return showNotif("Email cannot be empty");

  if (!emailRegex.test(newEmail)) {
    return showNotif("Invalid email format");
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/home/changeemail`,
      { username, newEmail },
      { withCredentials: true },
    );

    if (res.data.success) {
      showNotif("Email updated successfully");
      e.target.reset();
    } else {
      showNotif(res.data.message || "Failed to update email");
    }
  } catch (err) {
    showNotif("Server error while updating email");
    console.log(err);
  }
}

async function changePhone(e, showNotif, username) {
  const newPhone = e.target.newPhone.value.trim();

  if (!newPhone) return showNotif("Phone cannot be empty");

  if (!/^\d+$/.test(newPhone)) {
    return showNotif("Phone must contain only digits");
  }

  if (newPhone.length !== 10) {
    return showNotif("Phone must be 10 digits");
  }

  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/home/changephone`,
      { username, newPhone },
      { withCredentials: true },
    );

    if (res.data.success) {
      showNotif("Phone updated successfully");
      e.target.reset();
    } else {
      showNotif(res.data.message || "Failed to update phone");
    }
  } catch (err) {
    showNotif("Server error while updating phone");
    console.log(err);
  }
}
async function logOut() {
  try {
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/signin/logout`,
      {},
      { withCredentials: true },
    );
    if (res.data.success) {
      return redirect("/");
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}

export { buyRequest, addToCart, changeEmail, changePass, changePhone, logOut };
