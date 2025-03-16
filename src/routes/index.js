import { createRouter, createWebHistory } from "vue-router";
import gestionutilisateur from './mesRoute.js' // Assurez-vous que ce fichier contient un tableau de routes valide.

// Fusionner toutes les routes
const regroupementDesRoutes = [
    gestionutilisateur,  // Vous pouvez ajouter ici d'autres routes si nécessaire
];

// Fusionner les routes dans un seul tableau
const routes = [].concat(...regroupementDesRoutes);

const router = createRouter({
    history: createWebHistory(),
    routes,
});

// Gestion de l'authentification avec redirection avant chaque navigation
router.beforeEach((to, from, next) => {
    const publicPages = ['/connexion']; // Définir les pages publiques accessibles sans authentification
    const authRequired = !publicPages.includes(to.path); // Vérifier si la page nécessite une authentification
    const loggedIn = !!localStorage.getItem('token'); // Utiliser '!!' pour s'assurer qu'on a un booléen (true/false)

    // Si la page ne nécessite pas d'authentification et que l'utilisateur n'est pas connecté
    if (!authRequired && !loggedIn) {
        next(); // Permet de naviguer vers la page publique (comme /connexion)
    } else {
        // Si l'utilisateur n'est pas connecté et essaie d'accéder à une page protégée
        if (!loggedIn) {
            next('/connexion'); // Redirige vers la page de connexion
        } else {
            // Si l'utilisateur est déjà connecté et tente d'aller sur la page de connexion
            if (to.path === '/connexion') {
                next({ name: 'presentation' }); // Redirige vers la page d'accueil
                return; // Empêche la navigation vers la page de connexion
            }
            next(); // Permet d'aller sur la page protégée
        }
    }
});

export default router;
