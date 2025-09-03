document.getElementById('contactForm').addEventListener('submit', async function(e) {
  e.preventDefault();
  const form = e.target;
  const formData = new FormData(form);
  document.getElementById('contactMsg').textContent = '';
  try {
    const res = await fetch('/user/contact', {
      method: 'POST',
      body: formData
    });
    const data = await res.json();
    if (data.success) {
      form.reset();
      document.getElementById('contactMsg').textContent = 'Message envoyé !';
    } else {
      document.getElementById('contactMsg').textContent = data.error || 'Erreur.';
    }
  } catch (err) {
    document.getElementById('contactMsg').textContent = 'Erreur lors de l’envoi.';
  }
});

const registerForm = document.getElementById('registerForm');
registerForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = {
    email: registerForm.regEmail.value,
    nom: registerForm.regNom.value,
    password: registerForm.regPassword.value
  };
  document.getElementById('registerMsg').textContent = '';
  try {
    const res = await fetch('/user/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.email) {
      registerForm.reset();
      document.getElementById('registerMsg').textContent = 'Inscription réussie !';
    } else {
      document.getElementById('registerMsg').textContent = data.error || 'Erreur.';
    }
  } catch (err) {
    document.getElementById('registerMsg').textContent = 'Erreur lors de l’inscription.';
  }
});

const loginForm = document.getElementById('loginForm');
loginForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = {
    email: loginForm.loginEmail.value,
    password: loginForm.loginPassword.value
  };
  document.getElementById('loginMsg').textContent = '';
  try {
    const res = await fetch('/user/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.token) {
      loginForm.reset();
      document.getElementById('loginMsg').textContent = 'Connexion réussie !';
    } else {
      document.getElementById('loginMsg').textContent = data.error || 'Erreur.';
    }
  } catch (err) {
    document.getElementById('loginMsg').textContent = 'Erreur lors de la connexion.';
  }
});

const resetRequestForm = document.getElementById('resetRequestForm');
resetRequestForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const formData = {
    email: resetRequestForm.resetEmail.value
  };
  document.getElementById('resetRequestMsg').textContent = '';
  try {
    const res = await fetch('/user/password-reset-request', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      resetRequestForm.reset();
      document.getElementById('resetRequestMsg').textContent = 'Email envoyé !';
    } else {
      document.getElementById('resetRequestMsg').textContent = data.error || 'Erreur.';
    }
  } catch (err) {
    document.getElementById('resetRequestMsg').textContent = 'Erreur lors de la demande.';
  }
});

const resetForm = document.getElementById('resetForm');
resetForm.addEventListener('submit', async function(e) {
  e.preventDefault();
  const token = resetForm.resetToken.value;
  const formData = {
    password: resetForm.newPassword.value
  };
  document.getElementById('resetMsg').textContent = '';
  try {
    const res = await fetch(`/user/reset-password/${token}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData)
    });
    const data = await res.json();
    if (data.success) {
      resetForm.reset();
      document.getElementById('resetMsg').textContent = 'Mot de passe réinitialisé !';
    } else {
      document.getElementById('resetMsg').textContent = data.error || 'Erreur.';
    }
  } catch (err) {
    document.getElementById('resetMsg').textContent = 'Erreur lors de la réinitialisation.';
  }
});
