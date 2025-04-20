---
title: "Automatisation de la génération de clés SSH avec ssh-keybuild"
date: 2025-04-19
tags: ["automation", "shell", "ssh"]
author: "Manoah BERNIER"
draft: false
---

## Introduction
La gestion manuelle de vos clés SSH peut vite devenir laborieuse, surtout lorsque l’on travaille sur plusieurs projets ou hôtes distants. Avec **ssh-keybuild**, j’ai voulu créer un outil simple, robuste et polyvalent pour :

- Générer des clés **ed25519** ou **rsa** en un clin d’œil
- Ajouter automatiquement la clé à un agent SSH
- Copier la clé publique dans le presse-papier
- Mettre à jour votre `~/.ssh/config` sans duplications

Dans cet article, nous décortiquons les principales fonctionnalités du script et comment l’adopter en quelques minutes.

## Où trouver le script
Le code complet est disponible sur GitHub :
[ssh-keybuild.sh](https://github.com/mhbxyz/useful-shell-scripts/blob/main/ssh-keybuild.sh)

## Installation rapide
Clonez simplement le script quelque part dans votre PATH, par exemple :
~~~shell
git clone https://github.com/mhbxyz/useful-shell-scripts.git ~/.local/bin/useful-shell-scripts
ln -s ~/.local/bin/useful-shell-scripts/ssh-keybuild.sh ~/.local/bin/ssh-keybuild
chmod +x ~/.local/bin/ssh-keybuild
~~~

## Usage et options
~~~shell
ssh-keybuild -e email@example.com \
             [-n nom_de_la_cle] \
             [-t ed25519|rsa] \
             [-m "Mon commentaire"] \
             [-p true|false] \
             [-c true|false] \
             [-h hostname.com] \
             [-a alias]
~~~
- **-e** (requis) : adresse e‑mail associée
- **-n** : nom du fichier clé (défaut `id_key`)
- **-t** : type de clé (`ed25519` par défaut, ou `rsa`)
- **-m** : commentaire à inclure
- **-p** : ajouter à l’agent SSH (`false` par défaut)
- **-c** : copier la clé publique (`true` par défaut)
- **-h** : hôte à insérer dans `~/.ssh/config`
- **-a** : alias pour l’hôte (par défaut, même que l’hôte)

## Fonctionnalités avancées
1. **Génération conditionnelle**
   Le script détecte automatiquement votre choix de type de clé et adapte la commande `ssh-keygen`.
2. **Sécurité par défaut**
   Le répertoire `~/.ssh` est créé avec les bons permissions (`700`), et le fichier `config` reçoit `600`.
3. **Idempotence de la config**
   Avant d’ajouter un bloc `Host`, le script vérifie qu’il n’existe pas déjà, pour éviter toute duplication.

## Exemple concret
~~~shell
ssh-keybuild -e moi@exemple.com -t rsa -m "Usage pro" -p true -h github.com
~~~

En moins de 30 secondes, votre nouvelle clé RSA 4096 bits est générée, ajoutée à l’agent, copiée dans le presse‑papier et votre config SSH se met à jour.

## Conclusion
**ssh-keybuild** vous fait gagner un temps précieux et élimine les erreurs manuelles. Si, comme moi, vous gérez plusieurs clés et hôtes, ce script deviendra vite indispensable !
