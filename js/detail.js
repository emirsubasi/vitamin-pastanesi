const id = new URLSearchParams(window.location.search).get("id");

if (typeof fetchEmployees === 'function'){
  fetchEmployees(6).then(list => {
    const emp = list.find(e => e.id == id);
    if(emp) document.getElementById("detail").innerHTML = `
      <h4>${emp.name}</h4>
      <p><strong>Görev:</strong> ${emp.role}</p>
    `;
  }).catch(()=>{
    fetch('data/employees.json').then(r=>r.json()).then(data=>{
      const emp = data.find(e => e.id == id);
      if(emp) document.getElementById("detail").innerHTML = `
        <h4>${emp.name}</h4>
        <p><strong>Görev:</strong> ${emp.role}</p>
      `;
    });
  });
} else {
  fetch('data/employees.json').then(r=>r.json()).then(data=>{
    const emp = data.find(e => e.id == id);
    if(emp) document.getElementById("detail").innerHTML = `
      <h4>${emp.name}</h4>
      <p><strong>Görev:</strong> ${emp.role}</p>
    `;
  });
}
