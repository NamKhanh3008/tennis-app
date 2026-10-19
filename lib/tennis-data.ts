export type SkillLevel = 'Beginner' | 'Advanced Beginner' | 'Intermediate' | 'Advanced' | 'Competitive'
export type MatchType = 'Casual Rally' | 'Singles Match' | 'Doubles' | 'Practice'
export type PostStatus = 'Open' | 'Matched' | 'Completed' | 'Cancelled'
export type RequestStatus = 'Pending' | 'Accepted' | 'Declined'

export interface TennisUser {
  id: string
  name: string
  major: string
  year: string
  skill: SkillLevel
  style: string
  bio: string
  availability: string
  avatar: string
  video?: string
}

export interface TennisPost {
  id: string
  userId: string
  description: string
  matchType: MatchType
  date: string
  time: string
  location: string
  partnerSkill: string
  notes?: string
  createdAt: string
  status: PostStatus
}

export interface MatchRequest {
  id: string
  postId: string
  fromUserId: string
  toUserId: string
  status: RequestStatus
  createdAt: string
}

export interface TennisNotification {
  id: string
  type: 'interest' | 'accepted' | 'declined' | 'matched' | 'message'
  userId: string
  postId?: string
  requestId?: string
  message: string
  createdAt: string
  unread: boolean
}

export interface TennisMessage {
  id: string
  fromUserId: string
  text: string
  time: string
}

export interface Conversation {
  id: string
  participantId: string
  postId: string
  messages: TennisMessage[]
  unread: number
}

export const currentUserId = 'u1'

