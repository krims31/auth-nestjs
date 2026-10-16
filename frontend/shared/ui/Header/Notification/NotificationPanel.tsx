'use client'

import { CheckCheck, Inbox } from 'lucide-react'
import { Notification } from './interface/Notification'

interface Props {
  notifications: Notification[]
  unreadCount: number
  onRead: (id: string) => void
  onReadAll: () => void
  onClose: () => void
}

export default function NotificationsPanel({
  notifications,
  unreadCount,
  onRead,
  onReadAll,
  onClose
}: Props) {
  return (
    <div className='flex flex-col'>
      <div className='flex items-center justify-between border-b px-4 py-3'>
        <div className='flex items-center gap-2'>
          <h3 className='text-sm text-slate-800 font-mono'>Notifications</h3>
          {unreadCount > 0 && (
            <span className='rounded-full bg-red-100 px-2 text-xs text-red-600'>{unreadCount}</span>
          )}
        </div>
        {unreadCount > 0 && (
          <button
            onClick={onReadAll}
            className='flex items-center gap-1 text-xs text-slate-800 font-mono hover:text-gray-900'
          >
            <CheckCheck className='h-3.5 w-3.5 text-slate-800 font-mono' />
            Mark all read
          </button>
        )}
      </div>

      <ul className='max-h-80 overflow-y-auto'>
        {notifications.length === 0 && (
          <li className='flex flex-col items-center gap-2 px-4 py-8 text-sm text-slate-800 font-mono'>
            <Inbox className='h-6 w-6 text-slate-800 font-mono' />
            No notifications
          </li>
        )}

        {notifications.map(n => (
          <li
            key={n.id}
            onClick={() => onRead(n.id)}
            className={`cursor-pointer border-b px-4 py-3 text-sm last:border-b-0 hover:bg-gray-50 ${
              n.read ? 'opacity-60' : 'bg-sky-50/40'
            }`}
          >
            <div className='flex items-start gap-2'>
              {!n.read && <span className='mt-1.5 h-2 w-2 shrink-0 rounded-full bg-sky-500' />}
              <div className='flex-1'>
                <p className='font-medium'>{n.title}</p>
                {n.description && <p className='text-xs text-gray-500'>{n.description}</p>}
                <p className='mt-1 text-[11px] text-gray-400'>{n.createdAt}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>

      <div className='border-t px-4 py-2 text-center'>
        <button onClick={onClose} className='text-xs text-slate-800 font-mono hover:text-gray-900'>
          Close
        </button>
      </div>
    </div>
  )
}
