---
translationKey: agentic-engineering-wiki-harness
title: "Rendre un dépôt utilisable par un agent de développement"
date: 2026-09-03
tags: ["Agents IA", "Développement", "Outillage", "Reproductibilité"]
author: "Manoah B."
draft: false
description: "Des consignes de dépôt, des commandes vérifiables et des permissions explicites pour rendre le travail d'un agent reproductible."
---

## Le dépôt doit expliquer comment travailler

Un agent peut lire le code, mais cela ne lui indique pas quelle commande lance les tests, quelles migrations sont sensibles ou ce qui constitue une modification terminée. Un humain qui arrive sur le projet se pose les mêmes questions. J'ai rassemblé dans [Agentic Engineering Wiki](https://github.com/mhbxyz/agentic-engineering-wiki) une méthode pour rendre ces réponses visibles dans le dépôt.

Le point de départ est modeste : un `AGENTS.md` court et des commandes de projet stables. Le premier formule les contraintes ; les secondes permettent de les vérifier. Ajouter des intégrations avant d'avoir ces bases multiplie surtout les chemins possibles vers une erreur.

## Écrire un contrat utile

Un bon `AGENTS.md` répond à quatre questions : que faut-il préserver, quelles commandes font autorité, quelles actions demandent une validation et quelles preuves montrent que le travail est fini ? Il doit parler du projet réel. Copier un exemple qui cite un test ou un répertoire inexistant donne une fausse confiance.

Pour les commandes, un `justfile`, un `Makefile` ou un autre lanceur offre la même interface aux humains et aux agents :

```text
just setup
just check
just test tests/unit/test_orders.py
just verify
```

Le lanceur peut appeler `uv`, npm ou un conteneur. Ce détail reste dans le dépôt, à un seul endroit. La commande de vérification doit pouvoir être relancée sans modifier silencieusement les fichiers ; le formatage qui écrit et le contrôle qui lit sont deux opérations distinctes.

## Une consigne n'est pas une permission

Écrire « ne touche pas aux secrets » dans un fichier d'instructions aide à expliquer le projet. Cela ne bloque pas techniquement un accès. Les permissions de l'outil, les identifiants à portée limitée et la protection des branches doivent porter les interdictions importantes. De la même manière, une recherche sémantique peut aider à trouver un concept, mais `rg` reste plus adapté pour retrouver toutes les occurrences exactes d'un nom.

Le wiki propose aussi des sous-agents, des compétences réutilisables et des serveurs MCP. Je les vois comme des réponses à des besoins précis, pas comme une liste à installer entièrement. Le [starter kit](https://github.com/mhbxyz/agentic-engineering-wiki/tree/main/starter-kit) donne une base pour les projets Python et backend, à adapter aux commandes et aux risques de chaque dépôt.

## Mesurer le travail terminé

Le résultat à viser n'est pas une sortie de terminal plus courte. C'est un travail correct, dont les commandes ont été exécutées, les échecs rendus visibles et les changements relus. Si un agent doit deviner le mode d'emploi à chaque intervention, améliorer son modèle ne résout qu'une partie du problème. Un dépôt qui expose clairement son interface devient plus simple à maintenir pour tout le monde.
