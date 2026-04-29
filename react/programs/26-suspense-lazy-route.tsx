import {Suspense, lazy} from 'react';

const ReportsPage = lazy(() => import('./27-reports-page'));

export function ReportsRoute() {
  return (
    <Suspense fallback={<p>Loading reports...</p>}>
      <ReportsPage />
    </Suspense>
  );
}
