import { useEffect } from 'react'
import { useSidebarStore } from '@/store/sidebarStore'

const MOBILE_QUERY = '(max-width: 1023px)'

export function useSidebarLayout() {
  const setMobile = useSidebarStore((s) => s.setMobile)

  useEffect(() => {
    const media = window.matchMedia(MOBILE_QUERY)

    const sync = () => setMobile(media.matches)
    sync()

    media.addEventListener('change', sync)
    return () => media.removeEventListener('change', sync)
  }, [setMobile])
}
