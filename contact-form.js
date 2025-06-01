// // Debugging EmailJS Integration
// document.addEventListener("DOMContentLoaded", function() {
//     // Get the contact form
//     const contactForm = document.querySelector("#contactForm");

//     if (contactForm) {
//         // First, test if EmailJS is properly loaded
//         console.log("EmailJS loaded check:", typeof emailjs !== 'undefined' ? "✅ EmailJS is loaded" : "❌ EmailJS is NOT loaded");

//         // Try initializing EmailJS - moved here to ensure it happens early
//         try {
//             emailjs.init("h-h6q364s2GjtsQMa");
//             console.log("✅ EmailJS initialization successful");
//         } catch (err) {
//             console.error("❌ EmailJS initialization failed:", err);
//         }

//         contactForm.addEventListener("submit", function(event) {
//             event.preventDefault();
//             console.log("📝 Form submission started");

//             // Show loading state
//             const submitButton = contactForm.querySelector("input[type='submit']");
//             const originalButtonText = submitButton.value;
//             submitButton.value = "Sending...";
//             submitButton.disabled = true;

//             // Get form values
//             const name = contactForm.querySelector("input[placeholder='Full Name']").value.trim();
//             const email = contactForm.querySelector("input[placeholder='Email']").value.trim();
//             const phone = contactForm.querySelector("input[placeholder='Phone Number']").value.trim();
//             const subject = contactForm.querySelector("input[placeholder='Subject']").value.trim();
//             const message = contactForm.querySelector("textarea").value.trim();

//             console.log("📋 Form data collected:", { name, email, subject });

//             // Validate form
//             if (!name || !email || !subject || !message) {
//                 alert("Please fill in all required fields.");
//                 submitButton.value = originalButtonText;
//                 submitButton.disabled = false;
//                 return;
//             }

//             // Prepare template parameters - CORRECTED to match typical EmailJS templates
//             const templateParams = {
//                 to_name: "Paul Mukuna",
//                 from_name: name,
//                 reply_to: email,
//                 phone: phone || "Not provided",
//                 subject: subject,
//                 message: message
//             };

//             console.log("📧 Attempting to send email with params:", templateParams);

//             // Try to check if emailjs is available at this point
//             if (typeof emailjs === 'undefined') {
//                 console.error("❌ EmailJS not available at send time");
//                 alert("Email service not available. Please contact me directly.");
//                 submitButton.value = originalButtonText;
//                 submitButton.disabled = false;
//                 return;
//             }

//             // Send email using EmailJS - CORRECTED version
//             emailjs.send('service_cy0wfsf', 'template_701m7ef', templateParams)
//                 .then(function(response) {
//                     console.log('✅ EMAIL SENT SUCCESSFULLY!', response.status, response.text);
//                     alert("Thank you! Your message has been sent successfully.");
//                     contactForm.reset();
//                 })
//                 .catch(function(error) {
//                     console.error('❌ EMAIL FAILED TO SEND:', error);

//                     // More detailed error handling
//                     let errorMessage = "Message failed to send.";

//                     if (error.status === 401) {
//                         errorMessage += " Authentication error. Please verify your EmailJS credentials.";
//                     } else if (error.status === 403) {
//                         errorMessage += " You've reached your monthly email limit or your account is inactive.";
//                     } else if (error.status >= 500) {
//                         errorMessage += " EmailJS server error. Please try again later.";
//                     }

//                     alert(errorMessage + " Please contact me directly at your-email@example.com");
//                 })
//                 .finally(function() {
//                     submitButton.value = originalButtonText;
//                     submitButton.disabled = false;
//                 });
//         });
//     } else {
//         console.error("❌ Contact form element not found! Make sure you have an element with id='contactForm'");
//     }
// });
