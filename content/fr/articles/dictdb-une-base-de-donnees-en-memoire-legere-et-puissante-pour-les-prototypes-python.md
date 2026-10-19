---
translationKey: dictdb
title: "DictDB : une base de données en mémoire légère pour Python"
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

- **Aucune configuration** : importez la bibliothèque et utilisez-la. Aucun serveur à installer.
- **DSL de requêtes** : interface fluide avec opérateurs Python (`table.age >= 18`).
- **Indexation** : index de hachage pour des recherches en O(1), index triés pour les recherches par plage.
- **Schémas optionnels** : validation des types lorsque c’est nécessaire.
- **Persistance** : sauvegarde et chargement en JSON ou Pickle, en mode synchrone ou asynchrone.
- **Sauvegardes automatiques** : prise en charge des sauvegardes périodiques et incrémentales.
- **Accès concurrents** : verrous lecteur-écrivain pour protéger les opérations simultanées.
- **Dépendances minimales** : seul `sortedcontainers` est requis.

## Installation

```bash
pip install dctdb
```

> Note : le paquet PyPI s’appelle `dctdb`, mais le module à importer est `dictdb`.

**Prérequis** : Python 3.13+

## Exemple rapide

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

| Solution       | Léger | Schéma  | Requêtes complexes | Persistance |
|----------------|:-----:|:-------:|:------------------:|:-----------:|
| `dict` natif   | Oui   | Non     | Non                | Non         |
| TinyDB         | Oui   | Partiel | Partiel            | Oui         |
| SQLite         | Non   | Oui     | Oui                | Oui         |
| **DictDB**     | Oui   | Oui     | Oui                | Oui         |

## Ressources

- **Documentation** : https://mhbxyz.github.io/dictdb/
- **GitHub** : https://github.com/mhbxyz/dictdb
- **Licence** : Apache License 2.0
