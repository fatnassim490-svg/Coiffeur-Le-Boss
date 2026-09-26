// ============================================
// Coiffeur Le Boss - script.js
// JS vanilla, sans dépendances externes
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  /**
   * Toggle du menu mobile (burger) : ouvre/ferme le menu plein écran
   * et anime l'icône burger en croix.
   */
  const boutonBurger = document.getElementById('menu-burger');
  const menuMobile = document.getElementById('menu-mobile');
  const liensMenuMobile = document.querySelectorAll('.menu-mobile-link');

  function toggleMenuMobile() {
    boutonBurger.classList.toggle('actif');
    menuMobile.classList.toggle('actif');
  }

  boutonBurger.addEventListener('click', toggleMenuMobile);

  // Ferme le menu mobile automatiquement après un clic sur un lien
  liensMenuMobile.forEach((lien) => {
    lien.addEventListener('click', () => {
      boutonBurger.classList.remove('actif');
      menuMobile.classList.remove('actif');
    });
  });

  /**
   * Met à jour automatiquement l'année affichée dans le footer.
   */
  const anneeCourante = document.getElementById('annee-courante');
  if (anneeCourante) {
    anneeCourante.textContent = new Date().getFullYear();
  }

  /**
   * Assombrit légèrement la navbar au scroll pour un rendu plus premium.
   */
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 40) {
      navbar.classList.add('shadow-lg', 'shadow-black/40');
    } else {
      navbar.classList.remove('shadow-lg', 'shadow-black/40');
    }
  });

  /**
   * Validation du formulaire de réservation.
   * Vérifie que les champs requis (nom, téléphone, prestation, date, heure)
   * sont bien renseignés avant d'afficher un message de confirmation simulé
   * (pas d'envoi serveur réel).
   */
  const formulaireReservation = document.getElementById('form-reservation');
  const messageConfirmation = document.getElementById('message-confirmation');

  // Vérifie un champ requis unique et affiche/masque son message d'erreur
  function validerChamp(champ) {
    const groupe = champ.closest('div');
    const erreur = groupe ? groupe.querySelector('.champ-erreur') : null;
    const estValide = champ.value.trim() !== '';

    if (!estValide) {
      champ.classList.add('champ-invalide');
      if (erreur) erreur.classList.remove('hidden');
    } else {
      champ.classList.remove('champ-invalide');
      if (erreur) erreur.classList.add('hidden');
    }

    return estValide;
  }

  if (formulaireReservation) {
    formulaireReservation.addEventListener('submit', (evenement) => {
      evenement.preventDefault();

      const champsRequis = formulaireReservation.querySelectorAll('[required]');
      let formulaireValide = true;

      champsRequis.forEach((champ) => {
        const champEstValide = validerChamp(champ);
        if (!champEstValide) formulaireValide = false;
      });

      if (formulaireValide) {
        // Simulation de confirmation (pas de vrai envoi serveur)
        const nom = document.getElementById('nom').value.trim();
        messageConfirmation.textContent = `Merci ${nom} ! Votre demande de réservation a bien été enregistrée. Nous vous contacterons rapidement pour confirmer votre créneau.`;
        messageConfirmation.classList.remove('hidden');
        formulaireReservation.reset();
      } else {
        messageConfirmation.classList.add('hidden');
      }
    });

    // Revalide un champ dès que l'utilisateur le corrige
    formulaireReservation.querySelectorAll('[required]').forEach((champ) => {
      champ.addEventListener('input', () => validerChamp(champ));
      champ.addEventListener('change', () => validerChamp(champ));
    });
  }

});