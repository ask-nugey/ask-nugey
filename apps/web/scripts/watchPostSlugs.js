import fs from 'fs';
import path from 'path';

import chokidar from 'chokidar';

const postsDirectory = path.join(process.cwd(), 'src/post');
const outputFile = path.join(process.cwd(), 'src/generated/postSlugs.json');

export const generatePostSlugs = () => {
  const postSlugs = fs.readdirSync(postsDirectory).filter((file) => {
    const filePath = path.join(postsDirectory, file);
    return (
      fs.statSync(filePath).isDirectory() &&
      fs.existsSync(path.join(filePath, 'meta.ts'))
    );
  });

  // JSONファイルとして保存
  fs.writeFileSync(outputFile, JSON.stringify(postSlugs, null, 2));
  console.log(`Generated post slugs: ${postSlugs.length} slugs written to ${outputFile}`);
};

// 初回実行
generatePostSlugs();

// ディレクトリを監視
const watcher = chokidar.watch(postsDirectory, {
  persistent: true,
});

// ファイルやディレクトリの変更時に再生成
watcher.on('addDir', generatePostSlugs);
watcher.on('unlinkDir', generatePostSlugs);
watcher.on('add', generatePostSlugs);
watcher.on('unlink', generatePostSlugs);
