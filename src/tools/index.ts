export * from './Pos';
export * from './physics';

// Form a compound class name from the provided arguments. Objects
// contribute their keys as class names, but only those keys whose
// values are truthy. Other values are converted to strings using the
// `String` function.
export function classNames(...ns: any[]): string {
  return ns
    .map(n => {
      if (n && typeof n === 'object') {
        return Object.keys(n)
          .filter(k => n[k])
          .join(' ');
      } else {
        return String(n);
      }
    })
    .join(' ');
}
