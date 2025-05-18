import { fetchPullRequests } from '@/lib/github';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface PullRequestPageProps {
  params: {
    number: string;
  };
}

export default async function PullRequestPage({ params }: PullRequestPageProps) {
  const pullRequests = await fetchPullRequests();
  const pr = pullRequests.find(pr => pr.number === parseInt(params.number));

  if (!pr) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/pulls"
          className="text-purple-500 dark:text-purple-400 hover:underline mb-4 inline-block"
        >
          ← Back to Pull Requests
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            #{pr.number} {pr.title}
          </h1>
          <div className="flex items-center space-x-2">
            {pr.draft && (
              <span className="px-3 py-1 text-sm font-medium rounded-full bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200">
                Draft
              </span>
            )}
            <span className={`px-3 py-1 text-sm font-medium rounded-full ${
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

        <div className="flex items-center mb-6">
          <Image
            src={pr.user.avatar_url}
            alt={pr.user.login}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="ml-2 text-gray-600 dark:text-gray-300">{pr.user.login}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500 dark:text-gray-400">
            opened on {format(new Date(pr.created_at), 'MMM d, yyyy')}
          </span>
          {pr.merged_at && (
            <>
              <span className="mx-2 text-gray-400">•</span>
              <span className="text-gray-500 dark:text-gray-400">
                merged on {format(new Date(pr.merged_at), 'MMM d, yyyy')}
              </span>
            </>
          )}
        </div>

        <div className="mb-6 p-3 bg-gray-50 dark:bg-gray-700 rounded-lg text-sm">
          <div className="text-gray-700 dark:text-gray-300">
            {pr.head.ref} → {pr.base.ref}
          </div>
        </div>

        <div className="prose dark:prose-invert max-w-none">
          {pr.body ? (
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {pr.body}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No description provided.</p>
          )}
        </div>
      </div>
    </div>
  );
} 