import { createContext, useContext } from 'react'

interface SelectedChatContextType {
  selectedChatId: number
  selectChat: (id: number) => void
}

const SelectedChatContext = createContext<SelectedChatContextType>({
  selectedChatId: 1,
  selectChat: () => {}
})
export default SelectedChatContext

export function useSelectedChatId() {
  return useContext(SelectedChatContext)
}
