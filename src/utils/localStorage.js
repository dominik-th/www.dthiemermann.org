export const loadState = () => {
  try {
    const serializedState = localStorage.getItem('state');
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState);
  } catch (err) {
    return undefined;
  }
}

export const saveState = (state) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem('state', serializedState)
  } catch (err) {
    console.log('failed loading state from LocalStorage')
  }
}

export const getCsrfLogin = () => {
  let oauthCsrf = JSON.parse(localStorage.getItem('oauthCsrf'));
  if (oauthCsrf) {
    // token exists but expires soon
    if (oauthCsrf[0].expiry < Date.now() + (60 * 60 * 1000)) {
      oauthCsrf[1] = oauthCsrf[0];
      oauthCsrf[0] = generateToken();
    }
  } else {
    oauthCsrf = [
      generateToken()
    ];
  }
  localStorage.setItem('oauthCsrf', JSON.stringify(oauthCsrf));
  return oauthCsrf[0].token;
}

const generateToken = () => {
  return {
    token: Math.random().toString(36).substr(2, 10),
    expiry: Date.now() + (30 * 24 * 60 * 1000),
  };
}

export const validateCsrfLogin = (token) => {
  const oauthCsrf = JSON.parse(localStorage.getItem('oauthCsrf'));
  if (oauthCsrf) {
    if (oauthCsrf[0].token === token && oauthCsrf[0].expiry > Date.now()) {
      return true;
    } else if (oauthCsrf[1].token === token && oauthCsrf[1].expiry > Date.now()) {
      return true;
    }
  }
  return false;
}
