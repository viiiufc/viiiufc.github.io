
const form = document.getElementById("registrationForm");
const photoInput = document.getElementById("photo");
const photoPreview = document.getElementById("photoPreview");

let uploadedPhoto = "";

// PHOTO PREVIEW AND VALIDATION
photoInput.addEventListener("change", function () {
    const file = this.files[0];

    if (!file) return;

    const validTypes = ["image/jpeg", "image/png"];
    const maxSize = 50 * 1024 * 1024;

    if (!validTypes.includes(file.type)) {
        alert("Please upload a PNG or JPG image.");
        this.value = "";
        photoPreview.style.display = "none";
        return;
    }

    if (file.size >= maxSize) {
        alert("Photo must be less than 50 MB.");
        this.value = "";
        photoPreview.style.display = "none";
        return;
    }

    const reader = new FileReader();

    reader.onload = function (event) {
        uploadedPhoto = event.target.result;
        photoPreview.src = uploadedPhoto;
        photoPreview.style.display = "block";
    };

    reader.readAsDataURL(file);
});

// GENERATE REGISTRATION NUMBER
function generateRegistrationNumber() {
    const year = new Date().getFullYear();

    let number = Number(
        localStorage.getItem("VIIIUFC_COUNTER") || 0
    );

    number++;

    localStorage.setItem("VIIIUFC_COUNTER", number);

    return "VIIIUFC-" + year + "-" +
        String(number).padStart(4, "0");
}

// SUBMIT REGISTRATION
form.addEventListener("submit", function (event) {
    event.preventDefault();

    if (!form.reportValidity()) return;

    if (!uploadedPhoto) {
        alert("Please upload your photograph.");
        return;
    }

    const registrationID = generateRegistrationNumber();

    const student = {
        name: document.getElementById("name").value.trim(),
        mobile: document.getElementById("mobile").value.trim(),
        section: document.getElementById("section").value,
        roll: document.getElementById("roll").value,
        photo: uploadedPhoto,
        registration: registrationID,
        date: new Date().toLocaleDateString("en-GB")
    };

    // Display registration information
    document.getElementById("regNumber").textContent =
        student.registration;

    document.getElementById("outName").textContent =
        student.name;

    document.getElementById("outMobile").textContent =
        student.mobile;

    document.getElementById("outSection").textContent =
        student.section;

    document.getElementById("outRoll").textContent =
        student.roll;

    document.getElementById("outDate").textContent =
        student.date;

    document.getElementById("outPhoto").src =
        student.photo;

    // Save current registration temporarily
    window.currentRegistration = student;

    document.getElementById("formSection").hidden = true;
    document.getElementById("resultSection").hidden = false;

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
});

// SAVE AS PDF
function downloadPDF() {
    if (!window.currentRegistration) return;

    window.print();
}

// SEND TO CEO
function sendToCEO() {
    const student = window.currentRegistration;

    if (!student) return;

    // CHANGE THIS TO THE CEO'S EMAIL ADDRESS
    const CEO_EMAIL = "your-ceo-email@example.com";

    const subject = encodeURIComponent(
        "VIIIUFC Registration - " + student.registration
    );

    const body = encodeURIComponent(
        "VIIIUFC STUDENT REGISTRATION\n\n" +
        "Registration Number: " + student.registration + "\n" +
        "Name: " + student.name + "\n" +
        "Mobile: " + student.mobile + "\n" +
        "Section: " + student.section + "\n" +
        "Roll Number: " + student.roll + "\n" +
        "Registration Date: " + student.date + "\n\n" +
        "Please find the registration document attached manually."
    );

    window.location.href =
        "mailto:" + CEO_EMAIL +
        "?subject=" + subject +
        "&body=" + body;

    alert(
        "Your email application will open. " +
        "Please attach the saved PDF and send the email."
    );
}
