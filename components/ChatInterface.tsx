"use client";

import React, { useEffect, useState, useRef } from "react";
import { useChat } from "@ai-sdk/react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { tomorrowNight } from "react-syntax-highlighter/dist/esm/styles/hljs";

function ChatInterface() {
  const {
    messages,
    input,
    handleInputChange,
    handleSubmit,
    status,
    setMessages,
  } = useChat({
    api: "/api/chat",
    headers: {
      Authorization: `${process.env.GOOGLE_GENERATIVE_AI_API_KEY}`
    }
  }); 

  const [explanationNewMessage, setExplanationNewMessage] = useState<
    string | null
  >(null);
  const [previewCodeNewMessage, setpreviewCodeNewMessage] = useState("");
  const [previewIndex, setpreviewIndex] = useState<number>(0);

  const chatContainerRef = useRef<HTMLDivElement | null>(null);
  const endOfChatRef = useRef<HTMLDivElement | null>(null);

  // Function to extract explanation from the message
  const extractExplanation = (message: string): string | null => {
    const explanationMatch = message.match(
      /\[Explanation starts\]([\s\S]*?)\[Explanation ends\]/
    );
    return explanationMatch ? explanationMatch[1].trim() : null;
  };

  // Function to extract code (HTML) from the message
  const extractCode = (message: string): string => {
    const codeMatch = message?.match(/<!DOCTYPE html>[\s\S]*?<\/html>/);
    return codeMatch ? codeMatch[0] : "";
  };

  // Update the explanation and preview code for each message whenever messages change
  useEffect(() => {
    messages.forEach((message) => {
      const lastMessageContent = message.content;

      if (lastMessageContent) {
        // Extract explanation and preview code using the new functions
        const newExplanation = extractExplanation(lastMessageContent);
        const newCode = extractCode(lastMessageContent);

        setExplanationNewMessage(newExplanation);
        setpreviewCodeNewMessage(newCode);

        if (messages?.length) setpreviewIndex(messages.length - 1);
      }
    });
  }, [messages]);


  const onSubmitHandler = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Trigger the handleSubmit function
      await handleSubmit(e);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };

  // Function to handle the file download for each code response
  const downloadCode = (code: string) => {
    const fullHtmlCode = `${code}`;

    const htmlBlob = new Blob([fullHtmlCode], { type: "text/html" });
    const url = URL.createObjectURL(htmlBlob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "generated_code.html"; // Specify the file name
    link.click();
    URL.revokeObjectURL(url); // Clean up after download
  };

  return (
    <div className="flex flex-col bg-gray-100 md:h-screen dark:bg-gray-900">
      
      {/* Chat and Preview Panels */}
      <div className="flex flex-col md:flex-row flex-1 ">
        {/* Chat Panel */}
        <div className="w-full md:w-1/2 absolute top-[5rem] md:static p-4 md:p-0">
        <div
          className="border border-gray-200 dark:border-gray-700 p-4 overflow-y-auto max-h-[24rem] md:max-h-[calc(100vh-5rem)]"
          ref={chatContainerRef}
          // style={{ maxHeight: "calc(100vh - 5rem)" }}
        >
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Chat
          </h2>
          <div className="space-y-4">
            {messages.map((message, index) => {
              return (
                <div
                  key={index}
                  className={`flex ${
                    message.role === "user" ? "justify-end" : "justify-start"
                  }`}
                >
                  <div
                    className={`inline-block px-4 py-2 rounded-lg max-w-full ${
                      message.role === "user"
                        ? "bg-blue-500 text-white"
                        : "bg-gray-800 text-white dark:bg-gray-700"
                    }`}
                  >
                    {message.role === "user" ? (
                      message.content
                    ) : (
                      <div>
                        {/* Display Explanation if available */}
                        {(message.content && status === "ready") ||
                        index != messages.length - 1
                          ? explanationNewMessage && (
                              <div className="mb-4">
                                <p className="text-gray-600 dark:text-gray-300">
                                  {extractExplanation(message.content)}
                                </p>
                              </div>
                            )
                          : status === "streaming" && (
                              <div className="flex justify-center items-center">
                                <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-solid"></div>
                              </div>
                            )}

                        {/* Display the HTML code */}
                        {(status === "ready" && previewCodeNewMessage) ||
                        index != messages.length - 1 ? (
                          <SyntaxHighlighter
                            language="html"
                            style={tomorrowNight}
                            customStyle={{
                              borderRadius: "8px",
                              padding: "1rem",
                            }}
                          >
                            {extractCode(message.content)}
                          </SyntaxHighlighter>
                        ) : (
                          ""
                        )}

                        {/* Download Button for the HTML code */}
                        {status === "ready" && previewCodeNewMessage && (
                          <div className="mt-2 flex justify-between space-x-4">
                            {/* Download Code Button */}
                            <button
                              onClick={() =>
                                downloadCode(extractCode(message.content))
                              }
                              className="bg-green-500 text-white px-6 py-2 rounded hover:bg-green-600"
                            >
                              Download Code
                            </button>

                            {/* Preview Code Button */}
                            <button
                              onClick={() => setpreviewIndex(index)}
                              className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600"
                            >
                              Preview Code
                            </button>
                          </div>
                        )}
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
          {/* This is the reference point for smooth scrolling */}
          <div ref={endOfChatRef}></div>
        </div>
        </div>
       

        {/* Preview Panel */}
        <div className="w-full md:w-1/2 bg-gray-50 dark:bg-gray-800 p-4 mt-[25rem] md:mt-0">
          <h2 className="text-2xl font-bold mb-4 text-gray-800 dark:text-white">
            Live Preview
          </h2>
          {status === "streaming" ? (
            <div className="flex justify-center items-center h-[75vh]">
              <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-blue-500 border-solid"></div>
            </div>
          ) : (
            <iframe
              srcDoc={`${extractCode(messages[previewIndex]?.content)}`}
              className="w-full min-h-[20vh] max-h-full md:h-[75vh] md:min-h-[75vh] md:max-h-[75vh]  border rounded dark:border-gray-700"
              sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
              title="Live Preview"
              onLoad={(e) => {
                const iframe = e.target as HTMLIFrameElement; // Type assertion to HTMLIFrameElement
                const iframeDoc = iframe.contentWindow?.document; // Accessing contentWindow

                if (iframeDoc) {
                  const links = iframeDoc.querySelectorAll("a");
                  links.forEach((link) => {
                    link.setAttribute("href", "#"); // Disable any redirects by changing href to #
                    link.setAttribute("onclick", "return false"); // Prevent the default click action
                  });
                }
              }}
            />
          )}
        </div>
      </div>

      {/* Input Section */}
      <div className="fixed bottom-0 left-0 right-0 bg-white dark:bg-gray-900 p-4 border-t border-gray-200 dark:border-gray-700">
        <form
          onSubmit={onSubmitHandler}
          className="flex flex-wrap items-center gap-2"
        >
          <button
            onClick={() => setMessages([])}
            className="bg-red-500 text-white px-4 py-2 rounded-l-lg hover:bg-red-600 mr-2 w-full sm:w-auto"
            type="button"
          >
            Clear Chat
          </button>
          <input
            type="text"
            value={input}
            onChange={handleInputChange}
            placeholder="Ask for HTML and CSS code..."
            className="flex-1 border rounded-l-lg p-2 focus:outline-none dark:bg-gray-800 dark:text-white w-full sm:w-auto"
            disabled={status === "streaming"}
          />
          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-r-lg hover:bg-blue-600 disabled:bg-gray-300 w-full sm:w-auto"
            disabled={status === "streaming"}
          >
            {status === "streaming" ? "Loading..." : "Send"}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ChatInterface;


