// Function to update the live preview
function updatePreview() {
    const markdownInput = document.getElementById('markdownInput').value;
    const markdownPreview = document.getElementById('markdownPreview');
    const htmlContent = marked.parse(markdownInput);

    // Update the preview section with the parsed HTML
    markdownPreview.innerHTML = htmlContent;
}

// Event listener for live preview
document.getElementById('markdownInput').addEventListener('input', updatePreview);

// Event listener for generating PDF
document.getElementById('generatePdfBtn').addEventListener('click', function () {
    const markdownInput = document.getElementById('markdownInput').value;

    if (!markdownInput.trim()) {
        alert('Please enter some markdown content.');
        return;
    }

    const htmlContent = marked.parse(markdownInput);

    // Create a new jsPDF instance
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    // Add a custom font (Roboto) to the PDF
    doc.setFont('Roboto', 'normal');

    // Add the HTML content to the PDF
    doc.html(htmlContent, {
        callback: function (doc) {
            // Save the PDF
            doc.save('output.pdf');

            // Show success message
            const successMessage = document.getElementById('successMessage');
            successMessage.classList.remove('hidden');
        },
        x: 10,
        y: 10,
        width: 180, // Adjust the width as needed
        windowWidth: 650 // Adjust the window width for better rendering
    });
});

// Initialize the preview on page load
updatePreview();
