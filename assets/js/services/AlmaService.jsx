import { BO_URL, ALMA_API } from "../config";
import Axios from "axios";

/**
 * Recupere un article en base
 * @param {integer} id
 */
function find(id = 1) {
  return Axios.get(`${BO_URL}/articles/${id}`).then(
    (response) => response.data
  );
}

/**
 * Ajoute un article au panier
 * @param {object} article
 * @param {integer} qte
 */
function insert(article, qte) {
  return Axios.post(`${BO_URL}/paniers`, {
    quantity: +qte,
    productId: `/api/articles/${article.id}`,
  });
}

/**
 * Récupere le paneir en cours
 */
function findAll() {
  return Axios.get(`${BO_URL}/paniers`).then(
    (response) => response.data["hydra:member"]
  );
}

/**
 * Vide le panier
 * @param {object} paniers
 */
function clear(paniers) {
  paniers.forEach(function (panier) {
    Axios.delete(`${BO_URL}/paniers/${panier.id}`);
  });
  return true;
}

/**
 * Envoi les infos de paiement a alma pour éligilité
 * @param {integer} total
 */
function eligibility(total) {
  return Axios.post(`${ALMA_API}payments/eligibility`, {
    payment: {
      purchase_amount: total * 100, // Montant de l'achat, en centimes
      installments_counts: [3, 4], // Nombres d'échéances à évaluer
    },
  });
}

/**
 * Procede au paiement chez Alma
 * @param {integer} total
 * @param {integer} count
 */
function paiement(total, count) {
  const price = total * 100;
  return Axios.post(`${ALMA_API}payments`, {
    payment: {
      // Infos du paiement
      purchase_amount: +price, // Montant de l'achat en centimes
      installments_count: +count, // Nombre d'échéances à appliquer
      return_url: "http://127.0.0.1:8000/#/confirm-order", // URL vers laquelle renvoyer le client après paiement
      shipping_address: {
        // Adresse de livraison
        line1: "2 rue de la Paix", // Numéro et rue
        postal_code: "75008", // Code postal
        city: "Paris", // Ville
      },
    },
    customer: {
      // Infos du client
      first_name: "Jane", // Prénom
      last_name: "Doe", // Nom
      email: "janedoe@dummy.com", // Email
      phone: "+33607080900", // Téléphone
    },
  });
}

/**
 * Récupere un paiement depuis l'api Alma
 * @param {integer} id
 */
function getCmd(id) {
  return Axios.get(`${ALMA_API}payments/${id}`).then(
    (response) => response.data
  );
}

/**
 * Supprime un item du panier
 * @param {integer} id
 */
function remove(id) {
  return Axios.delete(BO_URL + "/paniers/" + id).then(async (response) => {
    response;
  });
}

export default {
  find,
  insert,
  findAll,
  clear,
  eligibility,
  paiement,
  getCmd,
  remove,
};
