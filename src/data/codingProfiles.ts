import { profile } from './profile'

export const codingProfiles = [
  {
    name: 'LeetCode', handle: 'debugmylife', description: 'Algorithm practice, interview patterns, and problem-solving consistency.', url: profile.leetcode, mark: 'LC', tone: 'amber',
  },
  {
    name: 'Codeforces', handle: 'harshsharma1501', description: 'Competitive programming contests and algorithmic problem solving.', url: profile.codeforces, mark: 'CF', tone: 'blue',
  },
  {
    name: 'Codolio', handle: 'hugsandbugs', description: 'A consolidated view of coding practice and developer profiles.', url: profile.codolio, mark: 'CO', tone: 'violet',
  },
  {
    name: 'GitHub', handle: 'harshgsharma1501', description: 'Source code, project READMEs, and engineering experiments.', url: profile.github, mark: 'GH', tone: 'green',
  },
] as const
