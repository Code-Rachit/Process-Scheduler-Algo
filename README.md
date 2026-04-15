# Process-Scheduler-Algo
🚀 **OS Scheduling Simulator** – Interactive **CPU Scheduling Visualizer** built with **HTML, CSS & JavaScript**. Supports **FCFS, SJF, SRTF, Round Robin, Priority & HRRN** with **metrics, Gantt Chart, compare mode, exports, history, themes, voice guide, and responsive UI**. Ideal for **OS labs & mini projects**.

# 🚀 OS Scheduling Simulator – Professional CPU Scheduling Visualizer

# LIVE PROJECT LINK - https://process-scheduler-imsec.netlify.app

A highly interactive, visually rich, and educational **Operating System Project** developed for B.Tech CSE students to simulate and compare major **CPU Scheduling Algorithms** in real time.

This project transforms theoretical scheduling concepts into a practical visual experience through dynamic process tables, automatic calculations, performance metrics, animated Gantt charts, export tools, and a modern responsive UI.

Designed to help students, faculty, and learners better understand how processes are executed by the CPU under different scheduling strategies.

---

# 🎯 Project Objective

In Operating Systems, CPU Scheduling is one of the most important topics, but many students find it difficult to understand through theory alone.

This simulator solves that challenge by allowing users to:

* Enter custom process data
* Run multiple scheduling algorithms
* View execution order visually
* Compare performance metrics
* Analyze waiting and turnaround times
* Export results
* Learn scheduling practically

---

# 🛠️ Tech Stack

* **HTML5** – Structure and layout
* **CSS3** – Styling, glassmorphism UI, animations, responsiveness
* **JavaScript (Vanilla JS)** – Scheduling logic, calculations, DOM updates, export features, storage, interactivity

---

# 📌 Implemented CPU Scheduling Algorithms

## 1. FCFS (First Come First Serve)

Processes execute in order of arrival.

## 2. SJF (Shortest Job First)

Selects the process with minimum burst time.

## 3. SRTF (Shortest Remaining Time First)

Preemptive version of SJF.

## 4. Round Robin

Uses time quantum for fair CPU sharing.

## 5. Priority Non-Preemptive

Highest priority process runs fully before next process.

## 6. Priority Preemptive

Higher priority process can interrupt current execution.

## 7. HRRN (Highest Response Ratio Next)

Selects process using response ratio formula.

---

# ✨ Key Functionalities

## 🔹 Process Input System

* Dynamic process count selector
* Auto-generate process rows
* Add new processes manually
* Remove any process instantly
* Editable fields:

  * Process ID
  * Arrival Time
  * Burst Time
  * Priority
* Quantum input for Round Robin

## 🔹 Automatic Calculations

For every process:

* Completion Time (CT)
* Turnaround Time (TAT)
* Waiting Time (WT)

Formulas:

* **TAT = CT - AT**
* **WT = TAT - BT**

## 🔹 Performance Metrics Dashboard

* Average Waiting Time
* Average Turnaround Time
* CPU Utilization (%)
* Throughput
* Active algorithm display

## 🔹 Gantt Chart Visualizer

* Real-time generated timeline
* Colored execution blocks
* Process labels
* Start and end times
* Duration-based block width

## 🔹 Compare & History

* Stores previously executed runs
* Compare algorithms quickly
* Review past simulations

## 🔹 Export Tools

* Export results as **JSON**
* Export results as **CSV**

## 🔹 Theme & UX

* Dark Theme
* Light Theme Toggle
* Responsive design for desktop/mobile
* Animated background particles
* Hover effects and modern UI

## 🔹 Voice Guide

* Browser Speech Synthesis integration
* Audio intro for users

## 🔹 Local Storage

* Saves run history even after refresh

---

# 🖥️ User Interface Sections

1. Header with college branding and controls
2. Process Configuration Panel
3. Process Entry Table
4. Metrics Dashboard
5. Results Table
6. Animated Gantt Chart
7. Run History Section
8. Footer Credits

---

# 📂 Project Structure

```text
OS-Scheduling-Simulator/
│── index.html
│── style.css
│── script.js
│── ims-logo.png
```

---

# ▶️ How to Run Locally

1. Download or clone the repository
2. Keep all files in the same folder
3. Add logo file as `ims-logo.png`
4. Open `index.html` in browser

No installation required.

---

# 🎓 Academic Value

This project is ideal for:

* B.Tech / BCA / MCA Operating System Lab
* CPU Scheduling Demonstration
* Viva Presentations
* Practical Learning
* Mini Projects
* GitHub Portfolio

---

# 📈 Future Enhancements

* Real-time graph analytics
* Multi-core CPU simulation
* Ready queue visualization
* Process state transitions
* Database result storage
* User authentication
* Online deployment dashboard

---

# 👨‍💻 Credits

**Built by Rachit Sharma**
**In guidance of Ms. Neha Rani**

---

# 🌟 Why This Project Stands Out

Unlike basic simulators, this project combines:

* Strong algorithm implementation
* Real calculations
* Attractive UI/UX
* Visualization tools
* Export utilities
* Responsive design
* Educational usability

A complete blend of logic + design + learning.

---

# 🙏 Closing Note

This project reflects the practical application of Operating System concepts through creativity, coding, and problem solving.

Radhey Radhey ✨

