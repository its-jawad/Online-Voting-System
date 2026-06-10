/* =========================
   RESULT STATE
========================= */

let resultCurrentPage = 1;
const resultsPerPage = 2;

/* =========================
   LOAD RESULTS
========================= */

function loadResults() {
    let names = candidates.map(c => c.name);
    let votes = candidates.map(c => c.votes);

    drawLineChart(names, votes);
    showCandidateList(1);
}

/* =========================
   LINE CHART
========================= */

function drawLineChart(labels, data) {
    new Chart(document.getElementById("lineChart"), {
        type: "line",
        data: {
            labels: labels,
            datasets: [{
                label: "Votes",
                data: data,
                borderColor: "#5b8cff",
                backgroundColor: "rgba(91,140,255,0.2)",
                tension: 0.3,
                fill: true,
                pointRadius: 5
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: { beginAtZero: true }
            }
        }
    });
}

/* =========================
   CANDIDATE LIST + PAGINATION
========================= */

function showCandidateList(page = 1) {

    let box = document.getElementById("resultList");
    let pagination = document.getElementById("resultPagination");

    if (!box || !pagination) return;

    resultCurrentPage = page;
    box.innerHTML = "";
    pagination.innerHTML = "";

    if (candidates.length === 0) return;

    /* ---------- PAGINATION SLICE ---------- */
    let start = (page - 1) * resultsPerPage;
    let end = start + resultsPerPage;
    let paginatedCandidates = candidates.slice(start, end);

    /* ---------- TOTAL & MAX ---------- */
    let totalVotes = candidates.reduce((sum, c) => sum + c.votes, 0);
    let maxVotes = Math.max(...candidates.map(c => c.votes));

    /* ---------- RENDER ROWS ---------- */
    paginatedCandidates.forEach(c => {

        let percentage = totalVotes === 0
            ? 0
            : ((c.votes / totalVotes) * 100).toFixed(0);

        let statusText = "Lose";
        let statusClass = "lose";

        if (maxVotes > 0 && c.votes === maxVotes) {
            statusText = "Won";
            statusClass = "won";
        }

        if (maxVotes === 0) {
            statusText = "—";
            statusClass = "";
        }

        box.innerHTML += `
            <div class="candidate-row">

                <div class="candidate-info">
                    <img src="${c.image}" />
                    <span>${c.name}</span>
                </div>

                <div class="candidate-votes">
                    ${c.votes}
                </div>

                <div class="candidate-percent">
                    ${percentage}%
                </div>

                <div class="candidate-badge ${statusClass}">
                    ${statusText}
                </div>

            </div>
        `;
    });

    /* ---------- PAGINATION BUTTONS ---------- */
    let pageCount = Math.ceil(candidates.length / resultsPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.className = i === resultCurrentPage ? "active-page" : "";
        btn.onclick = () => showCandidateList(i);
        pagination.appendChild(btn);
    }
}
