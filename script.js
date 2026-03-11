// ─────────────────────────────────────────────
// SUPABASE SETUP
// ─────────────────────────────────────────────
const supabaseUrl = "https://cymvypibhvsbyjkkijio.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bXZ5cGliaHZzYnlqa2tpamlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwODE4NzUsImV4cCI6MjA4ODY1Nzg3NX0.p9QYlVGKS0iJii3fMR0UtT5M1kqzPZCRpNTApXuXz1Y";
const db = supabase.createClient(supabaseUrl, supabaseKey);


// ─────────────────────────────────────────────
// EMAIL VALIDATION
// ─────────────────────────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}


// ─────────────────────────────────────────────
// SHARED SUBMIT LOGIC  (used by both forms)
// ─────────────────────────────────────────────
async function submitEmail(email, formWrapId, successMsgId, btnId) {
  const btn = document.getElementById(btnId);

  // Disable button while request is in flight
  btn.disabled = true;
  btn.textContent = "Joining…";

  try {
    // Check for duplicate entry
    const { data, error: fetchError } = await db
      .from("waitlist")
      .select("email")
      .eq("email", email);

    if (fetchError) throw fetchError;

    if (data && data.length > 0) {
      showToast("You're already on the waitlist! 🎉");
      btn.disabled = false;
      btn.textContent = btnId === "joinBtn1" ? "Get Early Access →" : "Join Now →";
      return;
    }

    // Insert new email
    const { error } = await db.from("waitlist").insert([{ email }]);
    if (error) throw error;

    // Success — hide form, show message
    document.getElementById(formWrapId).style.display = "none";
    const msg = document.getElementById(successMsgId);
    msg.style.display = "block";
    msg.innerHTML = "🎉 You're on the list! We'll reach out soon with early access.";

  } catch (err) {
    console.error(err);
    showToast("Something went wrong. Please try again.");
    btn.disabled = false;
    btn.textContent = btnId === "joinBtn1" ? "Get Early Access →" : "Join Now →";
  }
}


// ─────────────────────────────────────────────
// FORM 1  (Hero section)
// ─────────────────────────────────────────────
async function handleJoin() {
  const input = document.getElementById("emailInput");
  const email = input.value.trim();

  if (!isValidEmail(email)) {
    input.classList.add("error");
    setTimeout(() => input.classList.remove("error"), 600);
    return;
  }

  await submitEmail(email, "formWrap", "successMsg", "joinBtn1");
}


// ─────────────────────────────────────────────
// FORM 2  (Final CTA section)
// ─────────────────────────────────────────────
async function handleJoin2() {
  const input = document.getElementById("emailInput2");
  const email = input.value.trim();

  if (!isValidEmail(email)) {
    input.classList.add("error");
    setTimeout(() => input.classList.remove("error"), 600);
    return;
  }

  await submitEmail(email, "formWrap2", "successMsg2", "joinBtn2");
}

// Enter key support for both inputs
document.getElementById("emailInput").addEventListener("keydown",  e => { if (e.key === "Enter") handleJoin(); });
document.getElementById("emailInput2").addEventListener("keydown", e => { if (e.key === "Enter") handleJoin2(); });


// ─────────────────────────────────────────────
// TOAST NOTIFICATION
// ─────────────────────────────────────────────
function showToast(msg) {
  const t = document.createElement("div");
  t.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    z-index: 9999;
    background: var(--ink);
    color: var(--paper);
    padding: 0.9rem 1.6rem;
    border-radius: 100px;
    font-size: 0.875rem;
    font-weight: 500;
    box-shadow: 0 8px 32px rgba(0,0,0,0.25);
    animation: fadeUp 0.3s ease both;
    max-width: 300px;
    line-height: 1.4;
  `;
  t.textContent = msg;
  document.body.appendChild(t);
  setTimeout(() => {
    t.style.opacity = "0";
    t.style.transition = "opacity 0.3s";
    setTimeout(() => t.remove(), 300);
  }, 3500);
}


// ─────────────────────────────────────────────
// NAV — add shadow on scroll
// ─────────────────────────────────────────────
window.addEventListener("scroll", () => {
  document.getElementById("navbar").classList.toggle("scrolled", window.scrollY > 40);
}, { passive: true });


// ─────────────────────────────────────────────
// SCROLL REVEAL  (fires once per element)
// ─────────────────────────────────────────────
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.classList.add("visible");
      revealObserver.unobserve(el.target);   // unobserve after first trigger
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll(".reveal").forEach(el => revealObserver.observe(el));


// ─────────────────────────────────────────────
// FAQ ACCORDION
// ─────────────────────────────────────────────
function toggleFaq(btn) {
  const item   = btn.closest(".faq-item");
  const isOpen = item.classList.contains("open");

  // Close all open items first
  document.querySelectorAll(".faq-item.open").forEach(i => {
    i.classList.remove("open");
    i.querySelector(".faq-q").setAttribute("aria-expanded", "false");
  });

  // If item was closed, open it
  if (!isOpen) {
    item.classList.add("open");
    btn.setAttribute("aria-expanded", "true");
  }
}