import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import AlmaService from "../services/AlmaService";
import moment from "moment";

const ConfirmPage = (props) => {
  const [customer, setRecap] = useState({
    email: "",
    first_name: "",
    id: "",
    last_name: "",
    phone: "",
  });
  const [shipping, setShipping] = useState({
    city: "",
    id: "",
    line1: "",
    postal_code: "",
  });
  const [paiement, setPaiement] = useState({
    ref: "",
    nb: "",
    amount: "",
  });
  const [installments, setInstall] = useState([]);
  //const { pid } = match.params;

  /**
   *  Récupere une commade passée par l'api alma
   * @param {integer} pid
   */
  const getCommande = async (pid) => {
    try {
      const data = await AlmaService.getCmd(pid);
      setRecap(data.customer);
      setShipping(data.shipping_address);
      setInstall(data.installments);
      setPaiement({
        ref: data.id,
        amount: data.purchase_amount,
        nb: data.installments_count,
      });
    } catch (err) {
      console.log(err);
      toast.error("Une erreur est survenue");
    }
  };

  useEffect(() => {
    let url = document.location.href;
    let url2 = url.replace("http://127.0.0.1:8000/?pid=", "");
    let url3 = url2.replace("#/confirm-order", "");
    getCommande(url3);
  }, []);

  /**
   * Converti les centimes en euros
   * @param {integer} amount
   */
  const centsToEuro = (amount) => {
    return amount / 100;
  };

  /**
   *  Converti un timestamp en date
   * @param {date} date
   */
  const tsToDate = (date) => {
    return moment.unix(date).format("MM/DD/YYYY");
  };

  return (
    <>
      <h1 className="pt-3 text-center">Commande validéé ! :)</h1>
      <div className="row pt-3">
        {paiement && (
          <div className="col">
            <h3>Récap : </h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Facture : {paiement.ref}</li>
              <li className="list-group-item">
                Montant : {centsToEuro(paiement.amount)} &euro;
              </li>
              <li className="list-group-item">
                Etalonage : {paiement.nb} fois
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="row pt-3">
        {customer && (
          <div className="col">
            <h3>Info perso : </h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Email : {customer.email}</li>
              <li className="list-group-item">Nom : {customer.last_name}</li>
              <li className="list-group-item">
                Prénom : {customer.first_name}
              </li>
              <li className="list-group-item">Tel. : {customer.phone}</li>
            </ul>
          </div>
        )}
      </div>
      <div className="row pt-3">
        {shipping && (
          <div className="col">
            <h3>Adresse de livraison : </h3>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Adresse : {shipping.line1}</li>
              <li className="list-group-item">Ville : {shipping.city}</li>
              <li className="list-group-item">
                Code postal : {shipping.postal_code}
              </li>
            </ul>
          </div>
        )}
      </div>
      <div className="row pt-3">
        <div className="col">
          <h3>Paiements : </h3>
          {installments.map((install, key) => (
            <div key={key} className="card-body">
              <ul className="list-group list-group-flush">
                <li className="list-group-item">
                  Paiement le {tsToDate(install.due_date)}
                </li>
                <li className="list-group-item">
                  Montant : {centsToEuro(install.net_amount)} &euro;
                </li>
                <li className="list-group-item">
                  Frais : {centsToEuro(install.customer_fee)} &euro;
                </li>
              </ul>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default ConfirmPage;
