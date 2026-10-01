import { useState } from "react";

export default function useSidebar() {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  return {
    isOpen,
    setIsOpen
  }
}
