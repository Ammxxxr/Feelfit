import {
  getExerciseName,
  formatDuration,
  getThisWeekWorkouts,
  getTotalTimeSeconds,
  getMostFrequentExercise,
} from './helpers';

describe('getExerciseName', () => {
  const allExercises = [
    { id: 'ex1', name: 'Bench Press', category: 'Chest' },
    { id: 'ex2', name: 'Squat', category: 'Legs' },
  ];

  test('returns the matching exercise name', () => {
    expect(getExerciseName('ex1', allExercises)).toBe('Bench Press');
  });

  test('returns fallback text when id is not found', () => {
    expect(getExerciseName('does-not-exist', allExercises)).toBe('Unknown exercise');
  });

  test('returns fallback text for an empty exercise list', () => {
    expect(getExerciseName('ex1', [])).toBe('Unknown exercise');
  });
});

describe('formatDuration', () => {
  test('formats zero seconds', () => {
    expect(formatDuration(0)).toBe('00:00');
  });

  test('formats seconds under a minute', () => {
    expect(formatDuration(45)).toBe('00:45');
  });

  test('formats minutes and seconds', () => {
    expect(formatDuration(65)).toBe('01:05');
  });

  test('formats durations over an hour without wrapping (MM can exceed 59)', () => {
    expect(formatDuration(3661)).toBe('61:01');
  });
});

describe('getThisWeekWorkouts', () => {
  test('includes a workout from today', () => {
    const today = new Date().toISOString();
    const workouts = [{ id: 'w1', date: today, exercises: [] }];
    expect(getThisWeekWorkouts(workouts)).toHaveLength(1);
  });

  test('excludes a workout from 10 days ago', () => {
    const tenDaysAgo = new Date(Date.now() - 10 * 24 * 60 * 60 * 1000).toISOString();
    const workouts = [{ id: 'w1', date: tenDaysAgo, exercises: [] }];
    expect(getThisWeekWorkouts(workouts)).toHaveLength(0);
  });

  test('returns an empty array when given no workouts', () => {
    expect(getThisWeekWorkouts([])).toEqual([]);
  });
});

describe('getTotalTimeSeconds', () => {
  test('sums durationSeconds across workouts', () => {
    const workouts = [
      { durationSeconds: 100 },
      { durationSeconds: 200 },
      { durationSeconds: 50 },
    ];
    expect(getTotalTimeSeconds(workouts)).toBe(350);
  });

  test('treats a missing durationSeconds as zero instead of crashing', () => {
    const workouts = [{ durationSeconds: 100 }, {}];
    expect(getTotalTimeSeconds(workouts)).toBe(100);
  });

  test('returns 0 for an empty list', () => {
    expect(getTotalTimeSeconds([])).toBe(0);
  });
});

describe('getMostFrequentExercise', () => {
  test('picks the exercise that appears most across workouts', () => {
    const workouts = [
      { exercises: [{ exerciseId: 'ex1' }, { exerciseId: 'ex2' }] },
      { exercises: [{ exerciseId: 'ex1' }] },
    ];
    expect(getMostFrequentExercise(workouts)).toEqual({ exerciseId: 'ex1', count: 2 });
  });

  test('returns null/0 when there are no workouts', () => {
    expect(getMostFrequentExercise([])).toEqual({ exerciseId: null, count: 0 });
  });

  test('handles a workout with no exercises array without crashing', () => {
    const workouts = [{}];
    expect(getMostFrequentExercise(workouts)).toEqual({ exerciseId: null, count: 0 });
  });

  test('on an exact tie, keeps whichever exercise was counted first', () => {
    const workouts = [
      { exercises: [{ exerciseId: 'ex1' }, { exerciseId: 'ex2' }] },
    ];
    expect(getMostFrequentExercise(workouts)).toEqual({ exerciseId: 'ex1', count: 1 });
  });
});