import React, { useState } from 'react'
import { supabase } from '../lib/supabaseClient'

export default function Make() {
  const [creatorId, setCreatorId] = useState('')
  const [opponentId, setOpponentId] = useState('')
  const [judgeId, setJudgeId] = useState('')
  const [description, setDescription] = useState('')
  const [status, setStatus] = useState(null)

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { data, error } = await supabase.from('wagers').insert([
      {
        creator_id: creatorId,
        opponent_id: opponentId,
        judge_id: judgeId,
        description: description,
        accepted: false,
        created_at: new Date().toISOString(),
      },
    ])

    if (error) {
      console.error('Error creating bet:', error)
      setStatus({ type: 'error', message: error.message })
    } else {
      console.log('Bet created:', data)
      setStatus({ type: 'success', message: 'Bet created successfully!' })
      setCreatorId('')
      setOpponentId('')
      setJudgeId('')
      setDescription('')
    }
  }

  return (
    <div className="max-w-xl mx-auto bg-white p-6 shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4 text-center">🎲 Make a Bet</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Creator ID"
          value={creatorId}
          onChange={(e) => setCreatorId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Opponent ID"
          value={opponentId}
          onChange={(e) => setOpponentId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <input
          type="text"
          placeholder="Judge ID"
          value={judgeId}
          onChange={(e) => setJudgeId(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          placeholder="Bet Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded font-semibold"
        >
          Create Bet
        </button>
      </form>

      {status && (
        <p
          className={`mt-4 text-center font-medium ${
            status.type === 'success' ? 'text-green-600' : 'text-red-500'
          }`}
        >
          {status.message}
        </p>
      )}
    </div>
  )
}
