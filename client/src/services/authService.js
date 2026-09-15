export const loginUser = async (userDetails) => {
  const url = "https://recipe-ai-v3-0.onrender.com/api/auth/login";
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
  const url = "https://recipe-ai-v3-0.onrender.com/api/auth/signup";
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
  const url = "https://recipe-ai-v3-0.onrender.com/api/auth/google";
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
