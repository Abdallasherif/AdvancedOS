# 🚀 AdvancedOS — FCFS CPU Scheduling Visualizer

Welcome to a **cool and interactive** implementation of the **First-Come, First-Served (FCFS)** CPU Scheduling Algorithm! 🎯

This project includes:
- 🌐 A modern web UI for adding processes and visualizing scheduling.
- 📊 Automatic waiting-time calculation for each process.
- ⏱️ A Gantt-style timeline to see execution order.
- 🐍 A Python reference implementation for quick CLI checks.

---

## ✨ Features

- ➕ Add processes with:
  - Process ID
  - Arrival Time
  - Burst Time
- 🧪 Load sample input instantly
- 🧹 Clear/reset all processes
- ✅ Compute **Total Waiting Time** using FCFS
- 📈 See per-process waiting times in a table
- 🧭 Visual execution timeline with idle gaps

---

## 🧠 FCFS in One Line

In **FCFS**, processes run in the order they arrive — no preemption, just a queue-based first-come-first-run strategy. 🥇

---

## 🗂️ Project Structure

```text
.
├── index.html          # UI layout
├── styles.css          # Styling (dark modern theme)
├── app.js              # Front-end FCFS logic + rendering
├── fcfs_scheduling.py  # Python FCFS waiting-time helper
└── README.md
```

---

## ▶️ Run the Web App Locally

You can serve the app with Python:

```bash
python3 -m http.server 8000
```

Then open:

👉 `http://localhost:8000/index.html`

---

## 🐍 Run the Python Version

```bash
python3 fcfs_scheduling.py
```

Example output:

```text
Total Waiting Time:23
```

---

## 🧪 Example Input

Processes:

```text
(1, 0, 5), (2, 1, 3), (3, 2, 8), (4, 3, 6)
```

Expected total waiting time:

```text
23
```

---

## 💡 How Waiting Time is Calculated

For each process in FCFS order:
1. CPU time moves forward (or jumps if CPU is idle).
2. Waiting time = `start_time - arrival_time`.
3. Total waiting time = sum of all individual waiting times.

---

## 🛠️ Tech Stack

- HTML5
- CSS3
- Vanilla JavaScript
- Python 3

---

## 🌟 Why this project is awesome

Because learning OS scheduling should feel **visual, intuitive, and fun** 😎

If you like it, give it a ⭐ on GitHub!
