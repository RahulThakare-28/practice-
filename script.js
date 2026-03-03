// Sample data for results table
const examResults = [
    { id: 1, name: 'Rahul Sharma', exam: 'Mathematics', marks: 85, status: 'Pass' },
    { id: 2, name: 'Anita Verma', exam: 'Physics', marks: 42, status: 'Fail' },
    { id: 3, name: 'Mohit Singh', exam: 'Chemistry', marks: 76, status: 'Pass' },
    { id: 4, name: 'Pooja Mehta', exam: 'Biology', marks: 59, status: 'Pass' },
    { id: 5, name: 'Priya Kumar', exam: 'Mathematics', marks: 92, status: 'Pass' },
    { id: 6, name: 'Arjun Patel', exam: 'Physics', marks: 38, status: 'Fail' }
];

const students = [
    { id: 1, name: 'Rahul Sharma', email: 'rahul@example.com' },
    { id: 2, name: 'Anita Verma', email: 'anita@example.com' },
    { id: 3, name: 'Mohit Singh', email: 'mohit@example.com' }
];

const exams = [
    { id: 1, name: 'Mathematics', date: '2024-03-15', questions: 50 },
    { id: 2, name: 'Physics', date: '2024-03-16', questions: 40 },
    { id: 3, name: 'Chemistry', date: '2024-03-17', questions: 45 }
];

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    renderTable();
    renderStudents();
    renderExams();
    setupSearch();
});

// Switch between sections
function switchSection(sectionName, e) {
    e.preventDefault();

    // Hide all sections
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });

    // Show selected section
    document.getElementById(sectionName).classList.add('active');

    // Update sidebar active state (desktop)
    document.querySelectorAll('.sidebar .nav-link').forEach(link => {
        link.classList.remove('active');
    });
    event.target.closest('a').classList.add('active');

    // Close mobile menu if open
    const offcanvas = document.getElementById('sidebarMenu');
    const bsOffcanvas = bootstrap.Offcanvas.getInstance(offcanvas);
    if (bsOffcanvas) {
        bsOffcanvas.hide();
    }
}

// Render exam results table
function renderTable() {
    const tbody = document.querySelector('#resultsTable tbody');
    tbody.innerHTML = '';

    examResults.forEach(result => {
        const row = document.createElement('tr');
        row.className = 'table-row';
        row.innerHTML = `
            <td>${result.name}</td>
            <td>${result.exam}</td>
            <td>${result.marks}</td>
            <td><span class="badge ${result.status === 'Pass' ? 'bg-success' : 'bg-danger'}">${result.status}</span></td>
            <td>
                <button class="btn btn-sm btn-info btn-action" onclick="editResult(${result.id})"><i class="bi bi-pencil"></i></button>
                <button class="btn btn-sm btn-danger btn-action" onclick="deleteResult(${result.id})"><i class="bi bi-trash"></i></button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

// Render students list
function renderStudents() {
    const studentsList = document.getElementById('studentsList');
    studentsList.innerHTML = '';

    students.forEach(student => {
        const item = document.createElement('div');
        item.className = 'list-group-item d-flex justify-content-between align-items-center';
        item.innerHTML = `
            <div>
                <h5 class="mb-1">${student.name}</h5>
                <p class="mb-0 text-muted">${student.email}</p>
            </div>
            <div>
                <button class="btn btn-sm btn-info btn-action" onclick="viewStudent(${student.id})"><i class="bi bi-eye"></i></button>
                <button class="btn btn-sm btn-danger btn-action" onclick="removeStudent(${student.id})"><i class="bi bi-trash"></i></button>
            </div>
        `;
        studentsList.appendChild(item);
    });
}

// Render exams list
function renderExams() {
    const examsList = document.getElementById('examsList');
    examsList.innerHTML = '';

    exams.forEach(exam => {
        const card = document.createElement('div');
        card.className = 'col-12 col-sm-6 col-lg-4 mb-3';
        card.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${exam.name}</h5>
                    <p class="card-text">
                        <small class="text-muted">Date: ${exam.date}</small><br>
                        <small class="text-muted">Questions: ${exam.questions}</small>
                    </p>
                    <button class="btn btn-sm btn-primary" onclick="editExam(${exam.id})"><i class="bi bi-pencil"></i> Edit</button>
                    <button class="btn btn-sm btn-danger" onclick="removeExam(${exam.id})"><i class="bi bi-trash"></i> Delete</button>
                </div>
            </div>
        `;
        examsList.appendChild(card);
    });
}

