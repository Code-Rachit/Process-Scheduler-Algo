var algos = [
  "FCFS",
  "SJF",
  "SRTF",
  "Round Robin",
  "Priority NP",
  "Priority P",
  "HRRN"
];

var historyRuns = [];

function $(id) {
  return document.getElementById(id);
}

window.onload = function () {
  init();
};

function init() {
  loadAlgorithms();
  generateRows();
  loadHistory();
  startBackground();
}

function loadAlgorithms() {
  var html = "";
  for (var i = 0; i < algos.length; i++) {
    html += "<option>" + algos[i] + "</option>";
  }
  $("algo").innerHTML = html;
}

function createRow(index, at, bt, pr) {
  return (
    "<div class='row'>" +
    "<input value='P" + index + "'>" +
    "<input type='number' value='" + at + "'>" +
    "<input type='number' value='" + bt + "'>" +
    "<input type='number' value='" + pr + "'>" +
    "<button onclick='removeRow(this)'>X</button>" +
    "</div>"
  );
}

function removeRow(btn) {
  btn.parentNode.remove();
}

function generateRows() {
  var n = parseInt($("n").value, 10);
  if (isNaN(n) || n < 1) n = 1;

  var html = "";
  for (var i = 1; i <= n; i++) {
    html += createRow(i, i - 1, i + 2, i);
  }
  $("inputs").innerHTML = html;
}

function addRow() {
  var count = $("inputs").children.length + 1;
  $("inputs").insertAdjacentHTML(
    "beforeend",
    createRow(count, 0, 1, 1)
  );
}

function readProcesses() {
  var rows = $("inputs").children;
  var arr = [];

  for (var i = 0; i < rows.length; i++) {
    var inputs = rows[i].getElementsByTagName("input");

    arr.push({
      id: inputs[0].value,
      at: parseInt(inputs[1].value, 10),
      bt: parseInt(inputs[2].value, 10),
      pr: parseInt(inputs[3].value, 10),
      rt: parseInt(inputs[2].value, 10),
      ct: null,
      tat: 0,
      wt: 0
    });
  }

  return arr;
}

function run() {
  var algo = $("algo").value;
  var quantum = parseInt($("q").value, 10);
  if (isNaN(quantum) || quantum < 1) quantum = 2;

  var data = readProcesses();
  var result = schedule(data, algo, quantum);

  renderAll(result, algo);

  historyRuns.push({ algo: algo });
  saveHistory();
}

function schedule(arr, algo, q) {
  var t = 0;
  var gantt = [];

  arr.sort(function (a, b) {
    return a.at - b.at;
  });

  while (unfinishedExists(arr)) {
    var ready = getReady(arr, t);

    if (ready.length === 0) {
      t++;
      continue;
    }

    var p = ready[0];

    if (algo === "SJF") {
      ready.sort(function (a, b) {
        return a.bt - b.bt;
      });
      p = ready[0];
    }

    if (algo === "Priority NP") {
      ready.sort(function (a, b) {
        return a.pr - b.pr;
      });
      p = ready[0];
    }

    if (algo === "HRRN") {
      ready.sort(function (a, b) {
        var ra = (t - a.at + a.bt) / a.bt;
        var rb = (t - b.at + b.bt) / b.bt;
        return rb - ra;
      });
      p = ready[0];
    }

    if (algo === "Round Robin") {
      var use = Math.min(q, p.rt);
      gantt.push([p.id, t, t + use]);
      p.rt = p.rt - use;
      t = t + use;

      if (p.rt <= 0) {
        p.ct = t;
      }
      continue;
    }

    if (algo === "SRTF") {
      ready.sort(function (a, b) {
        return a.rt - b.rt;
      });

      p = ready[0];
      gantt.push([p.id, t, t + 1]);
      p.rt--;
      t++;

      if (p.rt <= 0) {
        p.ct = t;
      }
      continue;
    }

    if (algo === "Priority P") {
      ready.sort(function (a, b) {
        return a.pr - b.pr;
      });

      p = ready[0];
      gantt.push([p.id, t, t + 1]);
      p.rt--;
      t++;

      if (p.rt <= 0) {
        p.ct = t;
      }
      continue;
    }

    gantt.push([p.id, t, t + p.bt]);
    t = t + p.bt;
    p.ct = t;
  }

  for (var i = 0; i < arr.length; i++) {
    arr[i].tat = arr[i].ct - arr[i].at;
    arr[i].wt = arr[i].tat - arr[i].bt;
  }

  return {
    arr: arr,
    g: gantt
  };
}

function unfinishedExists(arr) {
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].ct === null) return true;
  }
  return false;
}

function getReady(arr, time) {
  var ready = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i].ct === null && arr[i].at <= time) {
      ready.push(arr[i]);
    }
  }
  return ready;
}

function renderAll(result, algo) {
  renderStats(result.arr, algo);
  renderTable(result.arr);
  renderGantt(result.g);
  renderHistory();
}

