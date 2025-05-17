import { Octokit } from '@octokit/rest';
import { GitHubIssue, GitHubPullRequest } from './types/github';

const octokit = new Octokit({
  auth: process.env.NEXT_PUBLIC_GITHUB_TOKEN,
});

const OWNER = process.env.NEXT_PUBLIC_GITHUB_OWNER || '';
const REPO = process.env.NEXT_PUBLIC_GITHUB_REPO || '';

export async function fetchIssues(): Promise<GitHubIssue[]> {
  try {
    const response = await octokit.rest.issues.listForRepo({
      owner: OWNER,
      repo: REPO,
      state: 'all',
      per_page: 100,
    });
    
    return response.data
      .filter(issue => !('pull_request' in issue))
      .map(issue => ({
        id: issue.id,
        number: issue.number,
        title: issue.title,
        state: issue.state as 'open' | 'closed',
        user: {
          login: issue.user?.login || '',
          avatar_url: issue.user?.avatar_url || '',
        },
        created_at: issue.created_at,
        updated_at: issue.updated_at,
        body: issue.body || '',
        comments: issue.comments,
        labels: issue.labels.map(label => ({
          name: typeof label === 'string' ? label : label.name || '',
          color: typeof label === 'string' ? '' : label.color || '',
        })),
      }));
  } catch (error) {
    console.error('Error fetching issues:', error);
    return [];
  }
}

export async function fetchPullRequests(): Promise<GitHubPullRequest[]> {
  try {
    const response = await octokit.rest.pulls.list({
      owner: OWNER,
      repo: REPO,
      state: 'all',
      per_page: 100,
    });
    
    return response.data.map(pr => ({
      id: pr.id,
      number: pr.number,
      title: pr.title,
      state: pr.state as 'open' | 'closed',
      user: {
        login: pr.user?.login || '',
        avatar_url: pr.user?.avatar_url || '',
      },
      created_at: pr.created_at,
      updated_at: pr.updated_at,
      body: pr.body || '',
      comments_url: pr.comments_url,
      draft: pr.draft || false,
      merged_at: pr.merged_at,
      base: {
        ref: pr.base.ref,
      },
      head: {
        ref: pr.head.ref,
      },
    }));
  } catch (error) {
    console.error('Error fetching pull requests:', error);
    return [];
  }
} 