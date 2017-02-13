mongoimport -h ds011374.mlab.com:11374 -d boxhero -c boxes -u boxhero -p BoxHeroY4 --file boxes.json --jsonArray --drop
mongoexport -h ds011374.mlab.com:11374 -d boxhero -c boxes -u boxhero -p BoxHeroY4 -o boxes.json --jsonArray
node generate.js
mongoimport -h ds011374.mlab.com:11374 -d boxhero -c users -u boxhero -p BoxHeroY4 --file users.json --jsonArray --drop
pause