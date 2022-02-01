import { useEffect, useState } from 'react'
import { useProvider } from './provider'

export function useBlock(blockHashOrBlockTag = 'latest') {
  const [block, setBlock] = useState()
  const provider = useProvider()

  useEffect(() => {
    if (!provider) return

    provider
      .getBlock(blockHashOrBlockTag)
      .then(setBlock, err => console.error(err))
  }, [block, blockHashOrBlockTag, provider])

  return block
}
