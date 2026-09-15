import { useState, useRef, useEffect } from "react";
import { FiSidebar } from "react-icons/fi";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import Sidebar from "./Sidebar/Sidebar";
import ChatArea from "./ChatArea/ChatArea";
import ChatInput from "./ChatInput/ChatInput";
import { sendChatMessage } from "../services/aiService";
import { fetchChatHistory as getChatHistory } from "../services/chatService";
import { deleteChat } from "../services/chatService";

function Main() {
  const [showSidebar, setShowSidebar] = useState(false);
  const [value, setValue] = useState("");
  const [previousChats, setPreviousChats] = useState([]);
  const [currentTitle, setCurrentTitle] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [histroyError, setHistoryError] = useState("");
  const [errorStatus, setErrorStatus] = useState(false);
  const [chatId, setChatId] = useState(null);
  const [chatHistory, setChatHistory] = useState([]);

  const navigate = useNavigate();

  const handleCreateNewChat = () => {
    setCurrentTitle(null);
    setValue("");
    setShowSidebar(false);
    setErrorStatus(false);
    setChatId(null);
    setPreviousChats([]);
  };

  const handleHistoryClick = async (chatId, title) => {
    const jwtToken = Cookies.get("jwt_token");
    const options = {
      method: "GET",
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    };
    try {
      const response = await fetch(
        `http://localhost:3000/api/chats/${chatId}`,
        options,
      );
      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to fetch chat");
      }

      setPreviousChats(data.data.messages);
      setChatId(chatId);
      setCurrentTitle(title);
      setShowSidebar(false);
    } catch (error) {
      // console.error("Error loading chat:", error);
      setHistoryError("Failed to load chat. Please try again.");
    }
  };

  const handleLogout = () => {
    Cookies.remove("jwt_token");
    navigate("/", { replace: true });
  };

  const handleSendQuery = async () => {
    if (!value.trim()) return;

    setErrorStatus(false);
    setIsLoading(true);

    // create title
    const chatTitle = currentTitle || value;

    if (!currentTitle) {
      setCurrentTitle(chatTitle);
    }

    // user query
    const userMessage = {
      title: chatTitle,
      role: "user",
      content: value,
    };

    setPreviousChats((prevState) => [...prevState, userMessage]);
    const jwtToken = Cookies.get("jwt_token");

    try {
      const data = await sendChatMessage(value, chatId, jwtToken);

      if (!data.message) {
        throw new Error(data.error || "Failed to get AI response");
      }

      setChatId(data.chatId);

      if (!chatId) {
        await fetchChatHistory();
      }

      const assistantMessage = {
        title: chatTitle,
        role: data.message.role,
        content: data.message.content,
      };

      setPreviousChats((prevState) => [...prevState, assistantMessage]);

      setValue("");
    } catch (error) {
      setErrorStatus(true);
      setIsLoading(false);
      setValue("");
    } finally {
      setIsLoading(false);
    }
  };

  // console.log(previousChats);

  const bottomRef = useRef(null);
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [previousChats, isLoading]);

  const fetchChatHistory = async () => {
    const jwtToken = Cookies.get("jwt_token");
    try {
      const data = await getChatHistory(jwtToken);
      setChatHistory(data.data);
    } catch (error) {
      // console.log("Error: ", error);
      setHistoryError("Failed to fetch chat history. Please try again.");
    }
  };

  useEffect(() => {
    fetchChatHistory();
  }, []);

  const deleteSelectedChat = async (deleteChatId) => {
    const jwtToken = Cookies.get("jwt_token");
    try {
      const response = await deleteChat(deleteChatId, jwtToken);

      setChatHistory((prev) => prev.filter((chat) => chat._id != deleteChatId));

      if (chatId === deleteChatId) {
        handleCreateNewChat();
      }
    } catch (error) {
      // console.error("Error deleting chat:", error);
      setHistoryError("Failed to delete chat. Please try again.");
    }
  };

  return (
    <div className="bg-black flex">
      <div
        className={`md:hidden fixed top-8 z-[100] transition-all duration-300 ${
          showSidebar ? "left-[90%] top-8" : "left-4"
        }`}
      >
        <FiSidebar
          className="text-white text-lg cursor-pointer"
          onClick={() => setShowSidebar(!showSidebar)}
        />
      </div>

      <Sidebar
        showSidebar={showSidebar}
        chatHistory={chatHistory}
        onNewChat={handleCreateNewChat}
        onHistoryClick={handleHistoryClick}
        onLogout={handleLogout}
        onDeleteChat={deleteSelectedChat}
        histroyError={histroyError}
      />

      <section className="h-screen w-full flex flex-col bg-black text-white relative overflow-hidden">
        {/* CENTER CONTENT */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {previousChats.length === 0 && !isLoading && (
            <div className="flex flex-col items-center mt-[100px]">
              <img
                src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
                alt="logo"
                className="h-20"
              />
              <p className="text-gray-300 text-sm mt-2">
                Find Your Nxt Favourite Recipe
              </p>
            </div>
          )}

          {/* CHAT AREA */}

          <ChatArea
            messages={previousChats}
            isLoading={isLoading}
            errorStatus={errorStatus}
            bottomRef={bottomRef}
          />
        </div>

        {/* FIXED INPUT BOTTOM */}

        <ChatInput value={value} setValue={setValue} onSend={handleSendQuery} />
      </section>
    </div>
  );
}

export default Main;
