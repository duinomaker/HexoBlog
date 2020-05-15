if [ -d ".deploy_git" ]; then
    rm -rf .deploy_git
fi
hexo clean

python ./source/_hidden/_diaries/encrypt.py

hexo generate
npx gulp

cd public
sudo python -m http.server 4000