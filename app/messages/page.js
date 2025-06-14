'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function MessagesPage() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchMessages = async () => {
    try {
      const response = await fetch('/api/messages');
      const data = await response.json();
      setMessages(data);
    } catch (error) {
      console.error('Error fetching messages:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMessages();
    const interval = setInterval(fetchMessages, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-instagram-blue"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Instagram Messages</h1>
        <div className="space-y-4">
          {messages.map((message) => (
            <div
              key={message._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        From: {message.senderUsername}
                        {console.log(message.senderUsername)}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-500">
                        To: {message.recipientUsername}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(message.timestamp), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-4">{message.content}</p>
                  
                  {message.adData && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <h3 className="font-semibold text-gray-900 mb-2">
                        Referred Ad: {message.adData.title}
                      </h3>
                      {message.adData.imageUrl && (
                        <img
                          src={message.adData.imageUrl}
                          alt={message.adData.title}
                          className="w-full h-48 object-cover rounded-lg mb-4"
                        />
                      )}
                      <div className="flex space-x-4">
                        <a
                          href={`https://www.instagram.com/direct/t/${message.senderId}`}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-instagram-blue hover:bg-instagram-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-instagram-blue"
                        >
                          Open Instagram Chat
                        </a>
                        {message.adData.adId && (
                          <a
                            href={`https://www.facebook.com/ads/library/?id=${message.adData.adId}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-instagram-purple hover:bg-instagram-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-instagram-purple"
                          >
                            View Ad in Library
                          </a>
                        )}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 