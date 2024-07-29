const express = require('express');
const PORT = 3000;
const app = express();

//? EJS
//* pas besoin de le require
//* préciser à express que tu vas utiliser un moteur de template
app.set('view engine', 'ejs');
//* on precise ici dans quel dossier trouvé les views (vues)
app.set('views', './views');

const navigation = require('./data/navigation.js');
const recipes = require('./data/recipes.json');

//? Static express
//? https://expressjs.com/fr/starter/static-files.html
//* Express est un framework qui permet de créer un serveur web
//* Hors toutes les ressources demandées par une page web (images, js front, CSS, polices, vidéos, etc.) sont fournies par ce serveur.
//* Ce qui signifie que si l’on voulais manuellement permettre à notre serveur de fournir les ressources demandées,
//* on devrait créer une route par fichier à fournir (images, CSS, etc.). Pas Pratique !!!!
//* Express est aussi capable de faire des gestion de ressources statiques.
app.use(express.static('public'));
//* On informe Express que
//* Nous allons ranger toutes les ressources demandées par les pages web (html) dans le dossier public
//* qui seront accessible via la requête au serveur
//* http://localhost:3000/css/style.css
//* http://localhost:3000/js/front.js
//* idem pour toutes les images
//* express va le faire automatiquement pour TOUS les fichiers qui se trouvent dans le dossier PUBLIC
//* Dossier public = équivalent d'écrire UNE ROUTE par fichier dedans !

//? Variable / donnée globale
//* Pour envoyer le paramètre (locals) dans toutes les views (donc dans toutes les routes)
app.locals.h1 = 'Découvrez toutes nos recettes';
app.locals.navigation = navigation;
app.locals.year = '2024';

app.get('/', (req, res) => {
  //* affiche le contenu du fichier home.ejs comme si celui était un fichier .html avec le RENDER
  //* Nous envoyons à la views les données (cdc, nombre, object, array...) qui seront dans l'objet locals de express
  //* ces données seront disponibles dans le fichier ejs de views correspondant.
  //* 2 possibilités pour envoyer des données (paramètre) à la vue
  /* res.locals.h1 = "Découvrez toutes nos recettes" */
  //* 2e possibilité
  res.render('home.ejs');

  //! les variables que vous envoyé dans une route (url) ne seront accessible
  //! SEULEMENT DANS LA VUE CONCERNÉE
});

app.get('/recipes', (req, res) => {
  res.render('recipes.ejs', {
    titre: 'Voici la liste de nos recette',
    recipes: recipes,
  });
});

app.get('/recipes/:name', (req, res) => {
  //* on envoie ici un tableau qui aura la propriété recipes dans l'oject locals: soit locals.recipes
  const foundRecipe = recipes.find((e) => e.name === req.params.name);
  res.render('recipe', {
    foundRecipe,
  });
});

app.listen(PORT, () => {
  console.log(`Listening at http://localhost:${PORT}`);
});
