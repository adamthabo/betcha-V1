import { useEffect, useState } from 'react';
import { supabase } from '../lib/supabaseClient';

export default function SettlePage() {
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
        .eq('judge_email', user.email);

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
  if (!userEmail) return <p className="p-6 text-center">Please log in to view judged bets.</p>;

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white rounded shadow">
      <h2 className="text-xl font-bold mb-4">Bets You're Judging</h2>
      {bets.length === 0 ? (
        <p>No bets to settle.</p>
      ) : (
        <ul className="space-y-4">
          {bets.map((bet) => (
            <li key={bet.id} className="border p-4 rounded">
              <h3 className="text-lg font-semibold">{bet.title}</h3>
              <p className="text-sm text-gray-600">
                Creator ID: <strong>{bet.creator_id}</strong>
              </p>
              <p className="text-sm text-gray-600">Opponent: {bet.opponent_email}</p>
              <p className="text-sm text-gray-600">Judge (You): {bet.judge_email}</p>
              {/* Placeholder buttons for future settlement logic */}
              <div className="mt-2 flex gap-2">
                <button className="px-3 py-1 bg-blue-600 text-white rounded text-sm">Award to Creator</button>
                <button className="px-3 py-1 bg-purple-600 text-white rounded text-sm">Award to Opponent</button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
