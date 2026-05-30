import { api } from './client'
import type {
  ApiResponse,
  PaginatedProfiles,
  GitHubProfile,
  AnalysisRequest,
  ContributionHeatmap,
  HeatmapPeriod,
  PersonaSummary,
  RankResult,
  PersonaRanking,
  LeaderboardResult,
  SearchResult,
  PersonaKey,
  Pagination,
  RepoComposition,
} from '@/types'

export async function analyzeProfile(username: string) {
  const { data } = await api.post<ApiResponse<GitHubProfile>>(`/profiles/analyze/${username}`)
  return data.data
}

export async function getProfiles(page = 1, limit = 12) {
  const { data } = await api.get<ApiResponse<PaginatedProfiles>>('/profiles', {
    params: { page, limit },
  })
  return data.data
}

export async function getProfile(username: string) {
  const { data } = await api.get<ApiResponse<GitHubProfile>>(`/profiles/${username}`)
  return data.data
}

export async function getAnalysisRequests(page = 1, limit = 10) {
  const { data } = await api.get<
    ApiResponse<{ items: AnalysisRequest[]; pagination: Pagination }>
  >('/profiles/requests', { params: { page, limit } })
  return data.data
}

export async function searchProfiles(params: Record<string, string | number | undefined>) {
  const { data } = await api.get<ApiResponse<SearchResult>>('/profiles/search', { params })
  return data.data
}

export async function getHeatmap(username: string, period: HeatmapPeriod) {
  const { data } = await api.get<ApiResponse<ContributionHeatmap>>(
    `/profiles/${username}/heatmap`,
    { params: { period } }
  )
  return data.data
}

export async function getRepoComposition(username: string) {
  const { data } = await api.get<ApiResponse<RepoComposition>>(
    `/profiles/${username}/composition`
  )
  return data.data
}

export async function getPersonas() {
  const { data } = await api.get<ApiResponse<PersonaSummary[]>>('/profiles/personas')
  return data.data
}

export async function rankProfile(username: string) {
  const { data } = await api.post<ApiResponse<RankResult>>(`/profiles/rank/${username}`)
  return data.data
}

export async function getProfileRankings(username: string) {
  const { data } = await api.get<
    ApiResponse<{ profile: GitHubProfile; rankings: PersonaRanking[]; bestMatch: PersonaRanking }>
  >(`/profiles/${username}/rankings`)
  return data.data
}

export async function getLeaderboard(persona: PersonaKey, page = 1, limit = 10, minScore?: number) {
  const { data } = await api.get<ApiResponse<LeaderboardResult>>('/profiles/rankings/leaderboard', {
    params: { persona, page, limit, minScore },
  })
  return data.data
}
