document.addEventListener('DOMContentLoaded', () => {
    // ---- Modal and Auth Logic ----
    const authModal = document.getElementById('auth-modal');
    const signInBtn = document.getElementById('sign-in-btn');
    const getStartedBtn = document.getElementById('get-started-btn');
    const signOutBtn = document.getElementById('sign-out-btn');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const authForm = document.getElementById('auth-form');
    const authTitle = document.getElementById('auth-title');
    const authSubmitBtn = document.getElementById('auth-submit-btn');
    const toggleAuthBtn = document.getElementById('toggle-auth-btn');
    const authMessage = document.getElementById('auth-message');
    const meritPointsEl = document.getElementById('merit-points');

    let isSigningUp = false;

    // Function to update UI based on login status
    const updateAuthUI = (loggedIn) => {
        if (loggedIn) {
            signInBtn.classList.add('hidden');
            getStartedBtn.classList.add('hidden');
            signOutBtn.classList.remove('active');
        } else {
            signInBtn.classList.remove('hidden');
            getStartedBtn.classList.remove('hidden');
            signOutBtn.classList.add('hidden');
        }
    };

    // Check if user is logged in (simulated)
    const checkAuthStatus = () => {
        const loggedIn = localStorage.getItem('loggedIn') === 'true';
        updateAuthUI(loggedIn);
    };

    signInBtn.addEventListener('click', () => {
        isSigningUp = false;
        authTitle.textContent = 'Log In';
        authSubmitBtn.textContent = 'Log In';
        toggleAuthBtn.textContent = 'Sign Up';
        document.getElementById('auth-text').textContent = "Don't have an account?";
        authMessage.classList.add('hidden');
        authModal.classList.remove('hidden');
    });

    getStartedBtn.addEventListener('click', () => {
        isSigningUp = true;
        authTitle.textContent = 'Sign Up';
        authSubmitBtn.textContent = 'Sign Up';
        toggleAuthBtn.textContent = 'Log In';
        document.getElementById('auth-text').textContent = "Already have an account?";
        authMessage.classList.add('hidden');
        authModal.classList.remove('hidden');
    });

    closeModalBtn.addEventListener('click', () => {
        authModal.classList.add('hidden');
    });

    toggleAuthBtn.addEventListener('click', (e) => {
        e.preventDefault();
        isSigningUp = !isSigningUp;
        authTitle.textContent = isSigningUp ? 'Sign Up' : 'Log In';
        authSubmitBtn.textContent = isSigningUp ? 'Sign Up' : 'Log In';
        toggleAuthBtn.textContent = isSigningUp ? 'Log In' : 'Sign Up';
        document.getElementById('auth-text').textContent = isSigningUp ? "Already have an account?" : "Don't have an account?";
        authMessage.classList.add('hidden');
    });

    authForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const email = document.getElementById('email').value;
        const password = document.getElementById('password').value;

        if (isSigningUp) {
            // Simulate sign-up success
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', email);
            authMessage.textContent = 'Sign up successful! You are now logged in.';
            authMessage.classList.remove('bg-red-800', 'text-red-200');
            authMessage.classList.add('bg-green-800', 'text-green-200');
            authMessage.classList.remove('hidden');
        } else {
            // Simulate log-in success
            localStorage.setItem('loggedIn', 'true');
            localStorage.setItem('userEmail', email);
            authMessage.textContent = 'Login successful! Welcome back.';
            authMessage.classList.remove('bg-red-800', 'text-red-200');
            authMessage.classList.add('bg-green-800', 'text-green-200');
            authMessage.classList.remove('hidden');
        }

        setTimeout(() => {
            authModal.classList.add('hidden');
            updateAuthUI(true);
            // Simulating fetching merit points
            const meritPoints = 150; // Example value
            meritPointsEl.textContent = `${meritPoints} Merit`;
        }, 1500);
    });

    signOutBtn.addEventListener('click', () => {
        localStorage.removeItem('loggedIn');
        localStorage.removeItem('userEmail');
        updateAuthUI(false);
        meritPointsEl.textContent = '0 Merit';
    });

    checkAuthStatus();
    
    // ---- Tutor Filtering Logic ----
    const showTutorsBtns = document.querySelectorAll('.show-tutors-btn');
    const tutorGroups = document.querySelectorAll('.tutor-group');
    const tutorGridHeading = document.getElementById('tutor-grid-heading');

    showTutorsBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            const groupToShow = btn.dataset.tutorGroup;

            // Hide all tutor groups
            tutorGroups.forEach(group => {
                group.classList.add('hidden');
            });

            // Show the selected tutor group
            const selectedGroup = document.getElementById(groupToShow + '-tutors');
            if (selectedGroup) {
                selectedGroup.classList.remove('hidden');
            }
            
            // Show the "Meet Our Expert Tutors" heading
            tutorGridHeading.classList.remove('hidden');
        });
    });
});