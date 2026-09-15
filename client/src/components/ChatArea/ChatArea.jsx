import Loader from "../../lottiefiles/Loader";
import ReactMarkdown from "react-markdown";

const ChatArea = ({ messages, isLoading, errorStatus, bottomRef }) => {
  return (
    <ul className="flex-1 overflow-y-auto py-6 scrollbar-hide flex flex-col items-center">
      <div className="w-full max-w-2xl px-4 space-y-4 pt-[200px] pb-[100px]">
        {messages.map((chat, index) => (
          <li
            key={index}
            className={`mb-4 flex ${chat.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`w-fit max-w-[85%] sm:max-w-[75%] p-4 ${
                chat.role === "user"
                  ? "bg-[#383838] text-white rounded-l-4xl rounded-br-4xl"
                  : "rounded-r-4xl rounded-bl-4xl text-white"
              }`}
            >
              {chat.role === "assistant" && (
                <p className="text-sm font-semibold mb-1">Chef Buddy</p>
              )}
              <div className="prose prose-invert max-w-none break-words text-sm sm:text-base">
                <ReactMarkdown>{chat.content}</ReactMarkdown>
              </div>
            </div>
          </li>
        ))}

        {isLoading && (
          <li className="mb-4 flex justify-start">
            <Loader />
          </li>
        )}

        {errorStatus && (
          <li className="mb-4 flex justify-start">
            <div className="w-fit p-4 bg-red-900/40 border border-red-500 rounded-r-4xl rounded-bl-4xl text-red-400 text-sm">
              ⚠️ Something went wrong. Please try again.
            </div>
          </li>
        )}

        <div ref={bottomRef} />
      </div>
    </ul>
  );
};

export default ChatArea;
