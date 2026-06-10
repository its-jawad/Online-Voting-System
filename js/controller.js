/* =========================
   ADMIN SIDE
========================= */

// Open Add Candidate Modal
function openModal() {
    document.getElementById("candidateModal").style.display = "flex";
}

// Close Modal
function closeModal() {
    document.getElementById("candidateModal").style.display = "none";
}

/* =========================
   ADMIN – CANDIDATE MANAGEMENT
========================= */

let currentPage = 1;
const candidatesPerPage = 4;

function addCandidate() {
    let name = candidateName.value.trim();
    let party = candidateParty.value.trim();
    let imageInput = document.getElementById("candidateImage");

    if (!name) {
        alert("Candidate name required");
        return;
    }

    if (!imageInput.files || !imageInput.files[0]) {
        alert("Candidate image is required");
        return;
    }

    let file = imageInput.files[0];

    // Image size check (optional safety)
    if (file.size > 2 * 1024 * 1024) {
        alert("Image too large. Please upload image under 2MB");
        return;
    }

    let reader = new FileReader();
    reader.onload = function (e) {

        let img = new Image();
        img.onload = function () {

            let canvas = document.createElement("canvas");
            let ctx = canvas.getContext("2d");

            // Resize dimensions (SAFE for LocalStorage)
            const MAX_WIDTH = 200;
            const MAX_HEIGHT = 200;

            let width = img.width;
            let height = img.height;

            if (width > height) {
                if (width > MAX_WIDTH) {
                    height *= MAX_WIDTH / width;
                    width = MAX_WIDTH;
                }
            } else {
                if (height > MAX_HEIGHT) {
                    width *= MAX_HEIGHT / height;
                    height = MAX_HEIGHT;
                }
            }

            canvas.width = width;
            canvas.height = height;
            ctx.drawImage(img, 0, 0, width, height);

            // Compress image
            let compressedImage = canvas.toDataURL("image/jpeg", 0.7);

            // SAVE CANDIDATE
            candidates.push({
                name: name,
                party: party || "Independent",
                votes: 0,
                image: compressedImage
            });

            localStorage.setItem("candidates", JSON.stringify(candidates));

            candidateName.value = "";
            candidateParty.value = "";
            imageInput.value = "";

            closeModal();
            displayCandidates(currentPage);
        };

        img.src = e.target.result;
    };

    reader.readAsDataURL(file);
}



// COMMON SAVE FUNCTION
function saveCandidate(imageData) {
    candidates.push({
        name: candidateName.value.trim(),
        party: candidateParty.value.trim() || "Independent",
        votes: 0,
        image: imageData
    });

    localStorage.setItem("candidates", JSON.stringify(candidates));

    candidateName.value = "";
    candidateParty.value = "";
    document.getElementById("candidateImage").value = "";

    closeModal();
    displayCandidates(currentPage);
}



// Display Candidates WITH PAGINATION
function displayCandidates(page = 1) {
    let list = document.getElementById("candidateList");
    let total = document.getElementById("totalCandidates");
    let pagination = document.getElementById("pagination");

    if (!list) return;

    currentPage = page;
    list.innerHTML = "";
    pagination.innerHTML = "";

    total.innerText = candidates.length;

    let start = (page - 1) * candidatesPerPage;
    let end = start + candidatesPerPage;
    let paginatedCandidates = candidates.slice(start, end);

    paginatedCandidates.forEach((c, index) => {
        let actualIndex = start + index;

        let div = document.createElement("div");
        div.className = "candidate-card";

        div.innerHTML = `
    <div class="candidate-info">
        <img src="${c.image || 'https://i.pravatar.cc/100'}" class="candidate-img">
        <div>
            <strong>${c.name}</strong><br>
            <small>${c.party}</small>
        </div>
    </div>
    <button class="danger" onclick="deleteCandidate(${actualIndex})">
        Delete
    </button>
`;


        list.appendChild(div);
    });

    setupPagination();
}

// Pagination Buttons
function setupPagination() {
    let pagination = document.getElementById("pagination");
    let pageCount = Math.ceil(candidates.length / candidatesPerPage);

    for (let i = 1; i <= pageCount; i++) {
        let btn = document.createElement("button");
        btn.innerText = i;
        btn.className = i === currentPage ? "active-page" : "";

        btn.onclick = () => displayCandidates(i);
        pagination.appendChild(btn);
    }
}

// Delete Candidate
function deleteCandidate(index) {
    if (!confirm("Delete candidate?")) return;

    candidates.splice(index, 1);
    localStorage.setItem("candidates", JSON.stringify(candidates));

    // Adjust page if last item deleted
    let maxPage = Math.ceil(candidates.length / candidatesPerPage);
    if (currentPage > maxPage) currentPage = maxPage || 1;

    displayCandidates(currentPage);
}


/* =========================
   STUDENT VOTING (NEW UI)
========================= */

let selectedCandidateIndex = null;

function loadVotingUI() {
    let container = document.getElementById("candidates");
    let student = localStorage.getItem("currentStudent");

    if (!container) return;

    container.innerHTML = "";

    // Already voted
    if (votes[student] !== undefined) {
        container.innerHTML = `
            <h3 style="text-align:center;color:#ef4444;">
                You have submit vote
            </h3>
        `;
        document.getElementById("submitVoteBtn").style.display = "none";
        return;
    }

    candidates.forEach((c, i) => {
        container.innerHTML += `
            <div class="vote-card" onclick="selectCandidate(${i})">

                <!-- LEFT : IMAGE + NAME + PARTY -->
                <div class="vote-left">
                    <img src="${c.image}">
                    <div class="vote-text">
                        <strong>${c.name}</strong>
                        <small>${c.party}</small>
                    </div>
                </div>

                <!-- RIGHT : CHECK -->
                <div class="checkmark" id="check-${i}"></div>

            </div>
        `;
    });
}


function selectCandidate(index) {
    selectedCandidateIndex = index;

    document.querySelectorAll(".checkmark").forEach(el => {
        el.classList.remove("active");
    });

    document.getElementById(`check-${index}`).classList.add("active");
}


// Submit Vote
function submitVote() {
    if (selectedCandidateIndex === null) {
        alert("Please select a candidate");
        return;
    }

    let student = localStorage.getItem("currentStudent");

    // Extra safety
    if (votes[student] !== undefined) {
        alert("You have already vote");
        return;
    }

    candidates[selectedCandidateIndex].votes++;
    votes[student] = selectedCandidateIndex;

    localStorage.setItem("candidates", JSON.stringify(candidates));
    localStorage.setItem("votes", JSON.stringify(votes));

    alert("Vote submitted successfully");
    loadVotingUI();
}

let resultCurrentPage = 1;
const resultsPerPage = 2;


/* =========================
   RESULTS (SIMPLE LIST)
========================= */

function showResults() {
    let ul = document.getElementById("results");
    if (!ul) return;

    ul.innerHTML = "";

    candidates.forEach(c => {
        let li = document.createElement("li");
        li.innerText = `${c.name} - ${c.votes} votes`;
        ul.appendChild(li);
    });
}
