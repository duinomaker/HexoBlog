if [ -d ".deploy_git" ]; then
    rm -rf .deploy_git
fi
hexo clean

python ./source/_hidden/_diaries/encrypt.py

rm -f /run/media/duinomaker/BRIDGE/HexoBlog-backup/previous.tar.gz
mv /run/media/duinomaker/BRIDGE/HexoBlog-backup/current.tar.gz /run/media/duinomaker/BRIDGE/HexoBlog-backup/previous.tar.gz
tar -zcf /run/media/duinomaker/BRIDGE/HexoBlog-backup/current.tar.gz /home/duinomaker/Documents/HexoBlog

git add -A
git commit -m "$1"

git push origin master

hexo generate
npx gulp
hexo deploy