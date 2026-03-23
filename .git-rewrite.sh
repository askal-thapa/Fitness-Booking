#!/bin/bash
rm -rf .git
git init
git config user.name "Askal Thapa"
git config user.email "askalthapa91@gmail.com"

d=$(date -v-5d)
git add package.json package-lock.json next.config.ts tsconfig.json eslint.config.mjs postcss.config.mjs .gitignore README.md
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Initialize project and configuration"

d=$(date -v-4d)
git add public/ src/app/globals.css src/app/favicon.ico
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Add global styles and assets"

d=$(date -v-4d -v+2H)
git add src/app/layout.tsx src/app/page.tsx
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Configure root layout and responsive landing page"

d=$(date -v-3d)
git add src/components/Navbar.tsx src/components/Footer.tsx src/components/Hero.tsx src/components/Features.tsx src/components/Trainers.tsx src/components/TrainerCard.tsx
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Implement shared marketing components"

d=$(date -v-3d -v+4H)
git add src/app/login/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Add authentication and role selection UI"

d=$(date -v-2d)
git add src/data/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Add centralized mock data service"

d=$(date -v-2d -v+5H)
git add src/components/DashboardNavbar.tsx src/components/TrainerNavbar.tsx src/app/dashboard/page.tsx
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Build dashboard landing and secure navigation"

d=$(date -v-1d)
git add src/app/dashboard/trainers/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Add trainer directory and detailed profiles"

d=$(date -v-1d -v+3H)
git add src/app/dashboard/bookings/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Implement unified booking interfaces"

d=$(date -v-12H)
git add src/app/trainer/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Create specialized command dashboard for trainers"

d=$(date -v-8H)
git add src/app/dashboard/profile/
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Implement user profile management settings"

d=$(date -v-4H)
git add src/components/FloatingAssistant.tsx
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Introduce global AI Fitness Assistant widget"

d=$(date)
git add AGENTS.md CLAUDE.md 2>/dev/null || true
git add .
GIT_COMMITTER_DATE="$d" git commit --date="$d" -m "Update documentation and finalize components"

git branch -M main
git remote add origin https://github.com/askal-thapa/Fitness-Booking.git

# Clean up self
rm .git-rewrite.sh
