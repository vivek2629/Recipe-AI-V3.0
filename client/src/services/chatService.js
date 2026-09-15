export const fetchChatHistory = async (jwtToken) => {
  const options = {
    method: "GET",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const response = await fetch(
    "https://recipe-ai-v3-0.onrender.com/api/chats/history",
    options,
  );

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.error || "Failed to fetch chat history");
  }
  return data;
};

export const deleteChat = async (chatId, jwtToken) => {
  const options = {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${jwtToken}`,
    },
  };
  const response = await fetch(
    `https://recipe-ai-v3-0.onrender.com/api/chats/${chatId}`,
    options,
  );
  if (!response.ok) {
    throw new Error("Failed to delete chat");
  }

  return true;
};
