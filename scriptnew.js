// Function to check password strength
function checkPasswordStrength() {
    const password = document.getElementById('password').value;
    const strengthBar = document.getElementById('strength');
    const feedback = document.getElementById('feedback');
    
    let strength = 0;

    // Check password length (minimum 8 characters)
    if (password.length >= 8) {
        strength += 1;
    }
    // Check for at least one uppercase letter
    if (password.match(/[A-Z]/)) {
        strength += 1;
    }
    // Check for at least one number
    if (password.match(/[0-9]/)) {
        strength += 1;
    }
    // Check for at least one special character
    if (password.match(/[^A-Za-z0-9]/)) {
        strength += 1;
    }

    // Update the strength bar and feedback message
    if (strength === 0) {
        feedback.textContent = "Password is too short.";
        strengthBar.style.width = '0%';
        strengthBar.className = '';
    } else if (strength <= 1) {
        feedback.textContent = "Weak password.";
        strengthBar.style.width = '25%';
        strengthBar.className = 'weak';
    } else if (strength === 2) {
        feedback.textContent = "Medium password.";
        strengthBar.style.width = '50%';
        strengthBar.className = 'medium';
    } else if (strength === 3) {
        feedback.textContent = "Strong password.";
        strengthBar.style.width = '75%';
        strengthBar.className = 'strong';
    } else if (strength === 4) {
        feedback.textContent = "Very strong password!";
        strengthBar.style.width = '100%';
        strengthBar.className = 'strong';
    }
}

// Generate a random strong password
function generateSuggestedPassword() {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+[]{}|;:,.<>?';
    let passwords = '';
    for (let i = 0; i < 12; i++) {
        const randomChar = characters.charAt(Math.floor(Math.random() * characters.length));
        passwords += randomChar;
    }
    return passwords;
}
async function sha1(str) {
    const buffer = new TextEncoder('utf-8').encode(str);
    const hash = await crypto.subtle.digest('SHA-1', buffer); // Wait for the hash result
    const hexArray = Array.from(new Uint8Array(hash));
    return hexArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
}
async function breachstatusbtn() {
    const password = document.getElementById('password').value;
    
    // Hash the password asynchronously
    const sha1Password = await sha1(password); // Wait for the hash to be computed
    
    const prefix = sha1Password.substring(0, 5); // First 5 characters
    const suffix = sha1Password.substring(5); // Remaining characters

    try {
        // Fetch the data from the API with the prefix
        const response = await fetch(`https://api.pwnedpasswords.com/range/${prefix}`);
        const data = await response.text();

        // Check if the suffix is present in the response data
        if (data.includes(suffix.toUpperCase())) {
            document.getElementById("breachStatus").textContent = "This password has been breached!";
            document.getElementById("breachStatus").style.color = "red";
        } else {
            document.getElementById("breachStatus").textContent = "This password has not been breached.";
            document.getElementById("breachStatus").style.color = "green";
        }
    } catch (error) {
        console.error('Error checking password breach:', error);
        document.getElementById("breachStatus").textContent = "Error checking password breach.";
        document.getElementById("breachStatus").style.color = "black";
    }
}



// Generate and display stronger password suggestions
function suggestPassword() {
    const suggestions = [
        generateSuggestedPassword(),
        generateSuggestedPassword(),
        generateSuggestedPassword()
    ];

    const suggestionsList = document.getElementById('suggestions-list');
    suggestionsList.innerHTML = ''; // Clear previous suggestions

    // Add new suggested passwords
    suggestions.forEach(suggestion => {
        const listItem = document.createElement('li');
        listItem.textContent = suggestion; // Set the suggested password
        suggestionsList.appendChild(listItem); // Append the list item to the suggestions list
    });
}
