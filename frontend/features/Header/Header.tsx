'use client'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Bell, Moon, Share2, Star, Sun } from 'lucide-react'
import DropDownMenuAvatar from '../../shared/ui/DropDown/DropDownMenuAvatar'
import HeaderIconButton from './HeaderIconButtons'
import useBreadcrumb from './hooks/useBreadcrumb'
import useNotification from './hooks/useNotification'
import useTheme from './hooks/useTheme'
import NotificationsPanel from './Notification/NotificationPanel'
export default function Header() {
  const { breadcrumb } = useBreadcrumb()

  // Change theme.
  const { theme, toggleTheme } = useTheme()

  {
    /* Check if the theme is dark. */
  }
  const isDark = theme === 'dark'

  const {
    notifications,
    isOpenNotification,
    setIsOpenNotification,
    unreadCount,
    markAsRead,
    markAllAsRead
  } = useNotification()

  return (
    <>
      <header className="flex items-center justify-between p-4 relative bottom-12 left-4 border-b">
        {/* Left part: Breadcrumb */}
        <div className="flex items-center">
          <span className="text-lg text-gray-500 font-medium ml-5 dark:text-white">
            {breadcrumb}
          </span>
        </div>

        {/* Right part: Icons */}
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-2">
            <HeaderIconButton
              icon={Star}
              label="Favorite"
            />
            <HeaderIconButton
              icon={Share2}
              label="Share"
            />
            {isDark ? (
              <HeaderIconButton
                icon={Sun}
                label="Sun"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="flex items-center justify-center dark:flex"
              />
            ) : (
              <HeaderIconButton
                icon={Moon}
                label="Moon"
                onClick={toggleTheme}
                aria-label="Toggle theme"
                className="h-4 w-4 dark:hidden"
              />
            )}

            {/* Notifications */}
            <Popover
              open={isOpenNotification}
              onOpenChange={setIsOpenNotification}
            >
              <PopoverTrigger
                render={
                  <HeaderIconButton
                    icon={Bell}
                    label="Notifications"
                    dot={unreadCount > 0}
                  />
                }
              ></PopoverTrigger>

              <PopoverContent
                align="end"
                className="w-80 p-0"
              >
                <NotificationsPanel
                  notifications={notifications}
                  unreadCount={unreadCount}
                  onRead={markAsRead}
                  onReadAll={markAllAsRead}
                  onClose={() => setIsOpenNotification(false)}
                />
              </PopoverContent>
            </Popover>
          </div>
          <DropDownMenuAvatar />
        </div>
      </header>
    </>
  )
}
