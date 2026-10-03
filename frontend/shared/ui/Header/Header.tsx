import { usePathname } from "next/navigation"

export default function Header() {
  const pathname = usePathname()
  return (
    <>
      <h1>{pathname}</h1>
    </>
  )
}
