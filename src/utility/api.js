export const fetchWithTimeout = async (url, opt = {}, timeout = 8000) => {
  const controller = new AbortController();
  const { signal } = controller;
  const id = setTimeout(() => controller.abort(), timeout);
  let response = null;
  try {
    response = await fetch(url, { ...opt, mode: 'cors', signal });
  } catch (err) {
    throw new Error(err);
  }
  clearTimeout(id);
  return response;
};
