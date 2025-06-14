'use client';

import { useState, useEffect } from 'react';
import { format } from 'date-fns';

export default function ReferralsPage() {
  const [referrals, setReferrals] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchReferrals = async () => {
    try {
      const response = await fetch('/api/referrals');
      const data = await response.json();
      setReferrals(data);
    } catch (error) {
      console.error('Error fetching referrals:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchReferrals();
    const interval = setInterval(fetchReferrals, 30000); // Refresh every 30 seconds
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
        <h1 className="text-3xl font-bold text-gray-900 mb-8">Ad Referrals</h1>
        <div className="space-y-4">
          {referrals.map((referral) => (
            <div
              key={referral._id}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start space-x-4">
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center space-x-2">
                      <span className="text-sm text-gray-500">
                        From: {referral.senderUsername}
                      </span>
                      <span className="text-gray-400">→</span>
                      <span className="text-sm text-gray-500">
                        To: {referral.recipientUsername}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500">
                      {format(new Date(referral.timestamp), 'MMM d, yyyy h:mm a')}
                    </span>
                  </div>
                  <p className="text-gray-800 mb-4">{referral.content}</p>
                  
                  <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      Ad Details
                    </h3>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-sm text-gray-600">Source</p>
                        <p className="font-medium">{referral.adData.source}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Type</p>
                        <p className="font-medium">{referral.adData.type}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ad ID</p>
                        <p className="font-medium">{referral.adData.adId}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-600">Ad Title</p>
                        <p className="font-medium">{referral.adData.adTitle}</p>
                      </div>
                    </div>
                    {referral.adData.photoUrl && (
                      <div className="mt-4">
                        <img
                          src={referral.adData.photoUrl}
                          alt={referral.adData.adTitle}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                      </div>
                    )}
                    <div className="mt-4 flex space-x-4">
                      <a
                        href={`https://www.instagram.com/direct/t/${referral.senderId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-instagram-blue hover:bg-instagram-purple focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-instagram-blue"
                      >
                        Open Instagram Chat
                      </a>
                      <a
                        href={`https://www.facebook.com/ads/library/?id=${referral.adData.adId}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-instagram-purple hover:bg-instagram-pink focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-instagram-purple"
                      >
                        View Ad in Library
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
} 