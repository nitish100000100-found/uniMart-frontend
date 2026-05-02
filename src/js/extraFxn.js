import axios from "axios";
import { redirect } from "react-router-dom";

async function checkLogin() {
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/signin/isSignin`,
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      const username = res.data.data.username;

      return redirect(`/home/${username}`);
    } else {
      return null;
    }
  } catch (err) {
    console.log(err);
    return null;
  }
}
async function allowEntery() {
  console.log("allowentery hai kya?");
  try {
    const res = await axios.get(
      `${import.meta.env.VITE_API_BASE_URL}/signin/isSignin`,
      {
        withCredentials: true,
      },
    );

    if (res.data.success) {
      return res.data.data.username;
    } else {
      return redirect(`/`);
    }
  } catch (err) {
    console.log(err);
    return redirect(`/`);
  }
}

async function handleSubmitSell(
  e,
  username,
  setData,
  setError,
  setFileName,
  setAdding,
) {
  console.log("handlesubmit");
  e.preventDefault();
  const formData = new FormData(e.target);
  const emptyFields = [];
  console.log("Handle submit sell");

  for (const [key, value] of formData.entries()) {
    if (key === "section") {
      if (!value || value.trim() === "") {
        formData.set("section", "NO CATEGORY");
        continue;
      }
    }
    if (!value || value.toString().trim() === "") {
      emptyFields.push("Give proper info of " + key);
    }
    if (value instanceof File) {
      if (value.size === 0) {
        emptyFields.push("Please upload a Photo");
      }
    }
  }
  if (emptyFields.length > 0) {
    setError(emptyFields);
    return;
  }
  for (const [key, value] of formData.entries()) {
    if (value instanceof File) continue;

    const cleaned = value.toString().trim().toUpperCase();
    formData.set(key, cleaned);
  }

  try {
    setAdding("on");
    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/sell/upload/${username}`,
      formData,
    );
    const newItem = res.data.item;
    setAdding("off");
    e.target.reset();
    setFileName("");
    setError([]);
    setData(function (prev) {
      return {
        listed: [...prev.listed, newItem],
        sold: prev.sold,
      };
    });

    console.log(res.data);
  } catch (err) {
    setAdding("off");
    console.log(err);
  }
}

async function deleteListed(item, forChange, setRemoving) {
  try {
    setRemoving(item);

    const res = await axios.post(
      `${import.meta.env.VITE_API_BASE_URL}/sell/delete`,
      { item },
      { withCredentials: true },
    );

    const seller = res.data.seller;

    forChange({
      listed: seller.listed,
      sold: seller.sold,
    });

    setRemoving(null);
  } catch (err) {
    setRemoving(null);
    console.log(err);
  }
}

export { checkLogin, allowEntery, handleSubmitSell, deleteListed };
