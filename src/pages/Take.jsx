import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function TakePage() {
  const [bets, setBets] = useState([]);
  const [userEmail, setUserEmail] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserAndBets = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        setLoading(false);
        return;
      }

      setUserEmail(user.email);

      const { data, error } = await supabase
        .from('wagers')
        .select('*')
        .eq('opponent_email', user.email);

      if (error) {
        console.error(error);
      } else {
        setBets(data);
      }

      setLoading(false);
    };

    fetchUserAndBets();
  }, []);

  if (loading) return <p className="p-6 text-center">Loading...</p>;
  if (!userEmail) return <p className="p-6 text-center">Please log in to take bets.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Bets You've Been Challenged To</h2>
      {bets.length === 0 ? (
        <p>No bets found.</p>
      ) : (
        <ul className="space-y-4">
          {bets.map((bet) => (
            <li key={bet.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{bet.title}</h3>
              <p className="text-sm text-gray-600">
                Created by: <strong>{bet.creator_id}</strong>
              </p>
              <p className="text-sm text-gray-600">
                Judge: {bet.judge_email}
              </p>
              {/* Placeholder buttons for future functionality */}
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 bg-green-500 text-white rounded text-sm">Accept</button>
                <button className="px-3 py-1 bg-red-500 text-white rounded text-sm">Decline</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
