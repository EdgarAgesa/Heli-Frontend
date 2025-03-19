import React, { useEffect, useState } from 'react';
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import { db } from './Firebase';

const Chat = () => {
  const [messages, setMessages] = useState([]);
  const [error, setError] = useState('');

  const isAdmin = localStorage.getItem('is_admin') === 'true';
  const userId = localStorage.getItem('user_id');
  const adminId = localStorage.getItem('admin_id');

  useEffect(() => {
    let unsubscribe;

    const loadChat = () => {
      try {
        if (!userId && !adminId) {
          setError('Missing user or admin ID.');
          console.warn('Missing userId/adminId in localStorage');
          return;
        }

        const id = isAdmin ? adminId : userId;

        const q = query(
          collection(db, 'messages'),
          where(isAdmin ? 'adminId' : 'userId', '==', id)
        );

        unsubscribe = onSnapshot(q, (snapshot) => {
          const fetchedMessages = [];
          snapshot.forEach((doc) => {
            fetchedMessages.push({ id: doc.id, ...doc.data() });
          });
          setMessages(fetchedMessages);
        });
      } catch (err) {
        console.error("🔥 Firestore Query Error:", err);
        setError('Failed to load messages.');
      }
    };

    loadChat();

    return () => unsubscribe && unsubscribe();
  }, [isAdmin, userId, adminId]);

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div>
      <h2>Chat</h2>
      {messages.map((msg) => (
        <div key={msg.id}>
          <strong>{msg.sender}:</strong> {msg.text}
        </div>
      ))}
    </div>
  );
};

export default Chat;
