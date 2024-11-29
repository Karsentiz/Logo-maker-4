'use client'

import React, { useEffect, useRef, useState } from 'react'

interface LogMessage {
  type: 'info' | 'error' | 'success'
  message: string
  timestamp: string
}

export default function Console() {
  const [logs, setLogs] = useState<LogMessage[]>([])
  const consoleRef = useRef<HTMLDivElement>(null)

  const addLog = (type: LogMessage['type'], message: string) => {
    const timestamp = new Date().toLocaleTimeString()
    setLogs(prev => [...prev, { type, message, timestamp }])
  }

  useEffect(() => {
    if (consoleRef.current) {
      consoleRef.current.scrollTop = consoleRef.current.scrollHeight
    }
  }, [logs])

  // Override console.log and console.error
  useEffect(() => {
    const originalConsoleLog = console.log
    const originalConsoleError = console.error

    console.log = (...args) => {
      originalConsoleLog.apply(console, args)
      addLog('info', args.map(arg => String(arg)).join(' '))
    }

    console.error = (...args) => {
      originalConsoleError.apply(console, args)
      addLog('error', args.map(arg => String(arg)).join(' '))
    }

    return () => {
      console.log = originalConsoleLog
      console.error = originalConsoleError
    }
  }, [])

  return (
    <div className="mt-8 bg-gray-900 rounded-lg p-4">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-gray-300 font-mono text-sm">Console Output</h3>
        <button
          onClick={() => setLogs([])}
          className="text-gray-400 hover:text-gray-200 text-sm"
        >
          Clear
        </button>
      </div>
      <div
        ref={consoleRef}
        className="font-mono text-sm h-40 overflow-y-auto space-y-1"
      >
        {logs.map((log, index) => (
          <div
            key={index}
            className={`flex gap-2 ${
              log.type === 'error' ? 'text-red-400' : 
              log.type === 'success' ? 'text-green-400' : 
              'text-gray-300'
            }`}
          >
            <span className="text-gray-500">{log.timestamp}</span>
            <span>{log.message}</span>
          </div>
        ))}
      </div>
    </div>
  )
} 