import { fetchPullRequests } from '@/lib/github';
import PullRequestItem from '@/components/PullRequestItem';
import Link from 'next/link';

export default async function PullRequestsPage() {
  const pullRequests = await fetchPullRequests();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/"
          className="text-purple-500 dark:text-purple-400 hover:underline mb-4 inline-block"
        >
          ← Back to Dashboard
        </Link>
      </div>

      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Pull Requests</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {pullRequests.length} pull requests
        </div>
      </div>
      
      <div className="space-y-4">
        {pullRequests.length > 0 ? (
          pullRequests.map((pr) => (
            <PullRequestItem key={pr.id} pr={pr} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No pull requests found</p>
          </div>
        )}
      </div>
    </div>
  );
} 