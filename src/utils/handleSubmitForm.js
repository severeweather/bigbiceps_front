import { getCookie } from "./getCookie";

export const handleSubmitForm = async (e, url) => {
  e.preventDefault();

  const formData = new FormData(e.target);
  const csrfToken = getCookie("csrftoken");

  try {
    const res = await fetch(url, {
      method: "POST",
      body: formData,
      headers: {
        "X-CSRFToken": csrfToken,
      },
      credentials: "include",
    });

    if (!res.ok) throw new Error(res.status);
  } catch (err) {
    console.log("error:", err);
  }
};
