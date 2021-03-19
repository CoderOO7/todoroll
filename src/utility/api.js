export const fetchWithTimeout = async (url, opt = {}, timeout) => {
  const controller = new AbortController();
  const { signal } = controller;
  const id = setTimeout(() => controller.abort(), timeout);
  const response = await fetch(url, { ...opt, mode: 'cors', signal });
  clearTimeout(id);
  return response;
};
