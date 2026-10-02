'use client'

import Image from 'next/image'

export default function Logo() {
  return (
    <>
      <header>
        <div>
          <div className="h-px w-full bg-gray-300 relative top-8"></div>
          <Image
                src="/logo.jpeg"
                width={50}
                height={50}
                className="absolute top-3 left-3"
                alt="Picture of the author"
              />
          <h1 className="text-lg relative bottom-6 left-18 font-mono text-zinc-950">TaskFlow</h1>
          <p className="text-xs relative bottom-6 left-18 font-mono text-slate-500">Task Manager</p>
        </div>
      </header>
    </>
  )
}
