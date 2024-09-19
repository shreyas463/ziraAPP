// src/app/page.tsx
'use client'

import { useState, useEffect } from 'react'
import { v4 as uuidv4 } from 'uuid'
import { TrashIcon, PlusCircleIcon } from '@heroicons/react/24/solid'

interface Ticket {
  id: string
  title: string
  priority: number
}

export default function Home() {
  const [tickets, setTickets] = useState<Ticket[]>([])
  const [title, setTitle] = useState('')
  const [priority, setPriority] = useState<number>(1)

  // Load tickets from local storage on mount
  useEffect(() => {
    const storedTickets = localStorage.getItem('tickets')
    if (storedTickets) {
      setTickets(JSON.parse(storedTickets))
    }
  }, [])

  // Save tickets to local storage whenever they change
  useEffect(() => {
    localStorage.setItem('tickets', JSON.stringify(tickets))
  }, [tickets])

  // Add a new ticket
  const addTicket = () => {
    if (title.trim() === '') return
    const newTicket: Ticket = {
      id: uuidv4(),
      title,
      priority,
    }
    setTickets([...tickets, newTicket])
    setTitle('')
    setPriority(1)
  }

  // Delete a ticket
  const deleteTicket = (id: string) => {
    setTickets(tickets.filter((ticket) => ticket.id !== id))
  }

  // Sort tickets by priority
  const sortedTickets = [...tickets].sort((a, b) => a.priority - b.priority)

  return (
    <div className="min-h-screen bg-gray-100 py-10">
      <div className="max-w-xl mx-auto bg-white shadow-md rounded-lg p-6">
        <h1 className="text-3xl font-semibold text-center text-gray-800 mb-6">
          Ticket Management
        </h1>
        <div className="mb-6">
          <div className="flex flex-col sm:flex-row items-center">
            <input
              className="w-full sm:w-auto flex-grow border border-gray-300 rounded-md p-2 mb-4 sm:mb-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="text"
              placeholder="Ticket Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <input
              className="w-full sm:w-32 border border-gray-300 rounded-md p-2 mb-4 sm:mb-0 sm:mr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              type="number"
              min="1"
              max="5"
              placeholder="Priority (1-5)"
              value={priority}
              onChange={(e) => setPriority(Number(e.target.value))}
            />
            <button
              className="flex items-center justify-center bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md transition-colors duration-200"
              onClick={addTicket}
            >
              <PlusCircleIcon className="h-5 w-5 mr-2" />
              Add Ticket
            </button>
          </div>
        </div>
        <ul>
          {sortedTickets.map((ticket) => (
            <li
              key={ticket.id}
              className="bg-gray-50 hover:bg-gray-100 border border-gray-200 rounded-md p-4 mb-4 shadow-sm transition-all duration-200"
            >
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-semibold text-gray-800">
                    {ticket.title}
                  </h2>
                  <p className="text-sm text-gray-600">
                    Priority:{' '}
                    <span
                      className={`font-medium ${
                        ticket.priority === 1
                          ? 'text-red-500'
                          : ticket.priority === 2
                          ? 'text-orange-500'
                          : ticket.priority === 3
                          ? 'text-yellow-500'
                          : ticket.priority === 4
                          ? 'text-green-500'
                          : 'text-blue-500'
                      }`}
                    >
                      {ticket.priority}
                    </span>
                  </p>
                </div>
                <button
                  className="text-red-500 hover:text-red-700 transition-colors duration-200"
                  onClick={() => deleteTicket(ticket.id)}
                >
                  <TrashIcon className="h-6 w-6" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
