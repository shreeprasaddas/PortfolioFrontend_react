const fs = require('fs');
const glob = require('glob');

const files = glob.sync('src/**/*.js');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  // Match process.env.REACT_APP_API_URL || "http://localhost:5000" including variations
  const newContent = content.replace(/(process\.env\.REACT_APP_API_URL\s*\|\|\s*['"`]http:\/\/localhost:5000\/?['"`])/g, '($1).replace(/\\/+$/, "")');
  
  if (content !== newContent) {
    fs.writeFileSync(file, newContent, 'utf8');
    console.log('Fixed', file);
  }
}
