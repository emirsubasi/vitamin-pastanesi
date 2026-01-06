// api.js
// Provides `fetchEmployees(count)` which returns a Promise resolving
// to an array of employees in the same format as data/employees.json
// Tries randomuser.me first; on failure falls back to local data/employees.json

(function(window){
  const DEFAULT_ROLES = ["Usta","Kasiyer","Paketleme"];

  function pickRole(i){
    return DEFAULT_ROLES[i % DEFAULT_ROLES.length];
  }

  async function fetchEmployees(count = 6){
    const url = `https://randomuser.me/api/?results=${encodeURIComponent(count)}`;
    try {
      const res = await fetch(url);
      if(!res.ok) throw new Error('randomuser fetch failed');
      const j = await res.json();
      if(!j.results || !Array.isArray(j.results)) throw new Error('invalid randomuser response');

      const mapped = j.results.map((r, idx) => ({
        id: idx + 1,
        name: `${r.name.first} ${r.name.last}`,
        role: pickRole(idx),
        photo: r.picture && (r.picture.large || r.picture.medium || r.picture.thumbnail) || ''
      }));
      return mapped;
    } catch (err) {
      // fallback to local mock data
      try {
        const local = await fetch('data/employees.json').then(r => r.json());
        return local;
      } catch(e){
        // final fallback: empty array
        console.error('Both remote and local employee data failed', err, e);
        return [];
      }
    }
  }

  window.fetchEmployees = fetchEmployees;
})(window);