function renderStats(arr, algo) {
  var totalWT = 0;
  var totalTAT = 0;
  var totalBT = 0;
  var maxCT = 0;

  for (var i = 0; i < arr.length; i++) {
    totalWT += arr[i].wt;
    totalTAT += arr[i].tat;
    totalBT += arr[i].bt;
    if (arr[i].ct > maxCT) maxCT = arr[i].ct;
  }

  var avgWT = (totalWT / arr.length).toFixed(2);
  var avgTAT = (totalTAT / arr.length).toFixed(2);
  var cpu = ((totalBT / maxCT) * 100).toFixed(0);
  var th = (arr.length / maxCT).toFixed(2);

  $("stats").innerHTML =
    "<div class='cards'>" +
    card("Algorithm", algo) +
    card("Avg WT", avgWT) +
    card("Avg TAT", avgTAT) +
    card("CPU", cpu + "%") +
    card("Throughput", th) +
    "</div>";
}

function card(title, value) {
  return "<div class='card'>" + title + "<h2>" + value + "</h2></div>";
}

function renderTable(arr) {
  var html =
    "<table><tr><th>ID</th><th>AT</th><th>BT</th><th>PR</th><th>CT</th><th>TAT</th><th>WT</th></tr>";

  for (var i = 0; i < arr.length; i++) {
    html +=
      "<tr>" +
      "<td>" + arr[i].id + "</td>" +
      "<td>" + arr[i].at + "</td>" +
      "<td>" + arr[i].bt + "</td>" +
      "<td>" + arr[i].pr + "</td>" +
      "<td>" + arr[i].ct + "</td>" +
      "<td>" + arr[i].tat + "</td>" +
      "<td>" + arr[i].wt + "</td>" +
      "</tr>";
  }

  html += "</table>";
  $("table").innerHTML = html;
}

function renderGantt(g) {
  var html = "";

  for (var i = 0; i < g.length; i++) {
    var width = (g[i][2] - g[i][1]) * 60;

    html +=
      "<div class='bar' style='width:" + width + "px'>" +
      g[i][0] +
      "<br>" +
      g[i][1] +
      "-" +
      g[i][2] +
      "</div>";
  }

  $("gantt").innerHTML = html;
}

function renderHistory() {
  var html = "<h3>Run History</h3>";

  for (var i = 0; i < historyRuns.length; i++) {
    html += "<div class='card'>Run " + (i + 1) + ": " + historyRuns[i].algo + "</div>";
  }

  $("history").innerHTML = html;
}

function compareMode() {
  if (historyRuns.length < 2) {
    alert("Run at least two algorithms first.");
    return;
  }

  var txt = "";
  for (var i = 0; i < historyRuns.length; i++) {
    txt += historyRuns[i].algo;
    if (i < historyRuns.length - 1) txt += " VS ";
  }

  alert(txt);
}

function toggleTheme() {
  document.body.classList.toggle("light");
}

function speakGuide() {
  if (!window.speechSynthesis) {
    alert("Voice not supported.");
    return;
  }

  var msg = new SpeechSynthesisUtterance(
    "Welcome to the professional operating system scheduling simulator, created by IMS Engineering College Students."
  );

  speechSynthesis.cancel();
  speechSynthesis.speak(msg);
}

function exportJSON() {
  downloadFile(
    JSON.stringify(historyRuns, null, 2),
    "report.json",
    "application/json"
  );
}

function exportCSV() {
  var rows = document.querySelectorAll("tr");
  var text = "";

  for (var i = 0; i < rows.length; i++) {
    var cols = rows[i].children;
    var line = [];

    for (var j = 0; j < cols.length; j++) {
      line.push(cols[j].innerText);
    }

    text += line.join(",") + "\n";
  }

  downloadFile(text, "report.csv", "text/csv");
}

function downloadFile(content, name, type) {
  var a = document.createElement("a");
  a.href = URL.createObjectURL(new Blob([content], { type: type }));
  a.download = name;
  a.click();
}

function saveHistory() {
  localStorage.setItem("os_history", JSON.stringify(historyRuns));
}

function loadHistory() {
  var data = localStorage.getItem("os_history");
  if (data) {
    historyRuns = JSON.parse(data);
  }
  renderHistory();
}

function startBackground() {
  var canvas = $("bg");
  var ctx = canvas.getContext("2d");

  function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  resize();
  window.onresize = resize;

  var particles = [];

  for (var i = 0; i < 80; i++) {
    particles.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      v: 1 + Math.random() * 2
    });
  }

  function animate() {
    ctx.fillStyle = "rgba(8,17,31,0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    for (var i = 0; i < particles.length; i++) {
      particles[i].y += particles[i].v;

      if (particles[i].y > canvas.height) {
        particles[i].y = 0;
      }

      ctx.beginPath();
      ctx.arc(particles[i].x, particles[i].y, 2, 0, Math.PI * 2);
      ctx.fillStyle = "#60a5fa";
      ctx.fill();
    }

    requestAnimationFrame(animate);
  }

  animate();
}