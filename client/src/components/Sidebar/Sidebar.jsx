import { FiLogOut } from "react-icons/fi";
import { PiNotePencilThin } from "react-icons/pi";
import { MdDeleteOutline } from "react-icons/md";

const Sidebar = ({
  showSidebar,
  chatHistory,
  onNewChat,
  onHistoryClick,
  onLogout,
  onDeleteChat,
  histroyError,
}) => {
  return (
    <section
      className={`
                    bg-black h-screen w-full md:w-[250px]
                    border-r-2 border-white
                    flex flex-col
                    fixed md:static top-0 left-0 z-50
                    transition-transform duration-300
        
                    ${showSidebar ? "translate-x-0" : "-translate-x-full"}
        
                    md:translate-x-0
                `}
    >
      <nav className="p-3 mt-3">
        <img
          src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
          alt="logo"
          className="h-10"
        />
      </nav>
      <button
        className="h-14 w-40 text-white rounded-sm cursor-pointer flex items-center gap-1 ml-5"
        onClick={onNewChat}
      >
        <PiNotePencilThin className="text-white text-[20px]" />
        New Chat
      </button>
      <div className="ml-2 mr-2 p-3">
        <h1 className="text-white text-[14px] mb-2">History</h1>
        <hr className="text-[#FFFFFF]" />
      </div>

      {/* HISTORY */}
      <ul className="history h-[400px] border border-black p-3 ml-2 mr-2 overflow-y-auto list-none">
        {chatHistory.length === 0 ? (
          <p className="text-sm text-gray-500">No chat history available...</p>
        ) : (
          chatHistory.map((item, index) => (
            <li
              key={index}
              className="flex items-center justify-between cursor-pointer mb-4"
              onClick={() => onHistoryClick(item._id, item.title)}
            >
              <p className="text-white text-[14px]">{item.title}</p>
              <MdDeleteOutline
                className="text-white"
                onClick={(event) => {
                  event.stopPropagation();
                  onDeleteChat(item._id);
                }}
              />
            </li>
          ))
        )}
      </ul>
      {histroyError && (
        <p className="text-red-500 text-sm ml-5">{histroyError}</p>
      )}
      <button
        type="button"
        className="text-white mt-[50px] text-[14px] cursor-pointer flex items-center gap-1 ml-5 mb-5 md:mb-0"
        onClick={onLogout}
      >
        <FiLogOut className="text-white text-[25px]" />
        Logout
      </button>
    </section>
  );
};

export default Sidebar;
