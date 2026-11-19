
// SEND REGISTRATION TO CEO VIA WHATSAPP
function sendToCEO() {
    const student = window.currentRegistration;

    if (!student) {
        alert("Please complete your registration first!");
        return;
    }

    // CEO WhatsApp number (Bangladesh)
    const CEO_NUMBER = "8801946432569";

    const message = `
╔════════════════════════════╗
       ⚽ VIIIUFC FOOTBALL ⚽
╚════════════════════════════╝

🎓 VIIIUFC REGISTRATION
📩 APPROVAL REQUEST

👋 Hello CEO!

I have successfully completed my registration for VIIIUFC.

📋 STUDENT INFORMATION

🆔 Registration ID: ${student.registration}

👤 Full Name: ${student.name}

📱 Mobile Number: ${student.mobile}

🏫 Section: ${student.section}

🔢 Roll Number: ${student.roll}

📅 Registration Date: ${student.date}

━━━━━━━━━━━━━━━━━━━━━━━━

📢 APPROVAL REQUEST

Dear CEO,

I kindly request you to review my registration details and approve my application for VIIIUFC.

I am eagerly waiting for your confirmation!

Thank you for your time and support. 🙏

━━━━━━━━━━━━━━━━━━━━━━━━
⚽ VIIIUFC FOOTBALL CLUB
🏆 PLAY • COMPETE • WIN
    `.trim();

    const whatsappURL =
        "https://wa.me/" + CEO_NUMBER +
        "?text=" + encodeURIComponent(message);

    window.open(whatsappURL, "_blank");
}
