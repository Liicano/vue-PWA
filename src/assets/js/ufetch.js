export default ({
  url = "",
  data,
  method = "GET"
}) => {
  // let params = "";
  let body = {};
  if (method === "GET" && typeof data !== "undefined") {
    url += "?";
    Object.keys(data).forEach(key => {
      url += `${key}=${data[key]}&`;
    });
    url = url.slice(0, -1);
  } else if (method !== "GET") {
    body = {
      body: JSON.stringify(data),
      headers: {
        "Content-Type": "application/json"
      }
    };
  }
  let options = {
    method: method,
    credentials: "include",
    ...body
  };

  return new Promise((resolve, reject) => {
    // debugger;
    fetch(url, options)
      .then(res => res.json())
      .then(data => {
        resolve(data);
      })
      .catch(err => {
        reject(err);
      });
  });
};
