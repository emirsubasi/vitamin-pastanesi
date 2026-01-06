const listEl = document.getElementById("employee-list");
const searchInput = document.getElementById("searchInput");
const roleFilter = document.getElementById("roleFilter");

let employees = [];

if (typeof fetchEmployees === 'function') {
  fetchEmployees(6)
    .then(data => {
      employees = data;
      render(employees);
    })
    .catch(() => {
      document.getElementById("alertArea").innerHTML = `
        <div class="alert alert-warning">
          Canlı API erişilemiyor, örnek veri gösteriliyor.
        </div>
      `;
    });
} else {
  // fallback if api.js not loaded for some reason
  fetch("data/employees.json")
    .then(r => r.json())
    .then(data => {
      employees = data;
      render(employees);
    })
    .catch(() => {
      document.getElementById("alertArea").innerHTML = `
        <div class="alert alert-warning">
          Veri yüklenemedi.
        </div>
      `;
    });
}

function render(data) {
  listEl.innerHTML = "";
  data.forEach(e => {
    listEl.innerHTML += `
      <div class="col-md-3 mb-4">
        <div class="card shadow h-100">
          <img src="${e.photo}" class="card-img-top">
          <div class="card-body">
            <h5 class="card-title">${e.name}</h5>
            <span class="badge bg-primary">${e.role}</span>
            <div class="progress my-2" style="height:6px">
              <div class="progress-bar bg-success" style="width:70%"></div>
            </div>
            <a href="detail.html?id=${e.id}" class="btn btn-warning w-100">Detay</a>
          </div>
          <div class="card-footer text-muted text-center">
            Aktif Personel
          </div>
        </div>
      </div>
    `;
  });
}

function filter() {
  const q = searchInput.value.toLowerCase();
  const r = roleFilter.value;

  render(
    employees.filter(e =>
      e.name.toLowerCase().includes(q) &&
      (r === "" || e.role === r)
    )
  );
}

searchInput.addEventListener("input", filter);
roleFilter.addEventListener("change", filter);
