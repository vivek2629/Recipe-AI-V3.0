export const loginUser = async (userDetails) => {
  const url = "http://localhost:3000/api/auth/login";
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
    },
  };

  const response = await fetch(url, options);
  const data = await response.json();

  return {
    response,
    data,
  };
};

export const signupUser = async (userDetails) => {
  const url = "http://localhost:3000/api/auth/signup";
  const options = {
    method: "POST",
    body: JSON.stringify(userDetails),
    headers: {
      "Content-Type": "application/json",
    },
  };
  const response = await fetch(url, options);
  const data = await response.json();
  return {
    response,
    data,
  };
};

export const googleLogin = async (code) => {
  const url = "http://localhost:3000/api/auth/google";
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ code }),
  };

  const response = await fetch(url, options);
  const data = await response.json();
  return {
    response,
    data,
  };
};
