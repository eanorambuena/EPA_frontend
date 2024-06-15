import { createContext, useContext } from 'react'

interface SelectedChatContextType {
  selectedChatId: number | undefined
  selectChat: (id: number) => void
}

const SelectedChatContext = createContext<SelectedChatContextType>({
  selectedChatId: undefined,
  selectChat: () => {}
})
export default SelectedChatContext

export function useSelectedChatId() {
  return useContext(SelectedChatContext)
}
