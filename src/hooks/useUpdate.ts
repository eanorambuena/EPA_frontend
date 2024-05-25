import { useState } from 'react'

export default function useUpdate() {
  const [value, setValue] = useState<boolean>(false)
  
  const update: () => void = () => {
    setValue(!value)
  }

  return [value, update]
}
