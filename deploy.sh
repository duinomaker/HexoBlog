if [ -d ".deploy_git" ]; then
    rm -rf .deploy_git
fi
yarn hexo clean

python3 ./source/_hidden/_diaries/encrypt.py

mv ./source/images ./source/_images

yarn hexo generate
npx gulp
rm -f ./assets/style.css
mv ./public/css/style.css ./assets
rm -rf ./public/css
rm -rf ./public/redirect
yarn hexo deploy

mv ./source/_images ./source/images

git add -A
git commit -m "$1"
git push origin master