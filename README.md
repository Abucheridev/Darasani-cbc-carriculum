# Darasani — Redesign starter package

This is a lightweight, mobile-first static front-end starter for Darasani Grade 7 CBC learning.

## Included
- Student dashboard with subject search
- Student/teacher portal switch
- Working sample multiple-choice quizzes with explanations
- Local quiz history and average score
- Light/dark theme
- Responsive mobile layout
- Basic PWA manifest and service worker

## Important limitations
This is a **front-end starter/prototype**, not the completed production platform.
- The included question set is a small sample. Merge the complete existing question bank before replacing the live site.
- Teacher portal cards are preview-only; secure teacher accounts, classes, assessment assignment and reports require a backend.
- There is no authentication, cloud sync, payments or server-side data protection in this package.
- Do not collect children's personal information until privacy, consent, security and applicable Kenyan data-protection requirements are addressed.

## Publish with GitHub Pages
1. Extract this ZIP.
2. Open your repository: https://github.com/Abucheridev/Darasani-cbc-carriculum
3. Choose **Add file → Upload files**.
4. Upload the contents of the extracted `Darasani-Redesign` folder (not the outer folder itself).
5. Commit the changes to the `main` branch.
6. Wait for GitHub Pages to rebuild, then check your website.

**Safer option:** Create a new branch or duplicate repository first. Do not overwrite the live version until you have merged the existing full question bank and tested the new site.

## Local testing
Open `index.html` in a browser for basic testing. PWA/offline installation requires serving the folder over HTTPS or localhost.

## Project structure
```
index.html
manifest.json
sw.js
css/styles.css
js/app.js
assets/icons/icon.svg
README.md
```
