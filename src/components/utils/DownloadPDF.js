import html2pdf from 'html2pdf.js';

/**
 * Generates a PDF from the provided HTML element class name with a header and footer.
 * Handles long content gracefully.
 * @param {string} className - The class name of the element to include in the PDF.
 * @param {string} url - The URL being analyzed for the report.
 */
export const generatePDF = (className, url) => {
  const contentElement = document.querySelector(`.${className}`);
  if (!contentElement) {
    alert('No content available to download!');
    return;
  }

  // Format the URL
  url = url.replace(/^https?:\/\//, '').replace(/\/$/, '');

  console.log('Content Element:', contentElement); // Debugging


  // Create a wrapper for the report with a styled header and footer
  const wrapper = document.createElement('div');
  wrapper.innerHTML = `
    <!-- Header -->
    <div style="text-align: center; margin-bottom: 20px; font-family: Arial, sans-serif;">
      <div style="display: flex; justify-content: center; align-items: center; border-bottom: 2px solid #34495E; padding-bottom: 10px;">
        <img
          src="https://media-hosting.imagekit.io//a45bc55f29d64055/logo.jpg?Expires=1736400057&Key-Pair-Id=K2ZIVPTIP2VGHC&Signature=s0pck~Wj-hrbXg4XhH9kEQD4J7EZDO7quYIW9cpzb6unOtCIvOkPJzHcLMonIk2x65KYQVSQePCy~FxYeEwQ~O-bn4PYGW7JSQHuOtuszm5z7uv~P3cONcwLJ9lrjeMvIo8T7KJTRiRR7pGk78FLNyHK3hIvzSLa7~m9SEVbDnHWZ43Y5zblgTdip-8SiTiNWeHETXI2ygquhP3XpNEjHO9uuMlpai26JbRuM-En24pnwnkQ-n4kGZXoeIjD51nRlUgCeOyQKGbwirD5pQnjLbJLP~AhEasX0JU83GS5jkv~x6ewHkUwdfJo2Jdg98vdq0SWZDI8Em4TRMWA4fL5RQ__"
          alt="Logo"
          style="width: 100px; height: 100px; margin-right: 20px;"
        />
        <h1 style="font-size: 26px; color: #2C3E50; margin: 0;">SEO Analysis Report</h1>
      </div>
      <p style="font-size: 14px; color: #34495E;">Generated on: ${new Date().toLocaleString()}</p>
    </div>
    <!-- Main Content -->
    <div style="width: 100%; font-family: Arial, sans-serif; text-align: center;">  
    <h1>Report on ${url}</h1>   
      ${contentElement.outerHTML}
    </div>
    <!-- Footer -->
    <div style="text-align: center; font-size: 14px; font-family: Arial, sans-serif; color: #7F8C8D; border-top: 1px solid #BDC3C7; padding-top: 10px;">
      <p>Contact us: <a href="mailto:contact@dgtlmart.com" style="color: #2980B9;">contact@dgtlmart.com</a> | Phone: 9810559439</p>
      <p>Generated using SEO Analysis Tool</p>
    </div>
  `;

  const options = {
    margin: [0.2, 0, 0.2, 0], // Increased bottom margin for footer
    filename: 'SEO_Report_All.pdf',
    html2canvas: {
      scale: 3, // Higher resolution
      useCORS: true,
      logging: false,
      letterRendering: true,
    },
    jsPDF: {
      unit: 'in',
      format: 'a4', // Changed to A4 for longer content
      orientation: 'portrait',
    },
    pagebreak: {
      mode: ['avoid-all','css', 'legacy'], // Add proper page breaks
      avoid: ['.avoid-break'], // Avoid breaking certain elements
    },
  };

  html2pdf()
    .set(options)
    .from(wrapper)
    .save()
    .catch((err) => {
      console.error('PDF Generation Failed:', err);
      alert('Failed to generate PDF. Please try again.');
    });
};
