export const getAuthorizationToken = () => {
  // Get token
  let token;
  if (process.browser) {
    token = window.localStorage.getItem("authToken");
  }

  if (token) return `Bearer ${token}`;
  return null;
};

export const validAuthToken = () => {
  // Check if token in localstorge
  let token, expiration;
  if (process.browser) {
    token = window.localStorage.getItem("authToken");
    expiration = window.localStorage.getItem("expiration");
  }

  if (token) {
    // Calculate remaining time
    let remainingTime = calcRemTime(expiration);

    if (remainingTime < 60000) return false;
    return remainingTime;
  }

  return false;
};

export const removeToken = () => {
  if (process.browser) {
    window.localStorage.removeItem("authToken");
    window.localStorage.removeItem("expiration");
  }
};

const calcRemTime = (time) => {
  return +time - new Date().getTime();
};
