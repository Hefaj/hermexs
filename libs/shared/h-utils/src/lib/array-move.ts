/**
 * Przesuń element tablicy z pozycji `from` na pozycję `to`.
 * Funkcja modyfikuje tablicę **in-place** i zwraca referencję do niej.
 *
 * @example
 * const arr = ['a', 'b', 'c', 'd'];
 * arrayMove(arr, 1, 3);     // arr === ['a', 'c', 'd', 'b']
 */
export function arrayMove<T>(array: T[], from: number, to: number): T[] {
  if (from === to) return array;

  const len = array.length;
  const start = ((from % len) + len) % len;   // pozwala na ujemne indeksy
  const end   = ((to   % len) + len) % len;

  const [item] = array.splice(start, 1);
  array.splice(end, 0, item);

  return array;
}
