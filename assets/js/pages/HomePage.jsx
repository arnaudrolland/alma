import React, { useState, useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import AlmaService from "../services/AlmaService";
import { toast } from "react-toastify";

const HomePage = (props) => {
  const [loading, setLoading] = useState(false);
  const [qte, setQte] = useState(1);
  const [article, setArticle] = useState({
    label: "",
    price: +"",
    photo: "",
    description: "",
  });

  /**
   * Récupere un article en base
   * @param {integer} id
   */
  const fetchArticle = async (id) => {
    try {
      const data = await AlmaService.find(id);
      setArticle(data);
      setLoading(false);
    } catch (err) {
      console.log(err);
      toast.error("Une erreur est survenue");
      history.replace("/");
    }
  };

  useEffect(() => {
    toast.info("Bienvunue chez nous :)");
    fetchArticle();
  }, []);

  /**
   * Gere la quantité d'un article dans le panier
   * @param {*} param0
   */
  const handleQte = ({ currentTarget }) => {
    setQte(currentTarget.value);
  };

  /**
   * Ajoute un produit dans le panier
   * @param {*} event
   */
  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await AlmaService.insert(article, qte);
      toast.success(`${article.label}(${qte}) a été ajouté au panier`);
    } catch ({ response }) {
      toast.error("Une erreur est survenue");
    }
  };

  return (
    <>
      <div className="row pt-3">
        <div className="col-md-12">
          <img className="img-fluid w-100 no-padding" src={article.photo} />
        </div>
      </div>
      <div className="row mt-3">
        <div className="col-md-4 sidebar">
          <div className="card mb-3">
            <h3 className="card-header bg-primary"></h3>
            <div className="card-body">
              <h5 className="card-title">{article.label}</h5>
              <h6 className="card-subtitle text-muted">
                {article.price} &euro;
              </h6>
            </div>
            <img className="img-lite" src={article.photo} alt={article.label} />
            <div className="card-body">
              <form onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-4">
                    <div className="form-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Qté"
                        id="inputDefault"
                        value={qte}
                        onChange={handleQte}
                      />
                    </div>
                  </div>
                  <div className="col-md-8">
                    <button type="submit" className="btn btn-danger">
                      Ajouter au panier
                    </button>
                  </div>
                </div>
              </form>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <p className="text-success text-center font-weight-bold">
                  En stock !
                </p>
              </li>
            </ul>

            <div className="card-footer text-muted bg-primary"></div>
          </div>
        </div>
        <div className="col-md-8">
          <div className="jumbotron">
            <h1 className="display-3">{article.label}</h1>
            <p className="lead">{article.description}</p>
            <hr className="my-4" />
            <div
              id="carouselExampleIndicators"
              className="carousel slide"
              data-ride="carousel"
            >
              <ol className="carousel-indicators">
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="0"
                  className="active"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="1"
                ></li>
                <li
                  data-target="#carouselExampleIndicators"
                  data-slide-to="2"
                ></li>
              </ol>
              <div className="carousel-inner">
                <div className="carousel-item active">
                  <img
                    className="d-block w-100"
                    src={article.photo}
                    alt="First slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={article.photo}
                    alt="Second slide"
                  />
                </div>
                <div className="carousel-item">
                  <img
                    className="d-block w-100"
                    src={article.photo}
                    alt="Third slide"
                  />
                </div>
              </div>
              <a
                className="carousel-control-prev"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="prev"
              >
                <span
                  className="carousel-control-prev-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Previous</span>
              </a>
              <a
                className="carousel-control-next"
                href="#carouselExampleIndicators"
                role="button"
                data-slide="next"
              >
                <span
                  className="carousel-control-next-icon"
                  aria-hidden="true"
                ></span>
                <span className="sr-only">Next</span>
              </a>
            </div>
            <hr className="my-4" />
            <p className="lead">
              <a className="btn btn-primary btn-lg" href="#" role="button">
                En savoir plus sur {article.label}
              </a>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
