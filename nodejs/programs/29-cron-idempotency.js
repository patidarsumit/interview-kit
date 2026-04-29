const completedRuns = new Set();

export async function runDailyReport({date, generateReport}) {
  const key = `daily-report:${date}`;

  if (completedRuns.has(key)) {
    return {status: 'already-completed'};
  }

  await generateReport(date);
  completedRuns.add(key);

  return {status: 'completed'};
}

