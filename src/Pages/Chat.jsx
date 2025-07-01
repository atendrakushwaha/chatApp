import React, { useState } from 'react';
import Message_Box from '../Components/Message_Box';
import Chat_Box from '../Components/Chat_Box';

const Chat = () => {
  const [selectedUser, setSelectedUser] = useState(null);

  return (
    <div className="lg:w-[80%] mx-auto mt-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <Message_Box onUserSelect={setSelectedUser} />
        {selectedUser ? (
          <Chat_Box user={selectedUser} />
        ) : (
          <div className="bg-white shadow-md flex justify-center items-center h-[85vh] text-gray-500">
            <div className="text-center">
              <i className="ri-message-2-line text-3xl mb-2" />
              <p>Select a user to start chatting</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
