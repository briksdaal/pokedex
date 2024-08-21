export function processEmptyStringsBody(body) {
  return Object.fromEntries(
    Object.entries(body).map((e) => (e[1] === '' ? [e[0], null] : e))
  );
}
