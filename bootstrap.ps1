# Bootstrap express app
npm init

# Install libs
npm i bootstrap
npm i vue
npm i express-generator -g
npm i nodemon
npm i axios

# Create scaffold app
express --view pug
npm i

# Copy includes
Copy-Item .\node_modules\bootstrap\dist\css\bootstrap.min.css .\public\stylesheets\
Copy-Item .\node_modules\bootstrap\dist\js\bootstrap.min.js .\public\javascripts\
Copy-Item .\node_modules\vue\dist\vue.min.js .\public\javascripts\
Copy-Item .\node_modules\axios\dist\axios.min.js .\public\javascripts\
