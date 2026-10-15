/* 生成 pkg_src.js：把 6 个源文件打包成 base64 快照，供离线（file://）
   环境下「导出安装包」使用。
   用法：在与源文件同目录下执行  node build_pkg_src.js
   （每次修改 index.html / styles.css / styles-overhaul.css / app.js / data.js / learn.js / learn.css 后重新运行一次）*/
'use strict';
const fs = require('fs');
const path = require('path');
const dir = process.argv[2] || __dirname;
const names = ['index.html', 'styles.css', 'styles-overhaul.css', 'app.js', 'data.js', 'learn.js', 'learn.css'];
const map = {};
for (const n of names) {
  map[n] = fs.readFileSync(path.join(dir, n)).toString('base64');
}
const header = '/* 自动生成，请勿手改。内置源文件快照（离线导出安装包用）。\n' +
  '   重新生成：在本目录执行  node build_pkg_src.js  */\n';
fs.writeFileSync(path.join(dir, 'pkg_src.js'), header + 'window.__PKG_SRC__ = ' + JSON.stringify(map) + ';\n');
let total = 0;
for (const n of names) total += map[n].length;
console.log('pkg_src.js 生成完成：' + names.join(', ') + '（base64 共 ' + total + ' 字节）');
