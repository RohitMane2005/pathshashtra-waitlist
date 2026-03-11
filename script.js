// -----------------------------
// SUPABASE SETUP
// -----------------------------
const supabaseUrl = "https://cymvypibhvsbyjkkijio.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bXZ5cGliaHZzYnlqa2tpamlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwODE4NzUsImV4cCI6MjA4ODY1Nzg3NX0.p9QYlVGKS0iJii3fMR0UtT5M1kqzPZCRpNTApXuXz1Y";

const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);


// -----------------------------
// EMAIL VALIDATION
// -----------------------------
function isValidEmail(email) {
  const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return pattern.test(email);
}


// -----------------------------
// JOIN WAITLIST (FORM 1)
// -----------------------------
async function handleJoin() {

  const emailInput = document.getElementById("emailInput");
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    emailInput.style.borderColor = "#ef4444";
    setTimeout(() => emailInput.style.borderColor = "", 1500);
    return;
  }

  try {

    // check duplicate
    const { data, error: fetchError } = await supabaseClient
      .from("waitlist")
      .select("email")
      .eq("email", email);

    if (fetchError) {
      console.error(fetchError);
      alert("Something went wrong.");
      return;
    }

    if (data.length > 0) {
      alert("You're already on the waitlist!");
      return;
    }

    // insert email
    const { error } = await supabaseClient
      .from("waitlist")
      .insert([{ email: email }]);

    if (error) {
      console.error(error);
      alert("Failed to join waitlist.");
      return;
    }

    // success UI
    document.getElementById("formWrap").style.display = "none";

    const msg = document.getElementById("successMsg");
    msg.style.display = "block";
    msg.textContent =
      "🎉 You're on the list! We'll reach out soon with early access.";

  } catch (err) {
    console.error(err);
  }
}


// -----------------------------
// JOIN WAITLIST (FORM 2)
// -----------------------------
async function handleJoin2() {

  const emailInput = document.getElementById("emailInput2");
  const email = emailInput.value.trim();

  if (!isValidEmail(email)) {
    emailInput.style.borderColor = "#ef4444";
    setTimeout(() => emailInput.style.borderColor = "", 1500);
    return;
  }

  try {

    // check duplicate
    const { data, error: fetchError } = await supabaseClient
      .from("waitlist")
      .select("email")
      .eq("email", email);

    if (fetchError) {
      console.error(fetchError);
      alert("Something went wrong.");
      return;
    }

    if (data.length > 0) {
      alert("You're already on the waitlist!");
      return;
    }

    // insert
    const { error } = await supabaseClient
      .from("waitlist")
      .insert([{ email: email }]);

    if (error) {
      console.error(error);
      alert("Failed to join waitlist.");
      return;
    }

    // success UI
    document.getElementById("formWrap2").style.display = "none";

    const msg = document.getElementById("successMsg2");
    msg.style.display = "block";
    msg.textContent =
      "🎉 You're on the list! We'll reach out soon with early access.";

  } catch (err) {
    console.error(err);
  }
}


// -----------------------------
// SCROLL ANIMATION
// -----------------------------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = "1";
      el.target.style.transform = "translateY(0)";
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll(
  ".pain-card, .feature-card, .stat-card, .timeline-step"
).forEach(el => {

  el.style.opacity = "0";
  el.style.transform = "translateY(24px)";
  el.style.transition = "opacity 0.5s ease, transform 0.5s ease";

  observer.observe(el);

});