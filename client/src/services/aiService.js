export const sendChatMessage = async (query, chatId, jwtToken) => {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${jwtToken}`,
    },
    body: JSON.stringify({
      query,
      chatId,
    }),
  };
  const response = await fetch("http://localhost:3000/api/ai/chat", options);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.error || "Failed to send message");
  }

  return data;
};
