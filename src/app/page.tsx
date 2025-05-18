import Link from 'next/link';
import { fetchIssues, fetchPullRequests } from '@/lib/github';

export default async function HomePage() {
  const [issues, pullRequests] = await Promise.all([
    fetchIssues(),
    fetchPullRequests()
  ]);

  // PR과 Issue를 구분하기 위해 타입 필드 추가
  const issuesWithType = issues.map(issue => ({ ...issue, type: 'issue' }));
  const prsWithType = pullRequests.map(pr => ({ ...pr, type: 'pr' }));

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">GitHub Dashboard</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Link href="/issues" className="block">
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Issues</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Track and manage issues</p>
              <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full text-sm font-medium">
                {issues.length}
              </span>
            </div>
          </div>
        </Link>

        <Link href="/pulls" className="block">
          <div className="border dark:border-gray-700 rounded-lg p-6 bg-white dark:bg-gray-800 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">Pull Requests</h2>
            <div className="flex items-center justify-between">
              <p className="text-gray-600 dark:text-gray-300">Review code changes</p>
              <span className="px-3 py-1 bg-purple-100 dark:bg-purple-900 text-purple-800 dark:text-purple-100 rounded-full text-sm font-medium">
                {pullRequests.length}
              </span>
            </div>
          </div>
        </Link>
      </div>

      <div className="mt-12">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h2>
        <div className="border dark:border-gray-700 rounded-lg divide-y divide-gray-200 dark:divide-gray-700 bg-white dark:bg-gray-800">
          {[...issuesWithType, ...prsWithType]
            .sort((a, b) => new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime())
            .slice(0, 5)
            .map(item => (
              <div key={item.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-700">
                <div className="flex items-center space-x-2">
                  <span className={`w-2 h-2 rounded-full ${
                    item.type === 'pr'
                      ? 'bg-purple-500'
                      : 'bg-blue-500'
                  }`} />
                  <Link
                    href={item.type === 'pr' ? `/pulls/${item.number}` : `/issues/${item.number}`}
                    className="text-gray-900 dark:text-white hover:text-gray-600 dark:hover:text-gray-300"
                  >
                    #{item.number} {item.title}
                  </Link>
                </div>
              </div>
            ))}
        </div>
      </div>
    </div>
  );
}
