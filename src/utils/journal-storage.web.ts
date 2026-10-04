// The browser uses localStorage so it does not need SQLite's native setup.
const storage = {
  async getItem(key: string) {
    return localStorage.getItem(key);
  },
  async setItem(key: string, value: string) {
    localStorage.setItem(key, value);
  },
};
export default storage;
