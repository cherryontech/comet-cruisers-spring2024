// Search.js

export const filterJournalEntries = (entries, searchTerm) => {
  if (!searchTerm) return entries;

  return entries.filter((entry) => entry.title.toLowerCase().includes(searchTerm.toLowerCase()));
};
