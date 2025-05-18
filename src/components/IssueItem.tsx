'use client';

import { GitHubIssue } from '@/lib/types/github';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface IssueItemProps {
  issue: GitHubIssue;
}

export default function IssueItem({ issue }: IssueItemProps) {
  return (
    <Link href={`/issues/${issue.number}`}>
      <div className="border dark:border-gray-700 rounded-lg p-4 mb-4 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              #{issue.number} {issue.title}
            </h3>
            <div className="mt-1 flex items-center space-x-2">
              <div className="flex items-center">
                <Image
                  src={issue.user.avatar_url}
                  alt={issue.user.login}
                  width={20}
                  height={20}
                  className="rounded-full"
                />
                <span className="ml-2 text-sm text-gray-600 dark:text-gray-300">{issue.user.login}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">
                opened on {format(new Date(issue.created_at), 'MMM d, yyyy')}
              </span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <span className={`px-2 py-1 text-xs font-medium rounded-full ${
              issue.state === 'open' 
                ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100' 
                : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
            }`}>
              {issue.state}
            </span>
            {issue.labels.map((label) => (
              <span
                key={label.name}
                className="px-2 py-1 text-xs font-medium rounded-full"
                style={{
                  backgroundColor: `#${label.color}`,
                  color: parseInt(label.color, 16) > 0x7FFFFF ? '#000' : '#fff'
                }}
              >
                {label.name}
              </span>
            ))}
          </div>
        </div>
        {issue.body && (
          <div className="mt-2 text-sm text-gray-700 dark:text-gray-300 line-clamp-3">
            {issue.body}
          </div>
        )}
        <div className="mt-2 text-sm text-gray-500 dark:text-gray-400">
          {issue.comments} comments
        </div>
      </div>
    </Link>
  );
} 