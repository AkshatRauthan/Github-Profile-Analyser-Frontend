export interface ApiResponse<T> {
  success: boolean
  message: string
  data: T
}

export interface User {
  id: string
  email: string
  username: string
  authMethods: string[]
}

export interface AuthTokens {
  accessToken: string
  refreshToken: string
}

export interface LanguageStat {
  language: string
  count: number
}

export interface GitHubProfile {
  id: string
  userId: string
  githubUsername: string
  name?: string | null
  avatarUrl?: string | null
  bio?: string | null
  location?: string | null
  company?: string | null
  blog?: string | null
  twitterUsername?: string | null
  publicRepos: number
  followers: number
  following: number
  totalStars: number
  topLanguages: LanguageStat[]
  accountCreatedAt?: string | null
  bestPersona?: string | null
  bestPersonaScore?: number | null
  lastRankedAt?: string | null
  lastAnalyzedAt: string
  createdAt: string
  updatedAt: string
}

export interface Pagination {
  page: number
  limit: number
  total: number
  totalPages: number
}

export interface PaginatedProfiles {
  items: GitHubProfile[]
  pagination: Pagination
}

export interface AnalysisRequest {
  id: string
  userId: string
  githubUsername: string
  profileId?: string | null
  status: 'success' | 'failed'
  errorMessage?: string | null
  createdAt: string
}

export type HeatmapPeriod = 'currWeek' | 'currMonth' | 'currYear'

export interface ContributionHeatmap {
  githubUsername: string
  period: HeatmapPeriod
  from: string
  to: string
  totalContributions: number
  days: { date: string; count: number }[]
  includesPrivateContributions?: boolean
  privateContributions?: number
}

export interface CompositionSlice {
  label: string
  count: number
  percentage: number
}

export interface RepoComposition {
  githubUsername: string
  totalRepos: number
  languages: CompositionSlice[]
  technologies: CompositionSlice[]
  frameworks: CompositionSlice[]
  repoTypes: CompositionSlice[]
  includesPrivateRepos?: boolean
  privateRepoCount?: number
}

export type PersonaKey =
  | 'frontend_developer'
  | 'backend_developer'
  | 'fullstack_developer'
  | 'ai_engineer'
  | 'devops_engineer'
  | 'mobile_developer'

export interface MetricBreakdown {
  key: string
  label: string
  score: number
  weight: number
  weightedScore: number
  summary: string
}

export interface PersonaRanking {
  persona: PersonaKey
  personaName: string
  overallScore: number
  grade: string
  breakdown: MetricBreakdown[]
  computedAt: string
}

export interface PersonaSummary {
  key: PersonaKey
  name: string
  description: string
}

export interface RankResult {
  profile: GitHubProfile
  rankings: PersonaRanking[]
  bestMatch: PersonaRanking
  reposAnalyzed: number
  computedAt: string
}

export interface LeaderboardEntry {
  rank: number
  profile: GitHubProfile
  persona: PersonaKey
  personaName: string
  overallScore: number
  grade: string
  computedAt: string
}

export interface LeaderboardResult {
  persona: PersonaKey
  personaName: string
  items: LeaderboardEntry[]
  pagination: Pagination
}

export interface SearchResult extends PaginatedProfiles {
  appliedFilters?: Record<string, unknown>
  persona?: string
  personaName?: string
}
