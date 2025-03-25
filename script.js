// // 🌟 Hero Section Slider Functionality
// const slides = document.querySelectorAll('.slide');
// let currentIndex = 0;

// function showSlide() {
//     slides.forEach((slide, i) => {
//         slide.style.display = i === currentIndex ? "block" : "none";
//     });
//     currentIndex = (currentIndex + 1) % slides.length;
// }

// // Automatically change slides every 4 seconds
// setInterval(showSlide, 4000);
// showSlide(); // Show first slide immediately

// 📌 Form Submission Handling
const form = document.querySelector('form');
const table = document.getElementById('records');
const submitBtn = document.querySelector("button[type='submit']");

// Load students from localStorage
let students = JSON.parse(localStorage.getItem("students")) || [];

// 🚀 DOM Content Loaded
document.addEventListener("DOMContentLoaded", () => {
    loadStudents();
    form.addEventListener("submit", handleFormSubmit);
});

// ✅ Load existing students into the table
function loadStudents() {
    table.querySelectorAll("tr:not(:first-child)").forEach(row => row.remove());
    students.forEach((student, index) => addToTable(student, index));
}

// 📌 Add a student to the table
function addToTable(student, index) {
    let row = table.insertRow();
    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.id}</td>
        <td>${student.email}</td>
        <td>${student.phone}</td>
        <td>
            <button class="edit-btn" data-index="${index}">✏ Edit</button>
            <button class="delete-btn" data-index="${index}">🗑 Delete</button>
        </td>`;
}

// ✅ Update localStorage and reload the table
function updateStorageAndLoad() {
    localStorage.setItem("students", JSON.stringify(students));
    loadStudents();
}

// 🔎 Validate form inputs
function validateInputs(name, id, email, phone) {
    if (!/^[a-zA-Z\s]+$/.test(name)) return "Name must contain only letters!";
    if (!/^\d+$/.test(id)) return "Student ID must be a number!";
    if (!/^\d{10}$/.test(phone)) return "Phone must be 10 digits!";
    if (!/\S+@\S+\.\S+/.test(email)) return "Enter a valid email!";
    return null;
}

// 📝 Handle form submission
function handleFormSubmit(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let id = document.getElementById("s_id").value.trim();
    let email = document.getElementById("email").value.trim();
    let phone = document.getElementById("phone").value.trim();

    // Validate inputs
    let error = validateInputs(name, id, email, phone);
    if (error) return alert(error);

    let student = { name, id, email, phone };

    if (submitBtn.dataset.editIndex) {
        // Remove the old entry and add the updated entry to the end
        students.splice(submitBtn.dataset.editIndex, 1);
        students.push(student);
        delete submitBtn.dataset.editIndex;
    } else {
        // Add new student
        students.push(student);
    }

    updateStorageAndLoad();
    form.reset();

    // Reset button text and style
    submitBtn.textContent = "Submit";
    submitBtn.style.background = "#007bff";
}


// ❌ Delete a student
function deleteStudent(index) {
    if (confirm("Are you sure you want to delete this student?")) {
        students.splice(index, 1);
        updateStorageAndLoad();
    }
}

// ✏ Edit a student
function editStudent(index) {
    let student = students[index];

    // Populate form with selected student details
    document.getElementById("name").value = student.name;
    document.getElementById("s_id").value = student.id;
    document.getElementById("email").value = student.email;
    document.getElementById("phone").value = student.phone;

    // Update submit button
    submitBtn.textContent = "Update Student";
    submitBtn.style.background = "#ffa500";
    submitBtn.dataset.editIndex = index;
}

// 🖱️ Event Delegation for Edit & Delete Buttons
table.addEventListener("click", (event) => {
    if (event.target.classList.contains("edit-btn")) {
        editStudent(event.target.dataset.index);
    } else if (event.target.classList.contains("delete-btn")) {
        deleteStudent(event.target.dataset.index);
    }
});
