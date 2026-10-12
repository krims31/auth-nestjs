'use client'

import { Bell, Share2, Star } from 'lucide-react'
import DropDownMenuAvatar from '../DropDown/DropDownMenuAvatar'
import useBreadcrumb from './hooks/useBreadcrumb'

export default function Header() {
  const { breadcrumb } = useBreadcrumb()

  return (
    <>
      <header className="flex items-center justify-between p-4 relative bottom-12 left-4 border-b">
        {/* Left part: Breadcrumb */}
        <div className="flex items-center">
          <span className="text-lg text-gray-500 font-medium ml-5">
            {breadcrumb}
          </span>
        </div>

        {/* Right part: Icons */}
        <div className="flex items-center gap-4">
          <div className="border rounded-sm h-8 w-8 flex items-center justify-center">
            <Star className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>

          <div className="border rounded-sm h-8 w-8 flex items-center justify-center">
            <Share2 className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>

          <div className="border rounded-sm h-8 w-8 flex items-center justify-center">
            <Bell className="h-5 w-5 text-gray-400 hover:text-gray-600 cursor-pointer transition-colors" />
          </div>
          <DropDownMenuAvatar />
        </div>
      </header>
    </>
  )
}
