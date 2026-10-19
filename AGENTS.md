# Instructions pour les agents

Ces consignes s’appliquent à tout le dépôt. Les demandes explicites de l’utilisateur priment sur les conventions ci-dessous.

## Repères

Ce projet est un blog bilingue français/anglais généré par Hugo et publié sur GitHub Pages. Le site utilise les gabarits locaux de `layouts/` ; le sous-module historique `themes/PaperMod` est inactif.

Avant de modifier l’organisation du site, les intégrations ou le déploiement, lire [README.md](README.md). Il décrit les répertoires, le développement local et la publication. La version de Hugo Extended de référence est dans `.hugo-version` ; lors d’une mise à jour, synchroniser aussi `.github/workflows/hugo.yml`.

## Direction graphique

- Conserver un fond principal noir pur (`#000000`), sans grain, texture ni dégradé.
- Utiliser le blanc os et l’or patiné de la photo GitHub comme couleurs complémentaires. Les variables de `assets/css/site.css` font référence.
- Garder une typographie élégante et épaisse : Cormorant Garamond en Bold pour les titres, UnifrakturCook pour la signature. Utiliser les véritables fichiers de graisse disponibles, avec des icônes et des flèches aux traits suffisamment épais.
- Présenter l’auteur autour du code, des idées et de la culture. L’identité orthodoxe peut s’exprimer dans les articles ; elle ne doit pas devenir un argument de présentation dans le bandeau d’accueil, les légendes, les métadonnées générales ou la navigation.
- La photo GitHub reste une référence visuelle. Les symboles chrétiens ne sont pas interdits ; leur présence doit rester discrète et liée au contexte, comme la croix de fin d’article.
- Héberger les polices et les éléments d’identité dans `static/`, avec les licences des polices. Préserver les contrastes, le focus clavier et le respect de la réduction des animations.

## Contenu et compatibilité

- Préserver les textes et les métadonnées éditoriales des publications, sauf demande de modification de leur contenu.
- Maintenir les URLs existantes : préfixes `/fr/` et `/en/`, articles, sujets, flux RSS et alias `/page/1/`. Un renommage de fichier Markdown peut changer l’URL publique.
- Relier les traductions d’un même texte par une `translationKey` identique. Le sélecteur de langue doit ouvrir la traduction correspondante lorsqu’elle existe.
- Modifier les libellés de l’interface dans les deux fichiers `i18n/fr.json` et `i18n/en.json`. Les biographies de l’accueil proviennent de `content/{fr,en}/_index.md`.
- Préserver le dépôt, la catégorie et le mapping par chemin de Giscus pour conserver l’association avec les discussions existantes.
- Garder les formules KaTeX, les diagrammes Mermaid, les blocs de code et les shortcodes fonctionnels. Le code source d’un diagramme doit rester lisible si Mermaid ne charge pas.
- Produire un site statique compatible avec GitHub Pages. Les contenus et la navigation doivent fonctionner sans JavaScript ; les interactions dans `assets/js/site.js` sont des améliorations progressives.
- Modifier les sources, puis régénérer le site. `public/` est une sortie de compilation ignorée par Git et ne doit pas être éditée ou versionnée.

## Vérifications adaptées au changement

Pour une modification des gabarits, des styles, du JavaScript, de la configuration ou du contenu, construire le site :

```bash
hugo --gc --minify
cp public/fr/404.html public/404.html
```

La copie de la page 404 à la racine est nécessaire pour GitHub Pages et figure aussi dans le workflow de déploiement.

- Pour une modification visuelle, inspecter les pages concernées sur mobile et ordinateur, en français et en anglais. Vérifier les débordements horizontaux, les titres longs et le focus clavier.
- Pour une interaction modifiée, vérifier son comportement réel, notamment les résultats vides et la réinitialisation d’une recherche, ou le passage vers la traduction d’un article.
- Pour une modification des URLs ou des gabarits de lecture, vérifier les liens internes, les ancres et les intégrations concernées.
- Pour une modification documentaire seule, relire les instructions et vérifier les chemins et commandes cités ; une reconstruction du site n’est pas nécessaire.
- Avant un commit, exécuter `git diff --check` et, après préparation de l’index, `git diff --cached --check` afin d’inclure les nouveaux fichiers dans le contrôle.

Un push sur `main` déclenche le workflow GitHub Pages. Dans le compte rendu, distinguer les modifications locales, le push effectué et le déploiement effectivement vérifié.
