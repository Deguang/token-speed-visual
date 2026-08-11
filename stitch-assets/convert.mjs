import fs from 'fs';
import path from 'path';

const files = [
  { file: '0c41d72823414dd0b81ae0ca32a65617.html', component: 'DashboardScreen.tsx', name: 'DashboardScreen' },
  { file: '160a481d89c04e629ffe4cc10de91e12.html', component: 'BYOKScreen.tsx', name: 'BYOKScreen' },
  { file: '99233533cee14d8180b33828aac38345.html', component: 'DynamicDemoScreen.tsx', name: 'DynamicDemoScreen' }
];

files.forEach(({ file, component, name }) => {
  const html = fs.readFileSync(path.join(process.cwd(), 'stitch-assets', file), 'utf8');
  
  // Extract <main> content
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error(`Could not find <main> in ${file}`);
    return;
  }
  
  let jsx = mainMatch[0];
  
  // Convert HTML to JSX
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}'); // Comments
  jsx = jsx.replace(/<input([^>]*?[^\/])>/g, '<input$1 />'); // Self-closing input
  jsx = jsx.replace(/<img([^>]*?[^\/])>/g, '<img$1 />'); // Self-closing img
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr([^>]*?[^\/])>/g, '<hr$1 />');
  // Fix inline styles
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
    // Very basic style object conversion for width: 70%; etc
    const rules = p1.split(';').filter(r => r.trim());
    const obj = {};
    rules.forEach(r => {
      let [k, v] = r.split(':');
      if(k && v) {
        k = k.trim().replace(/-([a-z])/g, (g) => g[1].toUpperCase());
        obj[k] = v.trim();
      }
    });
    return `style={${JSON.stringify(obj)}}`;
  });

  const code = `import React from 'react';\n\nexport function ${name}() {\n  return (\n    ${jsx}\n  );\n}\n`;
  
  fs.writeFileSync(path.join(process.cwd(), 'src', 'components', component), code);
  console.log(`Created ${component}`);
});
