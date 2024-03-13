pnpm docs:build

cd docs/.vitepress/dist

git init -b gh-pages
git remote add origin https://github.com/szchixy/szchixy.github.io.git
git config --local user.name 'Geogi Chi'
git config --local user.email szchixy@gmail.com

git add -A
git commit -m "auto deploy"

git push origin gh-pages --force
