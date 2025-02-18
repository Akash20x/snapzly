import Link from "next/link";

export function ChatbotBtn() {
  
  return (
    <Link href="/chatbot">
      <button
        type="button"
        className="flex items-center space-x-2 text-gray-800 bg-gray-100 hover:bg-gray-200 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-gray-800 dark:hover:bg-gray-700 dark:text-gray-300 dark:focus:ring-gray-600"
      >
        {/* Chatbot Icon Container */}
        <div className="flex items-center justify-center bg-gray-200 w-9 h-9 rounded-l dark:bg-gray-700">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            className="w-5 h-5 text-gray-600 dark:text-gray-300"
          >

            <path
              d="M12 3C7.03 3 3 6.58 3 11c0 2.93 1.73 5.46 4.28 6.97L6.4 20.8c-.27.56.15 1.2.78 1.2h.3l3.18-2.14c.79.16 1.61.25 2.44.25 4.97 0 9-3.58 9-8 0-4.42-4.03-8-9-8zm0 14c-.66 0-1.3-.08-1.91-.24l-.53-.14-1.83 1.23.6-2.07-.49-.3C5.4 14.69 4 12.93 4 11c0-3.34 3.58-7 8-7s8 3.66 8 7-3.58 7-8 7zm-1-9h2v5h-2zm0-3h2v2h-2z"
              className="fill-current"
            ></path>
          </svg>
        </div>
        {/* Chatbot Button Text */}
        <span>Chatbot</span>
      </button>
    </Link>
  );
}
