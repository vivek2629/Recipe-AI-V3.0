# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.



### Recipe AI

/ we are using state to store pervious chats








side bar 


<section
        className={`
            bg-black h-screen w-full md:w-[250px]
            border-r-2 border-white
            flex flex-col justify-between
            fixed md:static top-0 left-0 z-50
            transition-transform duration-300

            ${showSidebar ? "translate-x-0" : "-translate-x-full"}

            md:translate-x-0
        `}
      >
        <button
          className="h-14 w-40 text-white rounded-sm cursor-pointer self-center mt-[40px]"
          onClick={handleCreateNewChat}
        >
          New Chat
        </button>
        <div className="mt-5 ml-5 mr-5 p-3">
          <h1 className="text-white mb-2">History</h1>
          <hr className="text-[#FFFFFF]" />
        </div>

        {/* HISTORY */}
        <ul className="history h-[100%] p-3 m-5 list-none">
          {chatHistory.length === 0 ? (
            <p className="text-sm text-gray-500">
              No chat history available...
            </p>
          ) : (
            chatHistory.map((item, index) => (
              <li
                key={index}
                className="flex items-center gap-3 cursor-pointer mb-3"
                onClick={() => handleHistoryClick(item)}
              >
                <p className="text-white text-sm">{item.title}</p>
                <FiArrowUpRight className="text-white" />
              </li>
            ))
          )}
        </ul>
        <nav className="p-3 m-5 self-center">
          {" "}
          <img
            src="https://res.cloudinary.com/dpencg7d8/image/upload/v1753942321/Gemini_Generated_Image_ctwgycctwgycctwg__1_-removebg-preview_f2jdcg.png"
            alt="logo"
            className="h-10"
          />
        </nav>
      </section>