const processes = [];

const pidInput = document.getElementById('pid');
const arrivalInput = document.getElementById('arrival');
const burstInput = document.getElementById('burst');
const tableBody = document.getElementById('processTableBody');
const totalWaitingTimeEl = document.getElementById('totalWaitingTime');
const ganttEl = document.getElementById('gantt');

function computeFCFSWithWaiting(data) {
  const sorted = [...data].sort((a, b) => a.arrival - b.arrival || a.pid - b.pid);
  let currentTime = 0;
  let totalWaiting = 0;

  const detailed = sorted.map((p) => {
    if (currentTime < p.arrival) {
      currentTime = p.arrival;
    }
    const waiting = currentTime - p.arrival;
    totalWaiting += waiting;
    const start = currentTime;
    const end = currentTime + p.burst;
    currentTime = end;
    return { ...p, waiting, start, end };
  });

  return { detailed, totalWaiting };
}

function renderTable(rows) {
  if (rows.length === 0) {
    tableBody.innerHTML = '<tr class="empty-row"><td colspan="4">No processes yet. Add one to begin.</td></tr>';
    return;
  }

  tableBody.innerHTML = rows
    .map((p) => `
      <tr>
        <td>P${p.pid}</td>
        <td>${p.arrival}</td>
        <td>${p.burst}</td>
        <td>${p.waiting ?? '-'}</td>
      </tr>
    `)
    .join('');
}

function renderGantt(rows) {
  if (rows.length === 0) {
    ganttEl.innerHTML = '<span class="block idle">No timeline yet</span>';
    return;
  }

  let html = '';
  let cursor = 0;
  for (const p of rows) {
    if (cursor < p.start) {
      html += `<span class="block idle">Idle ${cursor}→${p.start}</span>`;
    }
    html += `<span class="block">P${p.pid} ${p.start}→${p.end}</span>`;
    cursor = p.end;
  }
  ganttEl.innerHTML = html;
}

function recompute() {
  const { detailed, totalWaiting } = computeFCFSWithWaiting(processes);
  renderTable(detailed);
  renderGantt(detailed);
  totalWaitingTimeEl.textContent = `Total Waiting Time: ${totalWaiting}`;
}

document.getElementById('addProcessBtn').addEventListener('click', () => {
  const pid = Number(pidInput.value);
  const arrival = Number(arrivalInput.value);
  const burst = Number(burstInput.value);

  if (!Number.isInteger(pid) || pid < 1 || !Number.isInteger(arrival) || arrival < 0 || !Number.isInteger(burst) || burst < 1) {
    alert('Please enter valid values: PID >= 1, Arrival >= 0, Burst >= 1');
    return;
  }

  processes.push({ pid, arrival, burst });
  pidInput.value = '';
  arrivalInput.value = '';
  burstInput.value = '';
  recompute();
});

document.getElementById('computeBtn').addEventListener('click', recompute);

document.getElementById('loadExampleBtn').addEventListener('click', () => {
  processes.splice(0, processes.length, { pid: 1, arrival: 0, burst: 5 }, { pid: 2, arrival: 1, burst: 3 }, { pid: 3, arrival: 2, burst: 8 }, { pid: 4, arrival: 3, burst: 6 });
  recompute();
});

document.getElementById('clearBtn').addEventListener('click', () => {
  processes.length = 0;
  totalWaitingTimeEl.textContent = 'Total Waiting Time: 0';
  renderTable([]);
  renderGantt([]);
});

renderTable([]);
renderGantt([]);
