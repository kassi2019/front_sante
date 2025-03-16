export default function authHeader() {
 // console.log(JSON.parse(localStorage.getItem('user-token')))
  let user = JSON.parse(localStorage.getItem('token'));

  if (user) {
    return { Authorization: 'Bearer ' + user };
  } else {
    return {};
  }
}