const apiHelper = async (url, data = {}, method = "POST") => {
  let bearer = "Bearer " + localStorage.getItem("user_token");

  const object = {
    method: method,
    withCredentials: true,
    headers: {
      Authorization: bearer,
      "Content-Type": "application/json",
    },
  };

  if (data) object.body = JSON.stringify(data);

  try {
    const res = await fetch(url, object);
    const result = await res.json();
    console.log(result);
    return result;
  } catch (error) {
    console.log(error);
  }
};

export default apiHelper;
