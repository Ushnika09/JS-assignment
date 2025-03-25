// // 🌟 Hero Section Slider Functionality
// const slider = document.querySelector('.slider');
// let currentIndex = 0;

// function showSlide(index) {
//     const slides = document.querySelectorAll('.slide');
//     const totalSlides = slides.length;

//     slides.forEach((slide, i) => {
//         slide.style.transform = `translateX(-${index * 100}%)`;
//     });

//     currentIndex = (index + 1) % totalSlides;
// }

// // Automatically change slides every 4 seconds
// setInterval(() => {
//     showSlide(currentIndex);
// }, 4000);

// 📌 Form Submission Handling
const form = document.querySelector('form');
const table = document.getElementById('records');

// Load students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

document.addEventListener("DOMContentLoaded", function () {
    loadStudents(); // Load records on page load
    form.addEventListener("submit", addStudent);
});

// 🚀 Load existing students
function loadStudents() {
    table.innerHTML = `
        <tr>
            <th>Student Name</th>
            <th>Student ID</th>
            <th>Email ID</th>
            <th>Phone No.</th>
            <th>Actions</th>
        </tr>`;
    students.forEach((student, index) => addToTable(student, index));
}

// 📌 Add student to the table
function addToTable(student, index) {
    let row = table.insertRow();
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
            <button onclick="editStudent(${index})">✏ Edit</button>
            <button onclick="deleteStudent(${index})">🗑 Delete</button>
        </td>`;
}

// 📝 Add Student (With Validation)
function addStudent(event) {
    event.preventDefault();
    let name = document.getElementById("name").value.trim();
    let id = document.getElementById("s_id").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // ✅ Validation
    if (!/^[a-zA-Z\s]+$/.test(name)) return alert("Name must contain only letters!");
    if (!/^\d+$/.test(id)) return alert("Student ID must be a number!");
    if (!/^\d{10}$/.test(phone)) return alert("Phone must be 10 digits!");
    if (!/\S+@\S+\.\S+/.test(email)) return alert("Enter a valid email!");

    let student = { name, id, email, phone };
    students.push(student);
    localStorage.setItem("students", JSON.stringify(students));
    addToTable(student, students.length - 1);
    form.reset();
}

// ❌ Delete Student
function deleteStudent(index) {
    students.splice(index, 1);
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

// ✏ Edit Student
window.editStudent = function (index) {
    let student = students[index];
    document.getElementById("name").value = student.name;
    document.getElementById("s_id").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;
    
    // Remove old record before updating
    deleteStudent(index);
};
