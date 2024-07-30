import React, { useState, useRef, useEffect } from 'react';
import { env } from '~/env';

const FloatingChatbot:React.FC<any> = ({currentData,setTableData}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const chatContainerRef = useRef(null);
  const [tableData,setNewData] = useState(null)


  useEffect(() => {
    if (chatContainerRef.current) {
      //@ts-ignore
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleModifyTableContent = (data:any) => {
    console.log(`handleModifyTableContent`,data);
    setTableData(data.tabs,data.groupOrder,data.subGroupOrder)
    setNewData(data);
  }

  const handleSubmit = async (e:any) => {
    e.preventDefault();
    if (!inputMessage.trim()) return;

    const newMessages = [...messages, { role: 'user', content: inputMessage }];
    setMessages(newMessages);
    setInputMessage('');
    setIsLoading(true);
    setError(null);

    try {

      const bodytext:any = {project_info:{
        messages:newMessages,
      }}

      if(tableData){
        bodytext.project_info.currentData = tableData

      }
      const response = await fetch(`http://localhost:3000/api/boards/chat`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body:JSON.stringify(bodytext),
        // body: JSON.stringify({
        //   messages: newMessages,
        // }),
      });

      if (!response.ok) {
        throw new Error('Server responded with an error');
      }

      const data = await response.json();
  
      setMessages([...newMessages, { role: 'assistant', content: data.message }]);
      if(data.data){
        handleModifyTableContent(data.data);
      }
    } catch (error) {
      console.error('Error fetching response:', error);
      setError("Sorry, there was an error communicating with the server. Please try again later.");
      setMessages([...newMessages, { role: 'assistant', content: "I'm sorry, but I encountered an error. Please try again or contact support if the problem persists." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-10 z-50">
      {/* {!isOpen && <p className='animate-bounce text-secondary-purple font-thin text-sm '>Create With Magic</p>} */}
      {isOpen ? (
        <div className="bg-white rounded-lg shadow-xl h-[300px] md:h-[450px] overflow-auto w-80 flex flex-col">
          <div onClick={() => setIsOpen(false)} className="p-2 cursor-pointer bg-secondary-pink text-white rounded-t-lg flex justify-between items-center">
            <h3 className="font-bold">Chat with Wizard AI</h3>
            <button onClick={() => setIsOpen(false)} className="text-white">&times;</button>
          </div>
          <div ref={chatContainerRef} className="flex-grow overflow-y-auto p-4">
            {messages.map((msg:any, index) => (
              <div key={index} className={`mb-2 ${msg.role === 'user' ? 'text-right' : 'text-left'}`}>
                <span className={`inline-block p-2 rounded-lg ${msg.role === 'user' ? 'bg-blue-100' : 'bg-gray-200'}`}>
                  {msg.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="text-center text-gray-500">
                Thinking...
              </div>
            )}
            {error && (
              <div className="text-center text-red-500">
                {error}
              </div>
            )}
          </div>
          <form onSubmit={handleSubmit} className="p-4 border-t">
            <div className="flex">
              <input
                type="text"
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                className="flex-grow px-3 py-2 border rounded-l-lg focus:outline-none focus:ring-2 focus:ring-secondary-pink"
                placeholder="Type a message..."
                disabled={isLoading}
              />
              <button 
                type="submit" 
                className="bg-secondary-pink text-white px-4 py-2 rounded-r-lg hover:bg-secondary-purple focus:outline-none focus:ring-2 focus:ring-secondary-pink disabled:bg-secondary-purple"
                disabled={isLoading}
              >
                Send
              </button>
            </div>
          </form>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="bg-secondary-pink text-white rounded-full p-3 hover:bg-secondary-purple focus:outline-none focus:ring-2 focus:ring-secondary-purple"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        </button>
      )}
    </div>
  );
};

export default FloatingChatbot;