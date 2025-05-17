import { fetchIssues } from '@/lib/github';
import IssueItem from '@/components/IssueItem';

export default async function IssuesPage() {
  const issues = await fetchIssues();

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Issues</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          Total: {issues.length} issues
        </div>
      </div>
      
      <div className="space-y-4">
        {issues.length > 0 ? (
          issues.map((issue) => (
            <IssueItem key={issue.id} issue={issue} />
          ))
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500 dark:text-gray-400">No issues found</p>
          </div>
        )}
      </div>
    </div>
  );
} 