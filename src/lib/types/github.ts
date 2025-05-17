export interface GitHubUser {
  login: string;
  avatar_url: string;
}

export interface GitHubLabel {
  name: string;
  color: string;
}

export interface GitHubIssue {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  body: string;
  comments: number;
  labels: GitHubLabel[];
}

export interface GitHubPullRequest {
  id: number;
  number: number;
  title: string;
  state: 'open' | 'closed';
  user: GitHubUser;
  created_at: string;
  updated_at: string;
  body: string;
  comments_url: string;
  draft: boolean;
  merged_at: string | null;
  base: {
    ref: string;
  };
  head: {
    ref: string;
  };
} 