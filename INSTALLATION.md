# Dreams Home Concept — Coût de revient
## Guide d'installation

L'application est un site web autonome. Elle s'installe en deux temps :
d'abord la mise en ligne sur GitHub Pages, puis le branchement de la
sauvegarde Google Drive. Comptez une trentaine de minutes la première fois.

---

## Les fichiers

| Fichier | Rôle |
|---|---|
| `index.html` | L'application entière (logo inclus) |
| `manifest.json` | Permet l'ajout à l'écran d'accueil |
| `sw.js` | Fonctionnement hors connexion |
| `icon-192.png` | Icône |
| `icon-512.png` | Icône |
| `icon-maskable-512.png` | Icône Android (forme adaptable) |
| `apple-touch-icon.png` | Icône iPhone / iPad |
| `Code.gs` | Script de sauvegarde, à coller côté Google |

Les sept premiers vont sur GitHub. Le dernier va dans Google.

---

## 1. Mise en ligne sur GitHub Pages

1. Créer un dépôt GitHub, par exemple `dhc-cout`. Le laisser **public**
   (GitHub Pages gratuit ne publie pas les dépôts privés).
2. Onglet **Code** du dépôt, bouton **Add file > Upload files**.
3. Glisser les **sept fichiers** (tout sauf `Code.gs`), à la racine,
   sans créer de dossier.
4. En bas, cliquer **Commit changes**.
5. Onglet **Settings > Pages**. Sous **Branch**, choisir **main**,
   laisser le dossier sur **/ (root)**, cliquer **Save**.
6. Patienter une à deux minutes, rafraîchir : l'adresse du site
   s'affiche, du type `https://<compte>.github.io/dhc-cout/`.

C'est l'adresse à ouvrir sur l'ordinateur et le téléphone.

---

## 2. Sauvegarde Google Drive

Sans cette étape, l'application fonctionne mais garde les données
uniquement sur l'appareil. Reliée à un Google Sheet, elle retrouve les
mêmes chiffres partout et tient un historique.

1. Créer un **Google Sheets** dans le Drive de DHC, par exemple
   « DHC — Coût de revient ».
2. Menu **Extensions > Apps Script**. Effacer le contenu par défaut,
   coller tout le fichier `Code.gs`, puis **Enregistrer**.
3. La clé partagée est déjà réglée sur `dhc-cout-2026` en haut du
   script. La changer si vous le souhaitez, en la notant.
4. Bouton **Déployer > Nouveau déploiement**.
   - Type : **Application web**
   - Exécuter en tant que : **Moi**
   - Accès : **Tout le monde**
5. Autoriser l'accès quand Google le demande. Si un avertissement
   s'affiche, passer par **Paramètres avancés > Accéder au projet**.
6. Copier l'adresse qui se termine par `/exec`.

Dans l'application, page **Paramètres > Sauvegarde**, coller cette
adresse et la clé. À faire une fois sur l'ordinateur, une fois sur le
téléphone. Ces informations restent sur l'appareil et ne sont jamais
publiées.

> Après toute modification du script, refaire **Déployer > Gérer les
> déploiements > modifier > Nouvelle version**, sinon l'ancienne version
> reste active.

---

## 3. Installer sur le téléphone

**iPhone / iPad** — ouvrir l'adresse **dans Safari** (obligatoire),
bouton Partager en bas, puis « Sur l'écran d'accueil ». Depuis Chrome
ou Firefox sur iPhone, c'est impossible : Apple ne l'autorise que dans
Safari.

**Android** — ouvrir l'adresse dans Chrome, menu en haut à droite,
« Installer l'application ». Un bouton apparaît aussi dans la page
Paramètres de l'application.

---

## Mises à jour

Pour modifier l'application plus tard, remplacer `index.html` sur
GitHub. Aucun numéro de version à changer : à la prochaine ouverture
connectée, chaque appareil récupère la nouvelle version tout seul.

En cas d'affichage figé sur une ancienne version, la page Paramètres
contient un bouton « Vider le cache et recharger ». Les données saisies
ne sont pas effacées.

---

## Bon à savoir

- Chaque société a besoin de **son propre dépôt** et de **son propre
  Google Sheet**. Ne pas réutiliser ceux d'une autre application.
- L'accès Google « Tout le monde » signifie que quiconque possède
  l'adresse `/exec` peut lire et écrire. La clé partagée filtre les
  appels. C'est adapté à un outil interne dont l'adresse n'est pas
  diffusée.
- Le total des charges affiché par l'application (**74 919,86 €**) est
  supérieur de 360 € à celui du fichier Excel d'origine : la formule du
  fichier oublie la ligne « Assurances local ». L'application, elle,
  additionne bien les 16 postes.
