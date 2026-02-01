// เริ่มต้น AOS Library (Animation on Scroll)
AOS.init({
    once: true, // ทำงานครั้งเดียวตอนเลื่อนลง
    offset: 100, // ระยะห่างก่อนทำงาน
});

// --- Scroll Progress Bar ---
window.onscroll = function() {
    scrollFunction();
    updateProgressBar();
    runCounters();
};

function updateProgressBar() {
    var winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    document.getElementById("myBar").style.width = scrolled + "%";
}

// --- Sticky Navbar & Back to Top ---
const navbar = document.getElementById("navbar");
const backToTop = document.getElementById("backToTop");

function scrollFunction() {
    if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
        navbar.classList.add("sticky");
        backToTop.style.display = "block";
    } else {
        navbar.classList.remove("sticky");
        backToTop.style.display = "none";
    }
}

// --- Number Counter Animation (รันเมื่อเลื่อนมาเจอ) ---
let counted = false;
function runCounters() {
    const section = document.querySelector('.parallax-section');
    const position = section.getBoundingClientRect().top;
    const screenPosition = window.innerHeight;

    if (position < screenPosition && !counted) {
        const counters = document.querySelectorAll('.counter');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const inc = target / 100;
            
            const updateCount = () => {
                const count = +counter.innerText;
                if(count < target) {
                    counter.innerText = Math.ceil(count + inc);
                    setTimeout(updateCount, 20);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
        });
        counted = true;
    }
}

// --- User Score Logic (LocalStorage) ---
document.addEventListener("DOMContentLoaded", () => {
    const score = localStorage.getItem("aiNexusScore");
    const statusDiv = document.getElementById("navUserStatus");
    const ctaDiv = document.getElementById("ctaScoreDisplay");

    if (score) {
        // อัพเดทปุ่มใน Navbar
        statusDiv.innerHTML = `
            <div style="text-align:right">
                <span style="color:var(--primary); font-size:0.8rem">คะแนนล่าสุด</span><br>
                <span style="font-weight:bold; font-size:1.1rem">${score}/15</span>
            </div>
        `;
        
        // อัพเดทหน้า CTA
        ctaDiv.innerHTML = `<h3 style="color:#00f2ff; margin:10px 0;">🎉 ผลการทดสอบล่าสุดของคุณ: ${score} / 15</h3>`;
    }
});

// --- Modal Logic ---
const modal = document.getElementById("aboutModal");
const btn = document.getElementById("aboutBtn");
const span = document.getElementsByClassName("close-modal")[0];

btn.onclick = () => modal.style.display = "block";
span.onclick = () => modal.style.display = "none";
window.onclick = (e) => {
    if (e.target == modal) modal.style.display = "none";
}

function toggleCard(clickedCard) {
    // 1. หา Card ทั้งหมดในหน้านั้น
    const allCards = document.querySelectorAll('.tech-card');

    // 2. วนลูปเช็คทีละใบ
    allCards.forEach(card => {
        // ถ้า Card นี้คือใบที่เรากด
        if (card === clickedCard) {
            // ให้สลับสถานะ (ถ้าเปิดอยู่ก็ปิด ถ้าปิดอยู่ก็เปิด)
            card.classList.toggle('active');
        } else {
            // ใบอื่นๆ สั่งปิดให้หมด (Remove class active)
            card.classList.remove('active');
        }
    });
}

// ===== Hamburger Menu Toggle =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

// Toggle menu เมื่อคลิก hamburger
hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// ปิด menu เมื่อคลิกที่ลิงก์
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// ปิด menu เมื่อคลิกนอกพื้นที่
document.addEventListener('click', (e) => {
    if (!hamburger.contains(e.target) && !navMenu.contains(e.target)) {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// ===== Sticky Navbar =====
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.classList.add('sticky');
    } else {
        navbar.classList.remove('sticky');
    }
});

// ===== Progress Bar =====
window.addEventListener('scroll', () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    document.querySelector('.progress-bar').style.width = scrollPercent + '%';
});

