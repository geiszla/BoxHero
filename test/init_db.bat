mongoimport --db boxhero --collection users --type json --file users.json --jsonArray --drop
node generate.js
mongoexport --d boxhero -c boxes -u boxhero -p BoxHeroY4 -o boxes.json
mongoimport --db boxhero --collection boxes --type json --file boxes.json --jsonArray --drop
pause