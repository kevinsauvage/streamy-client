import { useCallback, useEffect, useState } from 'react'

const useIsBottom = () => {
  const [bottom, setBottom] = useState(false)

  const handleScroll = useCallback(() => {
    if (
      window.innerHeight + window.scrollY >=
      document.body.offsetHeight - 20
    ) {
      setBottom(true)
    } else setBottom(false)
  }, [])

  useEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])

  return bottom
}

export default useIsBottom
