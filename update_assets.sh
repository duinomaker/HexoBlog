mv ./assets ./blog
mv ./source/images ./blog/images

cd blog
git checkout --orphan latest_branch
git add -A
git commit -am "Update assets"
git branch -D master
git branch -m master
git push origin master -f
cd ..

mv ./blog/assets ./
mv ./blog/images ./source/images