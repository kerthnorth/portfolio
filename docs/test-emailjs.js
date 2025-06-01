// Optional Test Script to verify EmailJS is working correctly
// Create this as a separate file named test-emailjs.js and run it in the browser console

// Initialize EmailJS (use your public key)
emailjs.init("h-h6q364s2GjtsQMa");

// Test function to send a test email
function testEmailJS() {
    // Create test parameters
    const testParams = {
        from_name: "Test User",
        to_name: "Paul Mukuna",
        from_email: "test@example.com",
        phone_number: "1234567890",
        subject: "Test Email from EmailJS",
        message: "This is a test message to verify EmailJS is working correctly."
    };

    console.log("Sending test email with params:", testParams);

    // Send test email
    return emailjs.send('service_cy0wfsf', 'template_701m7ef', testParams)
        .then(function(response) {
            console.log('SUCCESS!', response.status, response.text);
            return true;
        })
        .catch(function(error) {
            console.error('FAILED...', error);
            return false;
        });
}

// How to run this test:
// 1. Load this script in your browser console
// 2. Run testEmailJS() in the console
// 3. Check the console for success or error messages