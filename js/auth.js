// ---------- STUDENT ----------
function registerStudent() {
    let u = su.value, e = se.value, p = sp.value, cp = scp.value;

    if (!u || !e || !p || !cp) return alert("Fill all fields");
    if (p !== cp) return alert("Passwords do not match");

    if (students.find(s => s.username === u || s.email === e))
        return alert("User already exists");

    students.push(new Student(u, e, p));
    localStorage.setItem("students", JSON.stringify(students));
    alert("Registered successfully");
    showLogin();
}

function loginStudent() {
    let user = students.find(s => s.email === lu.value && s.password === lp.value);
    if (!user) return alert("Invalid login");

    localStorage.setItem("currentStudent", user.username);
    window.location.href = "student.html";
}

// ---------- ADMIN ----------
function registerAdmin() {
    let u = au.value, e = ae.value, p = ap.value, cp = acp.value;

    if (!u || !e || !p || !cp) return alert("Fill all fields");
    if (p !== cp) return alert("Passwords do not match");

    if (admins.find(a => a.username === u || a.email === e))
        return alert("Admin exists");

    admins.push(new Admin(u, e, p));
    localStorage.setItem("admins", JSON.stringify(admins));
    alert("Admin registered");
    showAdminLogin();
}

function loginAdmin() {
    let admin = admins.find(a => a.email === alu.value && a.password === alp.value);
    if (!admin) return alert("Invalid admin");

    localStorage.setItem("adminLogged", admin.username);
    window.location.href = "admin.html";
}

// ---------- PROTECTION ----------
function protectStudent() {
    if (!localStorage.getItem("currentStudent"))
        location.href = "student-auth.html";
}

function protectAdmin() {
    if (!localStorage.getItem("adminLogged"))
        location.href = "admin-auth.html";
}

// ---------- TOGGLE ----------
function showRegister(){loginBox.style.display="none";registerBox.style.display="block";}
function showLogin(){registerBox.style.display="none";loginBox.style.display="block";}
function showAdminRegister(){adminLoginBox.style.display="none";adminRegisterBox.style.display="block";}
function showAdminLogin(){adminRegisterBox.style.display="none";adminLoginBox.style.display="block";}
