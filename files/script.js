// Supabase Setup
const supabaseUrl = "https://cymvypibhvsbyjkkijio.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN5bXZ5cGliaHZzYnlqa2tpamlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzMwODE4NzUsImV4cCI6MjA4ODY1Nzg3NX0.p9QYlVGKS0iJii3fMR0UtT5M1kqzPZCRpNTApXuXz1Y";

const supabase = window.supabase.createClient(supabaseUrl, supabaseKey);

let waitlistCount = 200;


// Handle Join (First Form)
async function handleJoin() {
  const emailInput = document.getElementById('emailInput');
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    emailInput.style.borderColor = '#ef4444';
    setTimeout(() => emailInput.style.borderColor = '', 1500);
    return;
  }

  // Check duplicate email
  const { data } = await supabase
    .from('waitlist')
    .select('email')
    .eq('email', email);

  if (data.length > 0) {
    alert("You're already on the waitlist!");
    return;
  }

  // Insert email
  const { error } = await supabase
    .from('waitlist')
    .insert([{ email: email }]);

  if (!error) {
    document.getElementById('formWrap').style.display = 'none';

    const msg = document.getElementById('successMsg');
    msg.style.display = 'block';
    msg.textContent = `🎉 You're on the list! We'll reach out soon with early access.`;

    waitlistCount++;
  } else {
    console.error(error);
  }
}


// Handle Join (Second Form)
async function handleJoin2() {
  const emailInput = document.getElementById('emailInput2');
  const email = emailInput.value.trim();

  if (!email || !email.includes('@')) {
    emailInput.style.borderColor = '#ef4444';
    setTimeout(() => emailInput.style.borderColor = '', 1500);
    return;
  }

  // Check duplicate email
  const { data } = await supabase
    .from('waitlist')
    .select('email')
    .eq('email', email);

  if (data.length > 0) {
    alert("You're already on the waitlist!");
    return;
  }

  // Insert email
  const { error } = await supabase
    .from('waitlist')
    .insert([{ email: email }]);

  if (!error) {
    document.getElementById('formWrap2').style.display = 'none';

    const msg = document.getElementById('successMsg2');
    msg.style.display = 'block';
    msg.textContent = `🎉 You're on the list! We'll reach out soon with early access.`;

    waitlistCount++;
  } else {
    console.error(error);
  }
}


// Scroll Animation (kept from your original code)
const observer = new IntersectionObserver((entries) => {
  entries.forEach(el => {
    if (el.isIntersecting) {
      el.target.style.opacity = '1';
      el.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });


document.querySelectorAll('.pain-card, .feature-card, .stat-card, .timeline-step').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});