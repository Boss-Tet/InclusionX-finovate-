const fs = require('fs');
const path = require('path');

const templatesDir = path.join(__dirname, 'components', 'templates');

// Find all template files
const findTemplates = (dir, fileList = []) => {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTemplates(filePath, fileList);
    } else if (file.endsWith('.tsx') && !file.includes('Banker')) {
      fileList.push(filePath);
    }
  }
  return fileList;
};

const allTemplates = findTemplates(templatesDir);

allTemplates.forEach(filePath => {
  let content = fs.readFileSync(filePath, 'utf8');

  // Skip if already imported
  if (content.includes('MobileBottomNav')) {
    return;
  }

  // Check if it has a hardcoded bottom nav block
  const navStartIdx = content.indexOf('{/* ===== MOBILE BOTTOM NAV ===== */}');
  if (navStartIdx !== -1) {
    const navEndIdx = content.indexOf('</nav>', navStartIdx);
    if (navEndIdx !== -1) {
      // Replace the entire block with <MobileBottomNav />
      content = content.slice(0, navStartIdx) + '<MobileBottomNav />\n' + content.slice(navEndIdx + 6);
      
      // Add import
      content = content.replace(
        'import React', 
        'import { MobileBottomNav } from "@/components/organisms/MobileBottomNav/MobileBottomNav";\nimport React'
      );
      
      fs.writeFileSync(filePath, content);
      console.log('Replaced hardcoded nav in', filePath);
    }
  }
});
