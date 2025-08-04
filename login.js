document.addEventListener('DOMContentLoaded', function() {
  // Theme Toggle Functionality
  const themeToggle = document.getElementById('theme-toggle');
  const currentTheme = localStorage.getItem('theme') || 'light';
  
  // Set initial theme
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeIcon(currentTheme);
  
  themeToggle.addEventListener('click', function() {
    const currentTheme = document.documentElement.getAttribute('data-theme');
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeIcon(newTheme);
  });
  
  function updateThemeIcon(theme) {
    const icon = themeToggle.querySelector('i');
    if (theme === 'dark') {
      icon.classList.replace('fa-moon', 'fa-sun');
    } else {
      icon.classList.replace('fa-sun', 'fa-moon');
    }
  }
  
  // Password Visibility Toggle
  const togglePassword = document.querySelector('.toggle-password');
  const passwordInput = document.getElementById('password');
  
  if (togglePassword && passwordInput) {
    togglePassword.addEventListener('click', function() {
      const icon = this.querySelector('i');
      const type = passwordInput.getAttribute('type') === 'password' ? 'text' : 'password';
      passwordInput.setAttribute('type', type);
      
      icon.classList.toggle('fa-eye');
      icon.classList.toggle('fa-eye-slash');
    });
  }
  
  // Modal Handling
  const forgotPasswordLink = document.getElementById('forgotPassword');
  const useOtpLink = document.getElementById('useOtp');
  const forgotPasswordModal = document.getElementById('forgot-password-modal');
  const otpModal = document.getElementById('otp-modal');
  const closeModals = document.querySelectorAll('.close-modal');
  
  // Show modals
  if (forgotPasswordLink && forgotPasswordModal) {
    forgotPasswordLink.addEventListener('click', function(e) {
      e.preventDefault();
      forgotPasswordModal.style.display = 'flex';
    });
  }
  
  if (useOtpLink && otpModal) {
    useOtpLink.addEventListener('click', function(e) {
      e.preventDefault();
      otpModal.style.display = 'flex';
    });
  }
  
  // Close modals
  closeModals.forEach(button => {
    button.addEventListener('click', function() {
      this.closest('.modal').style.display = 'none';
    });
  });
  
  // Close modals when clicking outside
  window.addEventListener('click', function(e) {
    if (e.target.classList.contains('modal')) {
      e.target.style.display = 'none';
    }
  });
  
  // OTP Form Handling
  const otpForm = document.getElementById('otpForm');
  const otpInputContainer = document.getElementById('otpInputContainer');
  
  if (otpForm) {
    otpForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, you would send the OTP to the user's email/phone
      otpInputContainer.style.display = 'block';
    });
  }
  
  // OTP Input Auto Focus
  const otpDigits = document.querySelectorAll('.otp-digit');
  
  if (otpDigits.length > 0) {
    otpDigits.forEach((digit, index) => {
      digit.addEventListener('input', function() {
        if (this.value.length === 1) {
          if (index < otpDigits.length - 1) {
            otpDigits[index + 1].focus();
          }
        }
      });
      
      digit.addEventListener('keydown', function(e) {
        if (e.key === 'Backspace' && this.value.length === 0) {
          if (index > 0) {
            otpDigits[index - 1].focus();
          }
        }
      });
    });
  }
  
  // Verify OTP Button
  const verifyOtpBtn = document.getElementById('verifyOtp');
  
  if (verifyOtpBtn) {
    verifyOtpBtn.addEventListener('click', function() {
      // In a real app, you would verify the OTP here
      alert('OTP verified successfully! Redirecting to dashboard...');
      otpModal.style.display = 'none';
      // window.location.href = 'dashboard.html';
    });
  }
  
  // Resend OTP Link
  const resendOtpLink = document.getElementById('resendOtp');
  
  if (resendOtpLink) {
    resendOtpLink.addEventListener('click', function(e) {
      e.preventDefault();
      // In a real app, you would resend the OTP here
      alert('New OTP has been sent to your registered device.');
    });
  }
  
  // Form Submission Handling
  const loginForm = document.getElementById('loginForm');
  
  if (loginForm) {
    loginForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, you would handle the login here
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rememberMe = document.querySelector('input[name="remember"]').checked;
      
      console.log('Login attempt with:', { email, password, rememberMe });
      // Simulate successful login
      alert('Login successful! Redirecting to dashboard...');
      // window.location.href = 'dashboard.html';
    });
  }
  
  // Reset Password Form
  const resetPasswordForm = document.getElementById('resetPasswordForm');
  
  if (resetPasswordForm) {
    resetPasswordForm.addEventListener('submit', function(e) {
      e.preventDefault();
      // In a real app, you would send a password reset link here
      const email = document.getElementById('reset-email').value;
      console.log('Password reset requested for:', email);
      alert(`Password reset link has been sent to ${email}`);
      forgotPasswordModal.style.display = 'none';
    });
  }
});
