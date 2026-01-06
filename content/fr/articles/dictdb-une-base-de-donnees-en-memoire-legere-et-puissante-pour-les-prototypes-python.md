---
title: "DictDB : Une base de données en mémoire légère et puissante pour les prototypes Python"
date: 2025-04-19
tags: ["Python", "Base de Données en Mémoire", "Prototypage", "Outils Développeur"]
author: "Manoah B."
draft: false
---

![Logo DictDB](https://raw.githubusercontent.com/mhbxyz/dictdb/main/docs/DictDBLogo.png)

## Pourquoi DictDB ?
Lorsque vous créez un prototype, rédigez des tests unitaires ou validez une logique métier, vous avez besoin d’un stockage de données aussi agile que votre code. SQLite peut sembler lourd et verbeux ; les dictionnaires Python simples manquent de structure, de schéma et de capacités de requêtage avancées. **DictDB** comble ce fossé : une base de données 100 % en mémoire, qui s'appuie sur les dictionnaires, avec une syntaxe inspirée du SQL, l'application de schémas, l’indexation, les transactions et une persistance optionnelle — le tout sans installer ni configurer de serveur séparé.

## 🚀 Avantages Clés

- **Zéro Configuration** : Importez et utilisez. Pas de serveur, pas de fichiers (sauf si vous souhaitez sauvegarder).
- **API Familier** : CRUD à la sauce SQL via un DSL fluide et pythonique (`table.select(...)`, `table.insert(...)`).
- **Validation de Schéma** : Définissez types et contraintes pour détecter les erreurs tôt.
- **Haute Performance** : Indexes automatiques par hash et triés pour accélérer les recherches.
- **Transactions Atomiques** : Les mises à jour groupées se rétractent en cas d’échec, préservant l’intégrité.
- **Persistance Légère** : Sauvegarde/restauration en JSON ou pickle (synchrone/asynchrone).
- **Journalisation Riche** : Intégrée avec Loguru pour le debug, l’audit et la traçabilité.

## 🔧 Installation

~~~bash
# Depuis la source (version développeur)
git clone https://github.com/mhbxyz/dictdb.git
cd dictdb
pip install .

# Future version sur PyPI
pip install dictdb
~~~

## 🎯 Concepts Clés

| Composant           | Responsabilité                                      |
|---------------------|-----------------------------------------------------|
| **DictDB**          | Gère plusieurs tables en mémoire                    |
| **Table**           | Contient les enregistrements, schéma, index et logique CRUD |
| **Field & Query**   | Construit des conditions de type SQL avec des opérateurs Python |
| **Index**           | HashIndex & SortedIndex pour des recherches rapides |
| **BackupManager**   | Persistance périodique automatisée ou à la demande  |

## 💡 Exemple de Démarrage Rapide

~~~python
from dictdb import DictDB, Query, configure_logging

# Activez la journalisation en mode debug vers la console
configure_logging(level="DEBUG", console=True)

# 1️⃣ Créer une base et une table
db = DictDB()
db.create_table("employees", primary_key="emp_id")
employees = db.get_table("employees")

# 2️⃣ Insérer des enregistrements (emp_id auto-attribué si absent)
employees.insert({"emp_id": 101, "name": "Alice", "dept": "IT"})
employees.insert({"emp_id": 102, "name": "Bob",   "dept": "HR"})
employees.insert({           "name": "Charlie", "dept": "IT"})  # emp_id=103

# 3️⃣ Requête avec filtres et projections
it_staff = employees.select(
    columns=["emp_id","name"],
    where=Query(employees.dept == "IT")
)
print(it_staff)

# 4️⃣ Mise à jour et suppression
employees.update(
    {"dept": "Engineering"},
    where=Query(employees.name == "Alice")
)
employees.delete(where=Query(employees.name == "Bob"))

# 5️⃣ Sauvegarde en JSON
from pathlib import Path
backup = Path("./backup.json")
db.save(backup, file_format="json")

# 6️⃣ Chargement ultérieur
restored = DictDB.load(backup, file_format="json")
~~~

## ⚖️ Comparaison des Fonctionnalités

| Solution             | Léger        | Schéma  | Requêtes Complexes | Persistance |
|----------------------|:------------:|:-------:|:------------------:|:-----------:|
| `dict` natif         | ✔️           | ❌      | ❌                 | ❌          |
| TinyDB               | ✔️           | Partiel | Partiel            | ✔️          |
| SQLite               | ❌           | ✔️      | ✔️                 | ✔️          |
| **DictDB**           | ✔️           | ✔️      | ✔️                 | ✔️          |

## 🏗️ Sous le Capot

1. **Enregistrements & Schéma** : Les tables stockent des dictionnaires Python ; un schéma optionnel impose types et présence des champs.  
2. **Index** : Créez des index par hash ou triés. Les requêtes par égalité simples utilisent O(1), les plages utilisent bisect.  
3. **Conditions & Query** : Les opérateurs surchargés (`==, !=, <, >, &, |, ~`) génèrent un AST composable de prédicats.  
4. **Transactions** : Les mises à jour collectent des sauvegardes, valident le nouvel état ; rollback sur toute erreur (de schéma ou autre).  
5. **Persistance** : `save`/`load` supportent JSON (lisible) et pickle (rapide, natif Python), synchrone ou asynchrone.  
6. **BackupManager** : En arrière-plan threadé ou à la demande, écrit des snapshots horodatés.

## 🚧 Feuille de Route

1. **JOINs & Sous-Requêtes** : Requêtes entre tables avec une syntaxe de style SQL.  
2. **Fonctions d’Agrégation** : `COUNT`, `SUM`, `AVG` sur les résultats.  
3. **Parseur SQL Avancé** : Analyse de chaînes SQL vers des appels DSL.  
4. **Contrôle de Concurrence** : Verrous, MVCC pour la sécurité multi-thread/process.  
5. **CLI & GUI** : Shell interactif et tableau de bord web pour l’exploration ad hoc.

## 🤝 Contribuer

DictDB est sous licence MIT et open source. Vos retours, rapports de bugs et pull requests sont les bienvenus !

- **GitHub** : https://github.com/mhbxyz/dictdb  
- **Issues** : https://github.com/mhbxyz/dictdb/issues
