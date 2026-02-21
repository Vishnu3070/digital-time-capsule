import React, { useState } from 'react';
import axios from 'axios';

function App() {
  const [title, setTitle] = useState('');
  const [message, setMessage] = useState('');
  const [date, setDate] = useState('');
  const [recipientEmail, setRecipientEmail] = useState(''); // New State

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('https://dashboard.render.com/web/srv-d6cnorffte5s73ct7mi0/deploys/dep-d6cnornfte5s73ct7mr0?r=2026-02-21%4009%3A34%3A42%7E2026-02-21%4009%3A38%3A37', {
        title, message, unlockDate: date, recipientEmail 
      });
      alert("Capsule Locked Successfully! 🔒");
    } catch (err) { alert("Error locking capsule"); }
  };

  return (
    <div style={{ padding: '50px', textAlign: 'center', backgroundColor: '#eef2f3', minHeight: '100vh' }}>
      <h1>⌛ Digital Time Capsule</h1>
      <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '30px', borderRadius: '15px', display: 'inline-block' }}>
        <input type="text" placeholder="Capsule Title" onChange={(e) => setTitle(e.target.value)} required style={{ display: 'block', width: '300px', margin: '10px auto', padding: '12px' }} />
        
        <textarea placeholder="Message for Future" onChange={(e) => setMessage(e.target.value)} required style={{ display: 'block', width: '300px', height: '100px', margin: '10px auto', padding: '12px' }} />
        
        <input type="email" placeholder="Recipient Email (Vera Person)" onChange={(e) => setRecipientEmail(e.target.value)} required style={{ display: 'block', width: '300px', margin: '10px auto', padding: '12px' }} />
        
        <input type="date" onChange={(e) => setDate(e.target.value)} required style={{ display: 'block', width: '300px', margin: '10px auto', padding: '12px' }} />
        
        <button type="submit" style={{ width: '325px', padding: '12px', background: '#3498db', color: 'white', border: 'none', cursor: 'pointer' }}>Lock Capsule 🔒</button>
      </form>
    </div>
  );
}

export default App;