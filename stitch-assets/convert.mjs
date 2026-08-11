import fs from 'fs';
import path from 'path';

const files = [
  { file: 'd7e61abee77b46ae9d2b12276ca80ad1.html', component: 'BenchmarksScreen.tsx', name: 'BenchmarksScreen' },
  { file: '655b9e5e89a04521acc9c6bf547f26ba.html', component: 'ResearchScreen.tsx', name: 'ResearchScreen' },
  { file: '5198210c30fe4a4a8e2a1d208bcf393d.html', component: 'ModelsScreen.tsx', name: 'ModelsScreen' },
  { file: '806d7dd15f8740489fb03fe9ee9c390c.html', component: 'LeaderboardScreen.tsx', name: 'LeaderboardScreen' }
];

files.forEach(({ file, component, name }) => {
  const html = fs.readFileSync(path.join(process.cwd(), 'stitch-assets', file), 'utf8');
  
  const mainMatch = html.match(/<main[^>]*>([\s\S]*?)<\/main>/i);
  if (!mainMatch) {
    console.error(`Could not find <main> in ${file}`);
    return;
  }
  
  let jsx = mainMatch[0];
  
  jsx = jsx.replace(/class=/g, 'className=');
  jsx = jsx.replace(/for=/g, 'htmlFor=');
  jsx = jsx.replace(/<!--([\s\S]*?)-->/g, '{/* $1 */}');
  jsx = jsx.replace(/<input([^>]*?[^\/])>/g, '<input$1 />');
  jsx = jsx.replace(/<img([^>]*?[^\/])>/g, '<img$1 />');
  jsx = jsx.replace(/<br>/g, '<br />');
  jsx = jsx.replace(/<hr([^>]*?[^\/])>/g, '<hr$1 />');
  jsx = jsx.replace(/style="([^"]*)"/g, (match, p1) => {
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

  const code = `\nexport function ${name}() {\n  return (\n    ${jsx}\n  );\n}\n`;
  
  fs.writeFileSync(path.join(process.cwd(), 'src', 'components', component), code);
  console.log(`Created ${component}`);
});
