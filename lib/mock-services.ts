import type { MatchRequest, TennisPost } from '@/lib/tennis-data'

export function createPost(post: TennisPost, posts: TennisPost[]) {
  return [post, ...posts]
}

export function createInterestRequest(request: MatchRequest, requests: MatchRequest[]) {
  return [request, ...requests]
}

export function resolveInterest(requests: MatchRequest[], requestId: string, status: 'Accepted' | 'Declined') {
  return requests.map((request) => request.id === requestId ? { ...request, status } : request)
}

export function getUserPosts(posts: TennisPost[], userId: string) {
  return posts.filter((post) => post.userId === userId)
}
