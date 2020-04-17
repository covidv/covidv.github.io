wget https://jineshsoni-heatmapapi.glitch.me/covid19india.geojson -OutFile covid19india.geojson
git add --all
git commit -m "Data update : autoCommit: %date:~-4%%date:~3,2%%date:~0,2%.%time:~0,2%%time:~3,2%%time:~6,2%"
git push
