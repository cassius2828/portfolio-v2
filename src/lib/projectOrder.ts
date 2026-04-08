/** Featured project title to pin first in grids (matches DB `title`). */
const LINEUP_LEGENDS_TITLE = "Lineup Legends";

/**
 * Puts Lineup Legends first; keeps relative order of all other projects.
 */
export function withLineupLegendsFirst<T extends { title: string }>(
  projects: T[],
): T[] {
  const idx = projects.findIndex((p) => p.title === LINEUP_LEGENDS_TITLE);
  if (idx <= 0) return projects;

  const next = [...projects];
  const [lineup] = next.splice(idx, 1);
  return lineup ? [lineup, ...next] : projects;
}
