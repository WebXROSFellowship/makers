export const  HtmlToText = (htmlContent) => {
    // Create a new DOMParser instance
    const parser = new DOMParser();
    // Parse the HTML content
    const document = parser.parseFromString(htmlContent, "text/html");
    // Extract the plain text using textContent
    const textContent = document.body.textContent;
    return textContent;
  }
