'use client'
import { useState } from 'react'
import { NotificationItem } from '../Notification/interface/NotificationItem'
const initial: NotificationItem[] = [
  {
    id: 1,
    title: 'New task assigned',
    description: 'Fix login bug',
    createdAt: '2m ago',
    read: false
  },
  {
    id: 2,
    title: 'Comment on your task',
    description: 'Looks good!',
    createdAt: '1h ago',
    read: false
  },
  { id: 3, title: 'Project updated', description: 'Design v2', createdAt: 'yesterday', read: true }
]

export default function useNotifications() {
  const [notifications, setNotifications] = useState<NotificationItem[]>(initial)
  const [isOpenNotification, setIsOpenNotification] = useState<boolean>(false)

  const unreadCount = notifications.filter(n => !n.read).length

  const markAsRead = (id: number) =>
    setNotifications(prev => prev.map(n => (n.id === id ? { ...n, read: true } : n)))

  const markAllAsRead = () => setNotifications(prev => prev.map(n => ({ ...n, read: true })))

  return {
    notifications,
    isOpenNotification,
    setIsOpenNotification,
    unreadCount,
    markAsRead,
    markAllAsRead
  }
}
