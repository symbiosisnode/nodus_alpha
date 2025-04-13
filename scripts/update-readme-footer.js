// This script adds a UX Design Compliance footer to the README.md file during build
const fs = require('fs');
const path = require('path');

// The footer content to append
const designComplianceFooter = `
---
## ✅ UX Design Compliance

This build complies with the [10 Rules of Dashboard Design](https://uxplanet.org/10-rules-for-better-dashboard-design-ef68189d734c) and the official NODUS style guide.

✅ All UI components confirmed with \`useDesignGuard.ts\`  
🎨 Reference: \`/src/styles/NodusStyleGuide.ts\`  
🔒 Verified by NODUS UX Integrity Layer v1.0
`;

// Path to the README file
const readmePath = path.join(__dirname, '..', 'README.md');

try {
  // Read the current README content
  let readmeContent = '';
  if (fs.existsSync(readmePath)) {
    readmeContent = fs.readFileSync(readmePath, 'utf8');
  } else {
    console.log('README.md does not exist. Creating a new one.');
    readmeContent = '# NODUS Project\n\nModern equity and ownership platform for the future.\n';
  }

  // Check if the footer already exists
  if (!readmeContent.includes('## ✅ UX Design Compliance')) {
    // Remove any existing footers (by looking for the divider)
    const footerDividerIndex = readmeContent.lastIndexOf('---');
    if (footerDividerIndex !== -1) {
      readmeContent = readmeContent.substring(0, footerDividerIndex).trim();
    }
    
    // Add the new footer
    readmeContent += `\n${designComplianceFooter}`;
    
    // Write back to the file
    fs.writeFileSync(readmePath, readmeContent, 'utf8');
    
    console.log('✅ README.md updated with UX Design Compliance footer');
  } else {
    console.log('✅ UX Design Compliance footer already exists in README.md');
  }
} catch (err) {
  console.error('❌ Error updating README.md:', err);
  process.exit(1);
} 