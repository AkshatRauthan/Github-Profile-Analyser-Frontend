import { Link } from 'react-router-dom'
import { Star, GitFork, Users, MapPin } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { formatNumber, personaLabel } from '@/lib/utils'
import type { GitHubProfile } from '@/types'

interface ProfileCardProps {
  profile: GitHubProfile
  index?: number
}

export function ProfileCard({ profile, index = 0 }: ProfileCardProps) {
  return (
    <Link to={`/profiles/${profile.githubUsername}`}>
      <Card hover delay={index * 0.05} className="h-full">
        <div className="flex items-start gap-4">
          <img
            src={profile.avatarUrl || `https://github.com/${profile.githubUsername}.png`}
            alt={profile.githubUsername}
            className="h-14 w-14 rounded-xl border border-cursor-border object-cover"
          />
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-semibold text-cursor-text">
              {profile.name || profile.githubUsername}
            </h3>
            <p className="font-mono text-sm text-cursor-accent-hover">@{profile.githubUsername}</p>
            {profile.location && (
              <p className="mt-1 flex items-center gap-1 text-sm text-cursor-muted">
                <MapPin className="h-3 w-3" />
                {profile.location}
              </p>
            )}
          </div>
        </div>

        {profile.bio && (
          <p className="mt-3 line-clamp-2 text-base text-cursor-muted">{profile.bio}</p>
        )}

        <div className="mt-4 flex flex-wrap gap-3 text-sm text-cursor-muted">
          <span className="flex items-center gap-1">
            <Star className="h-3.5 w-3.5 text-amber-400" />
            {formatNumber(profile.totalStars)}
          </span>
          <span className="flex items-center gap-1">
            <GitFork className="h-3.5 w-3.5" />
            {profile.publicRepos} repos
          </span>
          <span className="flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {formatNumber(profile.followers)}
          </span>
        </div>

        {profile.topLanguages?.length > 0 && (
          <div className="mt-3 flex flex-wrap gap-1.5">
            {profile.topLanguages.slice(0, 3).map((lang) => (
              <Badge key={lang.language} variant="accent">
                {lang.language}
              </Badge>
            ))}
          </div>
        )}

        {profile.bestPersona && profile.bestPersonaScore != null && (
          <div className="mt-4 flex items-center justify-between rounded-lg border border-violet-500/20 bg-violet-500/5 px-3 py-2">
            <span className="text-sm text-cursor-muted">Best match</span>
            <span className="text-sm font-medium text-cursor-accent-hover">
              {personaLabel(profile.bestPersona)} · {Math.round(profile.bestPersonaScore)}
            </span>
          </div>
        )}
      </Card>
    </Link>
  )
}
