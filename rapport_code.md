### Présentation de la configuration actuelle du code (08/12/2023)

- HTML: 
  + **index.html** : main menu du jeu
  + **game.html** : lancer le jeu


- CSS:
  + **style.css** : style du menu
  + **game_ui.css** : style du jeu


- JAVASCRIPT (path: js/):
  
  - **menu/** contient tous les fichiers JavaScript liés à la configuration du menu
    + **menu_background.js** : Exécuter l'image d'arrière+plan pour le menu principal
    + **menu_buttons.js** : Exécuter les buttons
    + **menu_credits.js** : Exécuter la page crédits du menu
    + **menu_settings.js** : Exécuter la page des paramètres du menu
    + **menu_pause.js** : Exécuter la page de pause du jeu
  


  - **game/** contient tous les fichiers JavaScript du jeu
    - **levels_setup.js** : gérer les niveaux de jeu
    - **stats.js** : gérer les attributs, les données pour sauvegarder et charger le jeu
    

    - **baselevel/** exemple pour le système exécuter un niveau du jeu (Référer directement à partir de cette YouTube tuto [How To Write A JavaScript Platformer](https://www.youtube.com/playlist?list=PLcN6MkgfgN4CpMUgWEM5d70ANMWgcmBp8))
      + **controller.js** : le contrôleur alerte uniquement l'utilisateur chaque fois qu'il appuie sur une touche, mais il définit également la classe ButtonInput, qui est utilisée pour suivre l'état des boutons
      + **display.js** : gestionnaire d'événements de redimensionnement d'écran et gère également dessiner les couleurs dans le tampon, puis dans l'écran
      + **game.js** : logique pour le niveau du jeu, progressivement modifiez
      + **engine.js** : il s'agit d'une boucle de jeu à pas de temps fixe
      + **main.js** : Il s'agit de la configuration de base ou "squelette" de programme. 
        Il comporte trois parties principales : le contrôleur, l’affichage et la logique du jeu. 
        Il dispose également d'un moteur qui combine le trois parties logiques qui sont par ailleurs complètement distinctes. 
        Séparer le code en logique groupes est aussi un principe de programmation orientée objet, qui se prête à code compréhensible et maintenable ainsi que modularité.
    

    - **lvl1/** Le premier niveau du jeu (Les fichiers sont déjà expliqués dans **baselevel/**)
      + **controller-01.js** 
      + **display-01.js** 
      + **game-01.js** 
      + **main-01.js** 
  

    - **lvl2/** Le 2ème niveau du jeu
      + **controller-02.js** 
      + **display-02.js** 
      + **game-02.js** 
      + **main-02.js** 


  - **effects/** contient tous les fichiers JavaScript liés aux effets visuels du projet
    + **butterfly.js** : Exécuter au hassard de 1 à 4 papillons en mouvement sur l'écran
    + **fireflies.js** : Exécuter de petits cercles de lumière qui se déplacent de manière aléatoire sur l'écran
    + **fog.js** : Exécuter l'image de brouillard en mouvement en bas de l'écran
    + **transition.js** : L'écran s'assombrit progressivement pour changer de scéne
  

  - **sound/** contient les fichiers JavaScript liés à l'audio du projet
    + **music.js** : contient de la musique de font et des fonctions pour les utiliser
    + **sound.js** : contient de les sons et des fonctions pour les utiliser
