'use client';

import { GitHubPullRequest } from '@/lib/types/github';
import { format } from 'date-fns';
import Image from 'next/image';

interface PullRequestItemProps {
  pr: GitHubPullRequest;
}

export default function PullRequestItem({ pr }: PullRequestItemProps) {
  return (
    <div className="border dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700">
      <div className="flex items-start justify-between">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            #{pr.number} {pr.title}
          </h3>
          <div className="mt-1 flex items-center space-x-2">
            <div className="flex items-center">
              <Image
                src={pr.user.avatar_url}
                alt={pr.user.login}
                width={20}
                height={20}
                className="rounded-full"
              />
              <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{pr.user.login}</span>
            </div>
            <span className="text-sm text-gray-500 dark:text-gray-400">
              opened on {format(new Date(pr.created_at), 'MMM d, yyyy')}
            </span>
          </div>
          <div className="mt-1 text-sm text-gray-600 dark:text-gray-300">
            {pr.head.ref} → {pr.base.ref}
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {pr.draft && (
            <span className="px-2 py-1 text-xs font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
              Draft
            </span>
          )}
          <span className={`px-2 py-1 text-xs font-medium rounded-full ${
            pr.state === 'open'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
              : pr.merged_at
              ? 'bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
          }`}>
            {pr.merged_at ? 'Merged' : pr.state}
          </span>
        </div>
      </div>
      {pr.body && (
        <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
          {pr.body}
        </div>
      )}
    </div>
  );
} 