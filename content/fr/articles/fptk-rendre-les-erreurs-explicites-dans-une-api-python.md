---
translationKey: fptk-erreurs-explicites
title: "fptk : rendre les erreurs explicites dans une API Python"
date: 2026-02-06
tags: ["Python", "API", "Programmation fonctionnelle", "Gestion des erreurs"]
author: "Manoah B."
draft: false
description: "Avec Result et Validation, fptk rend visibles les échecs d'un traitement sans transformer chaque fonction en bloc try/except."
---

## Le problème n'est pas l'exception

Une requête d'API traverse plusieurs étapes : décoder le JSON, vérifier les données, écrire en base, puis construire la réponse. Chacune peut échouer. En Python, on peut laisser les exceptions remonter et les intercepter à la fin. Cela fonctionne, mais la signature des fonctions ne dit pas quelles étapes produisent un échec attendu. On finit parfois avec un `try/except` qui entoure tout le traitement et ne sait plus très bien ce qu'il attrape.

J'ai créé [fptk](https://github.com/mhbxyz/fptk) pour essayer une autre façon de composer ces opérations. L'idée n'est pas de bannir les exceptions. C'est de représenter les échecs prévisibles dans les valeurs que les fonctions renvoient.

## Un résultat qui dit ce qui s'est passé

`Result` a deux formes : `Ok` contient une valeur, `Err` contient une erreur. Par exemple, une conversion peut signaler clairement pourquoi elle n'a pas produit d'âge :

```python
from fptk.adt.result import Ok, Err

def parse_age(value: str):
    try:
        age = int(value)
    except ValueError:
        return Err("âge invalide")

    return Ok(age) if age >= 0 else Err("âge négatif")

next_year = parse_age("42").map(lambda age: age + 1)
```

`map` transforme la valeur quand le résultat est `Ok`. Si la conversion a renvoyé `Err`, l'erreur traverse cette étape sans qu'il faille répéter le test partout. Pour enchaîner une fonction qui peut elle aussi échouer, `bind` prend le relais. La réponse HTTP se construit à la frontière de l'application, là où l'on sait convertir chaque erreur en code et en message utiles.

## Absence et erreur ne racontent pas la même chose

Une donnée facultative peut manquer sans que la requête soit invalide. `Option` représente ce cas. Un identifiant mal formé, une permission refusée ou une écriture en base échouée demandent une explication : c'est le rôle de `Result`. Cette distinction évite de donner plusieurs sens à `None`.

La validation a encore un autre besoin. Lorsque plusieurs champs sont faux, il est plus agréable de recevoir **toutes** les erreurs en une seule réponse. `Validation` et `validate_all` servent à les accumuler, alors qu'une chaîne de `Result` s'arrête au premier échec. Une fois les données validées, on peut poursuivre le traitement avec `Result`.

## Garder les effets de bord à leur place

Le point intéressant apparaît quand le flux reste lisible : entrée, validation, traitement, réponse. Les accès à la base, l'envoi d'un e-mail et les autres effets de bord restent aux frontières de ce flux. On peut alors tester la logique métier sans démarrer tout le serveur.

Cette approche a un coût. Si chaque petite fonction retourne un conteneur sans raison, le code devient plus cérémonieux que clair. Je réserve donc `Result` aux opérations dont l'échec fait partie du comportement normal, et je garde les exceptions pour les erreurs inattendues. Le [guide d'API de fptk](https://github.com/mhbxyz/fptk/blob/main/docs/examples/api-development.fr.md) montre un traitement complet avec validation, accès aux données et réponses d'erreur.
