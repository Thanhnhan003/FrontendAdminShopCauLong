import axios from "axios";
import Cookies from "js-cookie";

let API_URL = "http://localhost:8080";

function callApi(endpoint, method = "GET", body) {
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
  }).catch((e) => {
    console.log(e);
    throw e;
  });
}

function callApiAuth(endpoint, method = "GET", body) {
  const token = Cookies.get('tokenAdmin');
  console.log('Token:', token); // Debugging line
  return axios({
    method,
    url: `${API_URL}/${endpoint}`,
    data: body,
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).catch((e) => {
    console.log(e);
    throw e;
  });
}


export function GET_ALL(endpoint) {
  return callApi(endpoint, "GET");
}

// export function GET_ID(endpoint, id) {
//   return callApi(endpoint + "/" + id, "GET");
// }
export function GET_IMG(endpoint, imgName) {
  return `${API_URL}/${endpoint}/images/${imgName}`;
}
export function GET_ID(endpoint, id) {
  return callApi(`${endpoint}/${id}`, 'GET');
}
export function POST_ADD_REGISTER(endpoint, data) {
  return callApi(endpoint, "POST", data);
}
// admin

export function POST_ADD(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}

export function PUT_EDIT(endpoint, data) {
  return callApiAuth(endpoint, "PUT", data);
}

export function DELETE_ID(endpoint) {
  return callApiAuth(endpoint, "DELETE");
}

// export function GET_IMG(endpoint, imgName) {
//   return API_URL + "/" + endpoint + "/images/" + imgName;
// }

export function LOGIN(endpoint, data) {
  return callApi(endpoint, "POST", data)
    .then(response => {
      const token = response.data.token;
      // Cookies.set('tokenAdmin', token);
      Cookies.set('tokenAdmin', token, { expires: 365 }); // Thiết lập cookie hết hạn sau 1 năm
      return response;
    });
}

export function LOGOUT() {
  Cookies.remove('tokenAdmin');
}
// admin
export function GET_USER_INFO(endpoint) {
  return callApiAuth(endpoint, "GET");
}
export function POST_ADD_ORDER(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}
export function POST_ADD_PRODUCT(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}
export function POST_ADD_AVATAR(endpoint, data) {
  return callApiAuth(endpoint, "POST", data);
}

//show all theo id
export function GET_PRODUCT_BY_ID(productId) {
  return callApi(`products/show/${productId}`, "GET");
}
// show all cần token
export function GET_ALL_BY_TOKEN(endpoint) {
  return callApiAuth(endpoint, "GET");
}
//cập nhập trạng thái người dùng
export function PUT_EDIT_ENABLED(userId, enabled) {
  return callApiAuth(`auth/enabled/${userId}?enabled=${enabled}`, "PUT");
}
