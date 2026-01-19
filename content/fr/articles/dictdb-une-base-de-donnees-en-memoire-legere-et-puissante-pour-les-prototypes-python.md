---
title: "DictDB : Une base de données en mémoire légère pour Python"
date: 2025-04-19
tags: ["Python", "Base de Données en Mémoire", "Prototypage", "Outils Développeur"]
author: "Manoah B."
draft: false
description: "Une base de données en mémoire pour Python avec CRUD façon SQL, schémas optionnels, indexation et persistance."
---

![Logo DictDB](https://raw.githubusercontent.com/mhbxyz/dictdb/main/docs/DictDBLogo.png)

## Pourquoi DictDB ?

Lors du prototypage ou de l'écriture de tests, vous avez besoin d'un stockage aussi agile que votre code. SQLite semble lourd ; les dictionnaires simples manquent de structure et de requêtage. **DictDB** comble ce fossé : une base en mémoire, basée sur les dictionnaires, avec du CRUD façon SQL, des schémas optionnels, de l'indexation et de la persistance. Pas besoin de serveur.

## Fonctionnalités

- **Zéro Configuration** : Importez et utilisez. Pas de serveur, pas de setup.
- **DSL de Requêtes** : Interface fluide avec opérateurs Python (`table.age >= 18`).
- **Indexation** : Index hash pour des lookups O(1), index triés pour les plages.
- **Schémas Optionnels** : Validation de types quand nécessaire.
- **Persistance** : Sauvegarde/chargement en JSON ou Pickle (sync et async).
- **Sauvegardes Automatiques** : Support des backups périodiques et incrémentaux.
- **Thread Safety** : Verrous lecteur-écrivain pour les accès concurrents.
- **Dépendances Minimales** : Seul `sortedcontainers` est requis.

## Installation

```bash
pip install dctdb
```

> Note : Le package PyPI est `dctdb`, mais l'import est `dictdb`.

**Prérequis** : Python 3.13+

## Exemple Rapide

```python
from dictdb import DictDB, Condition

db = DictDB()
db.create_table("users", primary_key="id")
users = db.get_table("users")

# Insertion
users.insert({"name": "Alice", "age": 30, "role": "admin"})
users.insert({"name": "Bob", "age": 25, "role": "user"})

# Sélection avec conditions
admins = users.select(where=Condition(users.role == "admin"))

# Mise à jour
users.update({"age": 31}, where=Condition(users.name == "Alice"))

# Suppression
users.delete(where=Condition(users.name == "Bob"))

# Persistance
db.save("data.json", file_format="json")
```

## Comparaison

| Solution       | Léger | Schéma  | Requêtes Complexes | Persistance |
|----------------|:-----:|:-------:|:------------------:|:-----------:|
| `dict` natif   | Oui   | Non     | Non                | Non         |
| TinyDB         | Oui   | Partiel | Partiel            | Oui         |
| SQLite         | Non   | Oui     | Oui                | Oui         |
| **DictDB**     | Oui   | Oui     | Oui                | Oui         |

## Ressources

- **Documentation** : https://mhbxyz.github.io/dictdb/
- **GitHub** : https://github.com/mhbxyz/dictdb
- **Licence** : Apache License 2.0
