import { API } from "../../../backend";

export const newArticle = (userId, token, post) => {
  return fetch(`${API}/api/new/post/${userId}`, {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(post),
  }).then((response) => {
    console.log(response);
    return response.json();
  });
};

export const postBySlug = (slug) => {
  return fetch(`${API}/api/new/post/${slug}`, {
    method: "GET",
    header: {
      Accept: "application/json",
      "Content-type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
};
