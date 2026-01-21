import { FaMicrophone } from "react-icons/fa";
export default function Chating() {
  const messages = [
    { type: "receiver", text: "Hello! Welcome to YuvNexus Digital service desk.", date: "13:23" },
    { type: "sender", text: "Okay, I want to book an appointment.", date: "13:26" },
    { type: "receiver", text: "Sure! Please select a date and time.", date: "13:27" },
     { type: "receiver", text: "Hello! Welcome to YuvNexus Digital service desk.", date: "13:23" },
    { type: "sender", text: "Okay, I want to book an appointment.", date: "13:26" },
    { type: "receiver", text: "Sure! Please select a date and time.", date: "13:27" },
     { type: "receiver", text: "Hello! Welcome to YuvNexus Digital service desk.", date: "13:23" },
    { type: "sender", text: "Okay, I want to book an appointment.", date: "13:26" },
    { type: "receiver", text: "Sure! Please select a date and time.", date: "13:27" },
     { type: "receiver", text: "Hello! Welcome to YuvNexus Digital service desk.", date: "13:23" },
    { type: "sender", text: "Okay, I want to book an appointment.", date: "13:26" },
    { type: "receiver", text: "Sure! Please select a date and time.", date: "13:27" }
  ]

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="bg-blue-600 flex p-3 justify-center items-center fixed top-0 w-full">
        <p className="text-white text-2xl uppercase text-center font-bold">
          yuvnexeus digital ai assistant
        </p>
      </div>

      {/* Chat messages */}
      <div className="pt-20 px-4 space-y-4  mx-auto">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${msg.type === "sender" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`p-3 rounded-lg shadow-md max-w-[75%] ${
                msg.type === "sender"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-gray-800"
              }`}
            >
              <p>{msg.text}</p>
              <span className="block text-xs text-gray-500 mt-1 text-right">
                {msg.date}
              </span>
            </div>
          </div>
        ))}
      </div>

    
      <div className="fixed bottom-0 left-0 right-0 bg-white p-3 border-t flex items-center gap-2">
        <input
          type="text"
          placeholder="Type your message..."
          className="flex-1 border rounded px-3 py-2 outline-none"
        />
         <button className="bg-blue-600 text-white px-3 py-2 rounded"><FaMicrophone fontSize={23}/></button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Send</button>
      </div>
    </div>
  )
}