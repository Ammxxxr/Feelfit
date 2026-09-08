export function getExerciseName(id, allExercises) {
  const found = allExercises.find((e) => e.id === id);
  return found ? found.name : 'Unknown exercise';
}

export function formatDuration(totalSeconds) {
  const m = Math.floor(totalSeconds / 60);
  const s = totalSeconds % 60;
  return `${String(m).padStart(2, '0')}:${String(s).padStart(2, '0')}`;
}

export function getThisWeekWorkouts(workouts) {
  const now = new Date();
  const dayOfWeek = now.getDay();
  const startOfWeek = new Date(now);
  startOfWeek.setDate(now.getDate() - dayOfWeek);
  startOfWeek.setHours(0, 0, 0, 0);
  return workouts.filter((w) => new Date(w.date) >= startOfWeek);
}

export function getTotalTimeSeconds(workouts) {
  return workouts.reduce((sum, w) => sum + (w.durationSeconds || 0), 0);
}

export function getMostFrequentExercise(workouts) {
  const counts = {};
  workouts.forEach((w) => {
    (w.exercises || []).forEach((e) => {
      counts[e.exerciseId] = (counts[e.exerciseId] || 0) + 1;
    });
  });
  let topId = null;
  let topCount = 0;
  Object.entries(counts).forEach(([id, count]) => {
    if (count > topCount) {
      topId = id;
      topCount = count;
    }
  });
  return { exerciseId: topId, count: topCount };
}