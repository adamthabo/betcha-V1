import { useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function MakePage() {
  const [form, setForm] = useState({
    title: '',
    opponent_email: '',
    judge_email: '',
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage(null);

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      setMessage('You must be logged in to make a bet.');
      return;
    }

    const { error } = await supabase.from('wagers').insert({
      title: form.title,
      creator_id: user.id,
      opponent_email: form.opponent_email,
      judge_email: form.judge_email,
    });

    if (error) {
      setMessage(`Error: ${error.message}`);
    } else {
      setMessage('🎉 Bet created!');
      setForm({ title: '', opponent_email: '', judge_email: '' });
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Make a Bet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="What's the bet?"
          value={form.title}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="opponent_email"
          placeholder="Opponent's Email"
          value={form.opponent_email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <input
          type="email"
          name="judge_email"
          placeholder="Judge's Email"
          value={form.judge_email}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 rounded hover:bg-indigo-700"
        >
          Submit Bet
        </button>
      </form>
      {message && <p className="mt-4 text-sm text-center">{message}</p>}
    </div>
  );
}
