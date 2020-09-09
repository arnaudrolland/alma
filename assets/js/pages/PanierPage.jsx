import React, { useState, useEffect } from "react";
import AlmaService from "../services/AlmaService";
import { toast } from "react-toastify";
import moment from "moment";

const PanierPage = (props) => {
  const [loading, setLoading] = useState(false);
  const [paniers, setPanier] = useState([]);
  const [finalTotal, setFinalTotal] = useState(0);
  const [eligibilities, setEligibility] = useState([]);
  const [confirm, setConfirm] = useState(false);

  /**
   * Récupere le panier en cours
   */
  const fetchPanier = async () => {
    try {
      setLoading(true);
      const data = await AlmaService.findAll();
      setPanier(data);
      let ft = 0;
      data.forEach(function (panier) {
        const tt = panier.productId.price * panier.quantity;
        ft += tt;
      });
      setFinalTotal(ft);
      setLoading(false);
    } catch (err) {
      toast.error("Une erreur est survenue, impossible de charger le panier.");
    }
  };

  useEffect(() => {
    fetchPanier();
  }, []);

  /**
   * Vérification en amont si un paiment par Alma est possible ou pas
   * @param {objet} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      const data = await AlmaService.eligibility(finalTotal);
      setEligibility(data.data);
      let is_eligible = false;
      //data.data.forEach(function (data) {
      for (let i = 0; i < data.data.length; i++) {
        if (data.data[i].eligible !== false) {
          is_eligible = true;
          break;
        }
      }
      if (is_eligible) {
        toast.success("Paiment avec ALMA possible !");
      } else {
        toast.warning("Paiment avec ALMA impossible !");
      }
      setConfirm(is_eligible);
    } catch ({ response }) {
      console.log(response);
      toast.error("Une erreur est survenue");
    }
  };

  /**
   * Vide le panier
   * @param {*} event
   */
  const handleClear = async (event) => {
    event.preventDefault();
    try {
      await AlmaService.clear(paniers);
      setPanier([]);
      setFinalTotal(0);
      setEligibility([]);
      setConfirm(false);
      toast.success("Panier vidé !");
    } catch ({ response }) {
      toast.error("Une erreur est survenue");
    }
  };

  /**
   * Calcul le total du panier
   * @param {integer} mount
   * @param {integer} quantity
   */
  const calculTotal = (mount, quantity) => {
    let tt = mount * quantity;
    return tt;
  };

  /**
   * Converti le cents en euro
   * @param {integer} amount
   */
  const centsToEuro = (amount) => {
    return amount / 100;
  };

  /**
   * Converti un timestamp en date
   * @param {*} date
   */
  const tsToDate = (date) => {
    return moment.unix(date).format("MM/DD/YYYY");
  };

  /**
   * Commande a passer a l'api Alma
   * @param {*} event
   */
  const handlePaiement = async (event) => {
    event.preventDefault();
    try {
      const price = document.querySelector('input[name="etalement"]:checked')
        .value;
      try {
        const data = await AlmaService.paiement(finalTotal, price);
        window.location.href = data.data.url;
      } catch ({ response }) {
        toast.error("Une erreur est survenue");
      }
    } catch (err) {
      toast.error("Vous devez choisir un paiement");
    }
  };

  /**
   * Supprime un item du panier
   * @param {integer} id
   */
  const removeITem = async (id) => {
    try {
      await AlmaService.remove(id);
      toast.success("panier mis à jours !");
      //setPanier(paniers.filter((paniers) => paniers.id !== id));
      fetchPanier();
    } catch (error) {
      console.log(error.response);
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <div className="row pt-3">
        <div className="col-md-12">
          {paniers.length === 0 && (
            <h3 className="mt-5 mb-5 text-center">Mon panier est vide</h3>
          )}
          {paniers.length > 0 && (
            <>
              <table className="table table-hover">
                <thead>
                  <tr>
                    <th scope="col">Produit</th>
                    <th scope="col">Quantité</th>
                    <th scope="col">prix unitaire</th>
                    <th scope="col">prix total</th>
                    <th></th>
                  </tr>
                </thead>
                <tbody>
                  {paniers.map((panier) => (
                    <tr key={panier.id}>
                      <td>{panier.productId.label}</td>
                      <td>{panier.quantity}</td>
                      <td>{panier.productId.price}</td>
                      <td>
                        {calculTotal(panier.productId.price, panier.quantity)}
                      </td>
                      <td>
                        <i
                          onClick={() => removeITem(panier.id)}
                          className="fa fa-trash-o fa-lg"
                        ></i>
                      </td>
                    </tr>
                  ))}
                  <tr>
                    <td>TOTAL :</td>
                    <td></td>
                    <td></td>
                    <td>{finalTotal}</td>
                    <td></td>
                  </tr>
                </tbody>
              </table>
              <form>
                <fieldset className="form-group text-align-right pull-right">
                  <button
                    type="button"
                    className="btn btn-warning"
                    onClick={handleClear}
                  >
                    Vider mon panier
                  </button>
                  &nbsp;
                  <button
                    type="submit"
                    className="btn btn-danger"
                    onClick={handleSubmit}
                  >
                    Payer avec ALMA
                  </button>
                </fieldset>
              </form>
            </>
          )}
        </div>
      </div>
      <div className="row pt-3">
        {eligibilities.map((eligibility) => (
          <div key={eligibility.installments_count} className="col">
            <div className="card mb-3">
              <h3 className="card-header">
                &nbsp;
                <input
                  type="radio"
                  className="form-check-input"
                  name="etalement"
                  value={eligibility.installments_count}
                />
                Paiement en {eligibility.installments_count} fois
              </h3>
            </div>
            {(!eligibility.eligible && (
              <div className="card-body">
                <h5 className="card-title">Non éligible</h5>
              </div>
            )) || (
              <>
                <div className="card-body">
                  <h5 className="card-title">
                    Eligible : {eligibility.eligible}
                  </h5>
                </div>
                {eligibility.installments.map((installment, key) => (
                  <div
                    key={eligibility.installments_count + key}
                    className="card-body"
                  >
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item">
                        Paiement le {tsToDate(installment.due_date)}
                      </li>
                      <li className="list-group-item">
                        Montant : {centsToEuro(installment.net_amount)} &euro;
                      </li>
                      <li className="list-group-item">
                        Frais : {centsToEuro(installment.customer_fee)} &euro;
                      </li>
                    </ul>
                  </div>
                ))}
              </>
            )}
          </div>
        ))}
      </div>
      <div className="row pt-3 pb-3">
        {confirm && (
          <div className="col">
            <button
              type="button"
              className="btn btn-danger btn-block"
              onClick={handlePaiement}
            >
              Etape suivante
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default PanierPage;
