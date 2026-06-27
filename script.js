let map;

function updateClock() {
  document.getElementById("clock").textContent =
    new Date().toLocaleTimeString();
}

async function fetchData() {
  const res = await fetch(`${CONFIG.api}?stop=${CONFIG.stopName}&route=${CONFIG.route}`);
  const data = await res.json();

  document.getElementById("stopName").textContent = CONFIG.stopName;

  if (data.next.length > 0) {
    document.getElementById("next1Min").textContent = data.next[0].mins + " 分鐘";
    document.getElementById("next1Time").textContent = data.next[0].time;
  }

  if (data.next.length > 1) {
    document.getElementById("next2Min").textContent = data.next[1].mins + " 分鐘";
    document.getElementById("next2Time").textContent = data.next[1].time;
  }

  document.getElementById("lastUpdate").textContent =
    new Date().toLocaleTimeString();
}

function refresh() {
  fetchData();
}

setInterval(updateClock, 1000);
setInterval(fetchData, CONFIG.refreshInterval);

updateClock();
fetchData();
