const fs = require('fs');
const path = require('path');

const publicDir = path.resolve(__dirname, '..', 'public');
const manifestPath = path.join(publicDir, 'seminars.json');

if (!fs.existsSync(manifestPath)) {
  console.log('No seminars.json found, skipping redirect update.');
  process.exit(0);
}

const manifest = JSON.parse(fs.readFileSync(manifestPath, 'utf-8'));

if (!manifest.seminars || manifest.seminars.length === 0) {
  console.log('No seminars in manifest, skipping redirect update.');
  process.exit(0);
}

const latestId = manifest.seminars[0].id;
const redirectUrl = `seminars/${latestId}/slides.html`;

const html = `<!DOCTYPE html>
<html lang="ko">
<head>
  <meta charset="utf-8">
  <meta http-equiv="refresh" content="0;url=${redirectUrl}">
  <title>Redirecting...</title>
</head>
<body>
  <p>Redirecting to <a href="${redirectUrl}">latest seminar</a>...</p>
</body>
</html>
`;

fs.writeFileSync(path.join(publicDir, 'latest.html'), html);
console.log(`latest.html redirect updated to: ${redirectUrl}`);
