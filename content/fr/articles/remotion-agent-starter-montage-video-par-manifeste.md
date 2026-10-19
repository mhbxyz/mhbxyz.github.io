---
translationKey: remotion-agent-starter-manifeste
title: "Remotion Agent Starter : décrire un montage vidéo par un manifeste"
date: 2026-08-07
tags: ["Agents IA", "Remotion", "Vidéo", "Automatisation"]
author: "Manoah B."
draft: false
description: "Un manifeste JSON pour décrire le montage, une validation Zod pour en fixer les limites et React pour produire les images."
---

## Un montage que l'on peut relire

Quand un montage se résume à une succession de clics dans une interface, il est difficile de comprendre ce qui a changé entre deux versions. Il devient encore plus difficile de demander à un agent de modifier une scène sans toucher au reste. Avec [Remotion Agent Starter](https://github.com/mhbxyz/remotion-agent-starter), j'ai voulu placer les décisions éditoriales courantes dans un manifeste JSON que l'on peut lire, vérifier et versionner.

Le manifeste décrit les scènes, leur durée, les médias et les transitions. React et Remotion se chargent du rendu. Cela donne une séparation simple : les données disent **quoi** monter ; les composants décident **comment** chaque image apparaît.

## Les images comme unité de temps

Une scène de titre peut demander `120` images dans une composition à `30` images par seconde : elle dure alors quatre secondes. Si une transition de `18` images relie deux scènes de `120` images, la durée totale est `120 + 120 - 18`, soit `222` images. La transition chevauche les deux scènes ; elle ne s'ajoute pas à la fin.

Ce calcul est moins ambigu qu'une suite de durées approximatives en secondes. Il rend aussi les changements visibles dans une revue de code : on sait précisément si une scène a été raccourcie ou si une transition a été allongée.

Le projet prend aujourd'hui en charge des scènes de titre, de citation et de média, ainsi que des transitions de fondu ou de glissement. Trois compositions couvrent les formats paysage, portrait et carré. C'est un vocabulaire volontairement limité, assez utile pour des montages répétitifs sans prétendre décrire tous les effets possibles.

## Valider avant de rendre

Le schéma Zod vérifie le manifeste au moment de l'exécution : types, références aux médias et identifiants de scènes en double. Les médias d'origine restent séparés des fichiers servis à Remotion ; une étape d'ingestion prépare les ressources utilisées par le rendu. Les commandes renvoient des résultats structurés, afin qu'un outil ou un agent puisse savoir ce qui a réussi et ce qui a échoué.

Cette frontière compte davantage que le mot « agent ». Un agent peut proposer une modification du manifeste, mais il doit passer par la même validation que nous. S'il faut un comportement visuel que le manifeste ne sait pas exprimer, on modifie alors un composant React, de façon explicite.

## Ce que le projet fait aujourd'hui

Le dépôt fournit les outils de préparation, de validation et de rendu. Il faut toutefois distinguer les deux entrées actuelles : le manifeste JSON d'exemple sert aux commandes, tandis que Remotion Studio charge les propriétés définies dans `src/example-project.ts`. Ouvrir le Studio ne charge pas automatiquement le JSON.

C'est une limite utile à connaître avant d'automatiser un flux complet. L'[architecture du projet](https://github.com/mhbxyz/remotion-agent-starter/blob/main/docs/architecture.md) décrit précisément cette séparation. Mon objectif est d'avoir un montage dont les choix ordinaires sont inspectables, et dont les exceptions restent du vrai code.
