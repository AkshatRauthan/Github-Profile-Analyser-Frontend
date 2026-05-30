import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { ProfileCard } from '@/components/ProfileCard'
import { Button } from '@/components/ui/Button'
import { getProfiles } from '@/api/profiles'
import type { GitHubProfile } from '@/types'

export function ProfilesPage() {
  const [profiles, setProfiles] = useState<GitHubProfile[]>([])
  const [page, setPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    getProfiles(page, 12)
      .then((res) => {
        setProfiles(res.items)
        setTotalPages(res.pagination.totalPages)
      })
      .finally(() => setLoading(false))
  }, [page])

  return (
    <div className="mx-auto max-w-6xl space-y-8">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-3xl font-bold text-gradient">Your profiles</h1>
        <p className="mt-2 text-cursor-muted">All GitHub profiles you have analyzed</p>
      </motion.div>

      {loading ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div key={i} className="h-48 animate-pulse rounded-xl bg-cursor-elevated" />
          ))}
        </div>
      ) : profiles.length === 0 ? (
        <p className="text-center text-cursor-muted py-20">No profiles analyzed yet.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {profiles.map((p, i) => (
            <ProfileCard key={p.id} profile={p} index={i} />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center gap-2">
          <Button variant="secondary" disabled={page <= 1} onClick={() => setPage((p) => p - 1)}>
            Previous
          </Button>
          <span className="flex items-center px-4 text-sm text-cursor-muted">
            Page {page} of {totalPages}
          </span>
          <Button
            variant="secondary"
            disabled={page >= totalPages}
            onClick={() => setPage((p) => p + 1)}
          >
            Next
          </Button>
        </div>
      )}
    </div>
  )
}
