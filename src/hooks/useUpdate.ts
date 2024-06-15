import { useCallback, useState } from 'react'

export default function useUpdate() {
  const [value, setValue] = useState<boolean>(false)

  const update = useCallback(() => setValue((prev) => !prev), [])

  return [value, update] as const
}
