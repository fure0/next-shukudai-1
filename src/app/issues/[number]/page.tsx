import { fetchIssues } from '@/lib/github';
import { notFound } from 'next/navigation';
import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';

interface IssuePageProps {
  params: {
    number: string;
  };
}

export default async function IssuePage({ params }: IssuePageProps) {
  const issues = await fetchIssues();
  const issue = issues.find(issue => issue.number === parseInt(params.number));

  if (!issue) {
    notFound();
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-6">
        <Link 
          href="/issues"
          className="text-blue-500 dark:text-blue-400 hover:underline mb-4 inline-block"
        >
          ← Back to Issues
        </Link>
      </div>

      <div className="bg-white dark:bg-gray-800 border dark:border-gray-700 rounded-lg p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            #{issue.number} {issue.title}
          </h1>
          <span className={`px-3 py-1 text-sm font-medium rounded-full ${
            issue.state === 'open'
              ? 'bg-green-100 dark:bg-green-900 text-green-800 dark:text-green-100'
              : 'bg-red-100 dark:bg-red-900 text-red-800 dark:text-red-100'
          }`}>
            {issue.state}
          </span>
        </div>

        <div className="flex items-center mb-6">
          <Image
            src={issue.user.avatar_url}
            alt={issue.user.login}
            width={24}
            height={24}
            className="rounded-full"
          />
          <span className="ml-2 text-gray-600 dark:text-gray-300">{issue.user.login}</span>
          <span className="mx-2 text-gray-400">•</span>
          <span className="text-gray-500 dark:text-gray-400">
            opened on {format(new Date(issue.created_at), 'MMM d, yyyy')}
          </span>
        </div>

        {issue.labels.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {issue.labels.map(label => (
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
        )}

        <div className="prose dark:prose-invert max-w-none">
          {issue.body ? (
            <div className="whitespace-pre-wrap text-gray-700 dark:text-gray-300">
              {issue.body}
            </div>
          ) : (
            <p className="text-gray-500 dark:text-gray-400 italic">No description provided.</p>
          )}
        </div>

        <div className="mt-6 pt-6 border-t dark:border-gray-700">
          <div className="text-gray-500 dark:text-gray-400">
            {issue.comments} comments
          </div>
        </div>
      </div>
    </div>
  );
} 