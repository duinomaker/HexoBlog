if [ -d ".deploy_git" ]; then
    rm -rf .deploy_git
fi
hexo clean

python ./source/_hidden/_diaries/encrypt.py

rm -f /run/media/duinomaker/BRIDGE/HexoBlog-backup/previous.tar.gz
mv /run/media/duinomaker/BRIDGE/HexoBlog-backup/current.tar.gz /run/media/duinomaker/BRIDGE/HexoBlog-backup/previous.tar.gz
tar -zcf /run/media/duinomaker/BRIDGE/HexoBlog-backup/current.tar.gz .

mv ./source/images ./source/_images

hexo generate
npx gulp
rm -f ./assets/style.css
mv ./public/css/style.css ./assets
rm -rf ./public/css
hexo deploy

mv ./source/_images ./source/images

rm -f ./assets/fonts_main.css
wget "https://fonts.googleapis.com/css?family=Ubuntu:400,italic,500,500italic|Source+Code+Pro" -O ./assets/fonts_main.css
rm -f ./assets/fonts_main_serif.css
wget "https://fonts.googleapis.com/css?family=Ubuntu:400,italic,500,500italic|Source+Code+Pro|Alegreya:400,italic,500,500italic" -O ./assets/fonts_main_serif.css

git add -A
git commit -m "$1"
git push origin master