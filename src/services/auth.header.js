const authHeader = (user) => {
  const user2 = JSON.parse(localStorage.getItem('user'));

  if (user && user.body.token) {
    return { Authorization: 'Bearer ' + user.body.token }; //return { Authorization: 'Bearer ' + user.accessToken };
  } else {
    return {};
  }
}

export default authHeader;
