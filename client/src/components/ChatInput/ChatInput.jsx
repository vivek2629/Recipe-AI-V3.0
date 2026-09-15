import { RiSendPlaneFill } from "react-icons/ri";

const ChatInput = ({ value, setValue, onSend }) => {
  return (
    <div className="absolute bottom-4 md:bottom-0 left-0 right-0 flex justify-center px-4 py-4">
      <div className="relative w-full max-w-[700px]">
        <input
          className="bg-white text-black w-full p-4 rounded-full outline-none pr-14"
          placeholder="Ask for any recipe..."
          onChange={(e) => setValue(e.target.value)}
          value={value}
        />

        <div
          className="absolute right-5 top-1/2 -translate-y-1/2 text-black cursor-pointer text-xl"
          onClick={onSend}
        >
          <RiSendPlaneFill />
        </div>
      </div>
    </div>
  );
};

export default ChatInput;