// Setup search functionality
function setupSearch() {
    const searchInput = document.getElementById('searchInput');
    if (searchInput) {
        searchInput.addEventListener('keyup', function() {
            const searchTerm = this.value.toLowerCase();
            const rows = document.querySelectorAll('#resultsTable tbody tr');

            rows.forEach(row => {
                const text = row.innerText.toLowerCase();
                row.style.display = text.includes(searchTerm) ? '' : 'none';
            });
        });
    }
}

// Show stat detail modal
function showStatDetail(title, value, description) {
    document.getElementById('statTitle').innerText = title;
    document.getElementById('statValue').innerText = value;
    document.getElementById('statDesc').innerText = description;
    document.getElementById('statDetail').classList.add('show');
    document.querySelector('.overlay').classList.add('show');
}

// Close stat detail modal
function closeStatDetail() {
    document.getElementById('statDetail').classList.remove('show');
    document.querySelector('.overlay').classList.remove('show');
}

// Table actions
function editResult(id) {
    const result = examResults.find(r => r.id === id);
    alert(`Editing result for ${result.name}`);
}

function deleteResult(id) {
    if (confirm('Are you sure you want to delete this result?')) {
        examResults.splice(examResults.findIndex(r => r.id === id), 1);
        renderTable();
        showNotification('Result deleted successfully!');
    }
}

// Student actions
function viewStudent(id) {
    const student = students.find(s => s.id === id);
    alert(`Viewing ${student.name}'s profile`);
}

function removeStudent(id) {
    if (confirm('Are you sure you want to remove this student?')) {
        students.splice(students.findIndex(s => s.id === id), 1);
        renderStudents();
        showNotification('Student removed successfully!');
    }
}

function addNewStudent() {
    const name = prompt('Enter student name:');
    if (name) {
        const newStudent = {
            id: Math.max(...students.map(s => s.id)) + 1,
            name: name,
            email: name.toLowerCase().replace(' ', '.') + '@example.com'
        };
        students.push(newStudent);
        renderStudents();
        showNotification(`Student ${name} added successfully!`);
    }
}

// Exam actions
function editExam(id) {
    const exam = exams.find(e => e.id === id);
    alert(`Editing exam: ${exam.name}`);
}

function removeExam(id) {
    if (confirm('Are you sure you want to delete this exam?')) {
        exams.splice(exams.findIndex(e => e.id === id), 1);
        renderExams();
        showNotification('Exam deleted successfully!');
    }
}

function addNewExam() {
    const name = prompt('Enter exam name:');
    if (name) {
        const newExam = {
            id: Math.max(...exams.map(e => e.id)) + 1,
            name: name,
            date: new Date().toISOString().split('T')[0],
            questions: 50
        };
        exams.push(newExam);
        renderExams();
        showNotification(`Exam ${name} created successfully!`);
    }
}

// Settings
function saveSettings() {
    showNotification('Settings saved successfully!');
}

// Notification helper
function showNotification(message) {
    const toast = document.createElement('div');
    toast.className = 'alert alert-success alert-dismissible fade show';
    toast.setAttribute('role', 'alert');
    toast.style.cssText = 'position: fixed; top: 20px; right: 20px; z-index: 9999; min-width: 300px;';
    toast.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.remove(), 3000);
}