export const users: TennisUser[] = [
  { id: 'u1', name: 'Alex Morgan', major: 'Information Systems', year: 'Class of 2027', skill: 'Intermediate', style: 'Baseline player', bio: 'Intermediate tennis player who enjoys long baseline rallies and relaxed singles matches. Always up for meeting new people on court.', availability: 'Weekday evenings and weekends', avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?auto=format&fit=crop&w=900&q=85' },
  { id: 'u2', name: 'Maya Patel', major: 'Mechanical Engineering', year: 'Class of 2028', skill: 'Intermediate', style: 'All-court player', bio: 'Love a good rally and friendly competition. I played in high school and am getting back into it this semester.', availability: 'Tuesday and Thursday after 4 PM', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85' },
  { id: 'u3', name: 'Jordan Lee', major: 'Computer Science', year: 'Class of 2027', skill: 'Advanced', style: 'Aggressive baseline', bio: 'Former high school varsity player looking for consistent practice partners. Happy to play singles or hit drills.', availability: 'Mornings before 10 AM', avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=85' },
  { id: 'u4', name: 'Sofia Ramirez', major: 'Business Administration', year: 'Class of 2029', skill: 'Advanced Beginner', style: 'Learning to rally', bio: 'New to tennis and looking for a patient partner to practice the basics. Usually free on weekends.', availability: 'Weekends, flexible', avatar: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1599586120429-48281b6f0c7d?auto=format&fit=crop&w=900&q=85' },
  { id: 'u5', name: 'Ethan Chen', major: 'Electrical & Computer Engineering', year: 'Class of 2028', skill: 'Competitive', style: 'Serve and volley', bio: 'Competitive player hoping to find someone for focused practice sessions. Courts are best early in the day.', availability: 'Monday, Wednesday mornings', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=900&q=85' },
  { id: 'u6', name: 'Priya Shah', major: 'Human-Computer Interaction', year: 'Class of 2027', skill: 'Intermediate', style: 'Doubles specialist', bio: 'Mostly play doubles but always happy to rally. Looking for a regular weekend group.', availability: 'Friday afternoons and Sundays', avatar: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?auto=format&fit=crop&w=160&h=160&q=80', video: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=900&q=85' },
  { id: 'u7', name: 'Noah Williams', major: 'Robotics', year: 'Class of 2029', skill: 'Beginner', style: 'Casual and curious', bio: 'Just picked up tennis and would love to learn with someone else who is starting out.', availability: 'Most evenings', avatar: 'https://images.unsplash.com/photo-1507591064344-4c6ce005b128?auto=format&fit=crop&w=160&h=160&q=80' },
]

export const initialPosts: TennisPost[] = [
  { id: 'p1', userId: 'u2', description: 'Looking for someone to rally with this Friday! A relaxed hit after a long week sounds perfect.', matchType: 'Casual Rally', date: '2026-10-23', time: '5:00 PM', location: 'CMU Tennis Courts', partnerSkill: 'Beginner to Intermediate', notes: 'I have an extra can of balls.', createdAt: '18 min ago', status: 'Open' },
  { id: 'p2', userId: 'u3', description: 'Anyone up for a competitive singles match this weekend?', matchType: 'Singles Match', date: '2026-10-24', time: '10:00 AM', location: 'Varsity Courts', partnerSkill: 'Advanced to Competitive', notes: 'Best of 3 sets if we have time.', createdAt: '42 min ago', status: 'Open' },
  { id: 'p3', userId: 'u6', description: 'Need two more for doubles on Sunday. All levels welcome!', matchType: 'Doubles', date: '2026-10-25', time: '2:00 PM', location: 'CMU Tennis Courts', partnerSkill: 'Any level', createdAt: '1 hr ago', status: 'Open' },
  { id: 'p4', userId: 'u4', description: 'New to tennis and hoping to practice serves and rally basics with someone patient.', matchType: 'Practice', date: '2026-10-24', time: '3:30 PM', location: 'Schenley Park Courts', partnerSkill: 'Beginner to Intermediate', createdAt: '2 hrs ago', status: 'Open' },
  { id: 'p5', userId: 'u5', description: 'Looking for a strong hitting partner for a focused morning session.', matchType: 'Practice', date: '2026-10-26', time: '8:00 AM', location: 'Varsity Courts', partnerSkill: 'Advanced to Competitive', notes: 'We can work on serves and returns.', createdAt: '3 hrs ago', status: 'Open' },
  { id: 'p6', userId: 'u7', description: 'Would love to find another beginner to learn with. Casual pace, no pressure!', matchType: 'Casual Rally', date: '2026-10-24', time: '6:00 PM', location: 'CMU Tennis Courts', partnerSkill: 'Beginner', createdAt: '5 hrs ago', status: 'Open' },
  { id: 'p7', userId: 'u1', description: 'Anyone free for some evening singles? Looking to get a few sets in.', matchType: 'Singles Match', date: '2026-10-27', time: '6:00 PM', location: 'CMU Tennis Courts', partnerSkill: 'Intermediate', createdAt: 'Yesterday', status: 'Open' },
  { id: 'p9', userId: 'u4', description: 'Looking for a friendly partner to practice serves and get more comfortable with rallies.', matchType: 'Practice', date: '2026-10-29', time: '4:30 PM', location: 'Schenley Park Courts', partnerSkill: 'Beginner to Intermediate', notes: 'Happy to keep it relaxed and work on fundamentals.', createdAt: 'Yesterday', status: 'Open' },
  { id: 'p8', userId: 'u1', description: 'Easy weekend rally — all we need is a court and a fresh can of balls.', matchType: 'Casual Rally', date: '2026-10-17', time: '11:00 AM', location: 'Schenley Park Courts', partnerSkill: 'Beginner to Intermediate', createdAt: 'Last week', status: 'Completed' },
]

export const initialRequests: MatchRequest[] = [
  { id: 'r1', postId: 'p7', fromUserId: 'u5', toUserId: 'u1', status: 'Pending', createdAt: '12 min ago' },
  { id: 'r2', postId: 'p7', fromUserId: 'u7', toUserId: 'u1', status: 'Pending', createdAt: '2 hrs ago' },
]

export const initialNotifications: TennisNotification[] = [
  { id: 'n1', type: 'interest', userId: 'u5', postId: 'p7', requestId: 'r1', message: 'Ethan Chen is interested in your Singles Match post.', createdAt: '12 min ago', unread: true },
  { id: 'n2', type: 'interest', userId: 'u7', postId: 'p7', requestId: 'r2', message: 'Noah Williams is interested in your Singles Match post.', createdAt: '2 hrs ago', unread: true },
  { id: 'n3', type: 'message', userId: 'u3', message: 'Jordan Lee sent you a message.', createdAt: 'Yesterday', unread: false },
  { id: 'n4', type: 'matched', userId: 'u2', message: 'You and Maya Patel are matched for Friday.', createdAt: '2 days ago', unread: false },
]

export const initialConversations: Conversation[] = [
  { id: 'c1', participantId: 'u2', postId: 'p1', unread: 1, messages: [
    { id: 'm1', fromUserId: 'u2', text: 'Hey Alex! Are you still available Friday?', time: '10:14 AM' },
    { id: 'm2', fromUserId: 'u1', text: 'Yep, 5 PM works for me!', time: '10:18 AM' },
    { id: 'm3', fromUserId: 'u2', text: 'Great, let’s meet at the CMU tennis courts.', time: '10:20 AM' },
  ] },
  { id: 'c2', participantId: 'u3', postId: 'p2', unread: 0, messages: [
    { id: 'm4', fromUserId: 'u3', text: 'Want to get a few sets in this weekend?', time: 'Yesterday' },
    { id: 'm5', fromUserId: 'u1', text: 'I’m in. Saturday morning could work.', time: 'Yesterday' },
  ] },
  { id: 'c3', participantId: 'u6', postId: 'p3', unread: 0, messages: [
    { id: 'm6', fromUserId: 'u6', text: 'Do you know anyone else who might want to play doubles?', time: 'Mon' },
  ] },
]
