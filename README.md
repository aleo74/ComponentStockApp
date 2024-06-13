## Prérequis

- Node.js et npm : [Télécharger et installer Node.js](https://nodejs.org/)
- Ionic CLI : 
    ```bash
    npm install -g @ionic/cli
    ```
- Capacitor CLI :
    ```bash
    npm install -g @capacitor/cli
    ```
- Android Studio : [Télécharger et installer Android Studio](https://developer.android.com/studio)

## Installation

Clonez ce dépôt, puis installez les dépendances :

```bash
git clone https://github.com/aleo74/ComponentStockApp.git
cd ComponentStockApp
npm install
```

## Développement
Pour démarrer le serveur de développement Ionic :
```bash
ionic cap run android -l --external
```

Pour debug l'app sur android avec google chrome :
chrome://inspect#devices


## Génération de l'APK
1. **Construire l'application Ionic** :
    ```bash
    ionic build --prod
    ```

2. **Ajouter Android comme plateforme Capacitor** (à faire une seule fois) :
    ```bash
    npx cap add android
    ```

3. **Synchroniser Capacitor** :
    ```bash
    npx cap sync
    ```

4. **Ouvrir le projet Android dans Android Studio** :
    ```bash
    npx cap open android
    ```

5. **Construire l'APK dans Android Studio** :
    - Allez à `Build > Build Bundle(s) / APK(s) > Build APK(s)`.

6. **Déployer sur un appareil Android** :
    - Connectez votre appareil Android et cliquez sur "Run" dans Android Studio.