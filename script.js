let books = [
    { id: 101, title: "The Great Gatsby", author: "F. Scott Fitzgerald", status: "Available" },
    { id: 102, title: "Physics Vol. 1", author: "H.C. Verma", status: "Borrowed" },
    { id: 103, title: "Clean Code", author: "Robert C. Martin", status: "Available" },
    { id: 104, title: "Introduction to Algorithms", author: "Cormen", status: "Available" }
];


function handleLogin() {
    const user = document.getElementById("username").value;
    const pass = document.getElementById("password").value;
    const errorMsg = document.getElementById("error-msg");

    if (user === "admin" && pass === "123") {
        // Success
        document.getElementById("login-container").style.display = "none";
        document.getElementById("sidebar").style.display = "flex";
        document.getElementById("main-content").style.display = "block";
        initDashboard();
    } else {
        errorMsg.style.display = "block";
    }
}

function logout() {
    location.reload(); 
}


function showSection(sectionId) {
    // Hide all sections
    document.querySelectorAll('.section').forEach(sec => sec.classList.remove('active'));

    // Remove active class from nav items
    document.querySelectorAll('.nav-item').forEach(item => item.classList.remove('active'));
    

    // Show selected section
    document.getElementById(sectionId).classList.add('active');
    
    // Highlight sidebar item (Note: This relies on the click event)
    // To ensure the correct sidebar item is highlighted, we need to match the ID
    const navItems = document.querySelectorAll('.nav-item');
    if (sectionId === 'dashboard') navItems[0].classList.add('active');
    if (sectionId === 'library') navItems[1].classList.add('active');
    if (sectionId === 'students') navItems[2].classList.add('active');
}


function initDashboard() {
    renderLibrary();
    document.getElementById("total-books-count").innerText = books.length;
}

function renderLibrary(filterText = "") {
    const tbody = document.getElementById("library-body");
    tbody.innerHTML = "";

    books.forEach((book, index) => {
        if (book.title.toLowerCase().includes(filterText.toLowerCase()) || 
            book.author.toLowerCase().includes(filterText.toLowerCase())) {
            
            const badgeClass = book.status === "Available" ? "available" : "borrowed";
            const btnText = book.status === "Available" ? "Borrow" : "Return";
            const btnColor = book.status === "Available" ? "#3498db" : "#e67e22";

            const row = `
                <tr>
                    <td>#${book.id}</td>
                    <td><b>${book.title}</b></td>
                    <td>${book.author}</td>
                    <td><span class="status-badge ${badgeClass}">${book.status}</span></td>
                    <td>
                        <button onclick="toggleBookStatus(${index})" style="background:${btnColor}; color:white; border:none; padding:5px 10px; border-radius:3px; cursor:pointer;">
                            ${btnText}
                        </button>
                    </td>
                </tr>
            `;
            tbody.innerHTML += row;
        }
    });
}

function toggleBookStatus(index) {
    if (books[index].status === "Available") {
        books[index].status = "Borrowed";
    } else {
        books[index].status = "Available";
    }
    renderLibrary(); 
}

function filterBooks() {
    const searchText = document.getElementById("bookSearch").value;
    renderLibrary(searchText);
}

function addBookPrompt() {
    const title = prompt("Enter Book Title:");
    const author = prompt("Enter Author Name:");
    if (title && author) {
        books.push({
            id: 100 + books.length + 1,
            title: title,
            author: author,
            status: "Available"
        });
        renderLibrary();
        document.getElementById("total-books-count").innerText = books.length;
    }
}