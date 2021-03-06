if [ -d ".deploy_git" ]; then
    rm -rf .deploy_git
fi
yarn hexo clean

/usr/local/opt/miniconda3/envs/common/bin/python ./source/_hidden/_diaries/encrypt.py

mv ./source/images ./blog/images

yarn hexo generate
npx gulp
rm -f ./assets/style.css
mv ./public/css/style.css ./assets
rm -rf ./public/css
rm -rf ./public/js
rm -rf ./public/redirect
yarn hexo deploy

mv ./blog/images ./source/images

git add -A
git commit -am "$1"
git push origin master

./update_assets.sh