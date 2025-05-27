export function debounce(fn: () => void, ms: number) {
  let timeout: ReturnType<typeof setTimeout>;

  return () => {
    clearTimeout(timeout);
    timeout = setTimeout(fn, ms);
  };
}
