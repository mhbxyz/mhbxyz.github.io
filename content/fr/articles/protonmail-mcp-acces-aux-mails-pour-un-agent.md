---
translationKey: protonmail-mcp-securite
title: "protonmail-mcp : donner accès à ses mails à un agent sans lui donner carte blanche"
date: 2026-10-13
tags: ["Agents IA", "MCP", "Proton Mail", "Sécurité"]
author: "Manoah B."
draft: false
description: "Lecture par défaut, capacités activées explicitement et confirmation des modifications : le modèle de sécurité de protonmail-mcp."
---

## Un e-mail est une entrée non fiable

Demander à un agent de résumer mes messages est pratique. Mais le contenu de ces messages a été écrit par d'autres personnes. Un expéditeur peut y glisser des instructions destinées à l'agent : envoyer des données ailleurs, effacer un message ou ignorer la demande initiale. Donner à l'agent un accès complet à la boîte transforme alors une simple lecture en risque d'action.

J'ai construit [protonmail-mcp](https://github.com/mhbxyz/protonmail-mcp) autour de cette frontière. Le serveur relie un client MCP à Proton Mail au moyen de Proton Bridge, qui expose localement IMAP et SMTP. Il présente des outils précis à l'agent, au lieu de lui laisser envoyer des commandes IMAP ou SMTP arbitraires.

## Commencer par la lecture

Le mode par défaut est `read`. Il permet de lister les dossiers, chercher et lire des messages, suivre une conversation ou obtenir un résumé. Les boîtes IMAP sont ouvertes en lecture seule ; consulter un message par cet outil ne modifie même pas son indicateur `\Seen`.

Les autres capacités sont activées explicitement : brouillons, organisation, envoi, puis suppression. Les outils d'une capacité désactivée ne sont pas enregistrés auprès du client MCP. Les règles vivent côté serveur, dans la configuration et la politique, et non dans une simple phrase demandant au modèle de bien se comporter.

## Une action en deux temps

Pour une modification, le serveur sépare la préparation de l'exécution. `prepare_*` montre ce qui va changer et produit un jeton temporaire à usage unique, lié au contenu exact de l'action. `commit_*` vérifie ce jeton avant d'agir. Si le contenu change entre les deux étapes, la confirmation ne vaut plus.

L'envoi ajoute des limites : destinataires autorisés, quotas, taille du message et garde-fous contre les boucles de réponses automatiques. La suppression définitive exige une confirmation supplémentaire et ne traite qu'un message de la corbeille à la fois. Un agent qui lit une instruction hostile dans un e-mail ne peut pas s'accorder lui-même ces capacités dans la politique du serveur.

## Où se trouve encore la confiance ?

Ce modèle réduit les actions possibles ; il ne rend pas le contenu des e-mails digne de confiance. Le choix du client MCP, du modèle et des données qui lui sont transmises compte toujours. De même, l'index de recherche local est facultatif et stocke du texte de messages en clair dans SQLite : il faut décider si cette copie convient à son usage.

Je préfère décrire ces limites ouvertement. La [politique de sécurité du dépôt](https://github.com/mhbxyz/protonmail-mcp/blob/main/SECURITY.md) détaille le modèle de menace, les confirmations et les actions volontairement exclues. La question utile n'est pas seulement « l'agent peut-il lire mes mails ? », mais « que pourra-t-il faire si un mail essaie de lui donner des ordres ? »
