---
translationKey: openwatchparty-algorithmes-synchronisation
title: "OpenWatchParty : synchroniser la lecture malgré la latence"
date: 2026-10-19
tags: ["Jellyfin", "Synchronisation", "Vidéo", "Systèmes distribués"]
author: "Manoah B."
draft: false
description: "Horloges, actions programmées, correction de dérive et mise en tampon HLS : les choix techniques derrière la lecture synchronisée d'OpenWatchParty."
---

Dans mon [premier article sur OpenWatchParty](/fr/articles/openwatchparty-visionnage-synchronise-pour-jellyfin/), je présentais le plugin Jellyfin et son serveur de session Rust. Restait la question la plus difficile : comment faire jouer la même scène au même moment sur plusieurs machines, alors que leurs horloges, leurs réseaux et leurs lecteurs ne réagissent pas de la même façon ?

## Se donner une horloge commune

Le serveur ne peut pas supposer que l'heure affichée par deux ordinateurs est identique. Le client lui envoie donc un ping horodaté. Au retour, il mesure le temps aller-retour et estime le décalage entre son horloge et celle du serveur. Plusieurs mesures sont lissées pour qu'une pointe de latence ne provoque pas un saut brutal.

Quand une personne lance la lecture, le serveur peut ensuite annoncer une **heure cible** dans sa propre horloge. Chaque client calcule combien de temps il lui reste avant cette heure et programme l'action. Ce petit délai laisse aussi une marge au chargement de la vidéo. L'objectif est que les lecteurs démarrent ensemble, plutôt que de démarrer chacun dès la réception du message WebSocket.

## Corriger une position qui vieillit en transit

Un message « position : 120 secondes » est déjà ancien quand il arrive. Le client estime le temps écoulé depuis son envoi et avance la position attendue d'autant. Il compare ensuite cette position avec `video.currentTime`.

Pour un petit écart, OpenWatchParty ne fait rien. Un lecteur oscille naturellement de quelques millisecondes ; corriger chaque variation créerait davantage de mouvements que de précision. Pour un écart modéré, il ajuste temporairement `playbackRate` dans une plage bornée. Quand l'écart devient trop grand, il fait un saut vers la bonne position. Cette correction progressive évite d'interrompre l'image à chaque dérive tout en permettant un rattrapage visible.

## Le cas particulier du HLS

Avec un flux HLS transcodé, le lecteur télécharge des segments. Pendant la mise en tampon, un état `paused` ou une position qui recule peut refléter le chargement, pas une décision de la personne devant l'écran. Si le client renvoie ce faux événement au serveur, tous les participants risquent de recevoir une pause injustifiée.

Le client filtre donc les événements pendant certaines opérations de synchronisation et pendant la mise en tampon. Le serveur ignore aussi des mises à jour transitoires juste après une commande et écarte de petits reculs de position. Lorsqu'un participant rejoint la séance, un mécanisme d'attente laisse au média le temps d'être prêt avant de lancer la lecture commune.

## Une synchronisation qui reste observable

La synchronisation n'est pas un état binaire. Un invité peut encore être en retard pendant qu'un segment charge, ou avoir besoin d'un ajustement local. L'interface peut montrer cet écart et proposer un petit déplacement dans la zone déjà mise en tampon, sans changer la position du salon pour les autres.

Ces choix sont détaillés dans la [documentation des algorithmes](https://github.com/mhbxyz/OpenWatchParty/blob/main/docs/technical/sync.md). Ils ne garantissent pas une précision parfaite sur tous les réseaux. Ils rendent surtout le comportement prévisible : une horloge de référence, des corrections proportionnées et des protections contre les faux événements du lecteur.
