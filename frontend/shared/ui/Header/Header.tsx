'use client'

import { Bell, Share2, Star } from 'lucide-react'
import DropDownMenuAvatar from '../DropDown/DropDownMenuAvatar'
import HeaderIconButton from './HeaderIconButtons'
import useBreadcrumb from './hooks/useBreadcrumb'

export default function Header() {
  const { breadcrumb } = useBreadcrumb()

  return (
    <>
      <header className='flex items-center justify-between p-4 relative bottom-12 left-4 border-b'>
        {/* Left part: Breadcrumb */}
        <div className='flex items-center'>
          <span className='text-lg text-gray-500 font-medium ml-5'>{breadcrumb}</span>
        </div>

        {/* Right part: Icons */}
        <div className='flex items-center gap-2'>
          <div className='flex items-center gap-2'>
            <HeaderIconButton icon={Star} label='Favorite' />
            <HeaderIconButton icon={Share2} label='Share' />
            <HeaderIconButton icon={Bell} label='Notifications' dot />
          </div>
          <DropDownMenuAvatar />
        </div>
      </header>
    </>
  )
}
