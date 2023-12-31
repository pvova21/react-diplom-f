import React, { useState, useEffect, Fragment } from 'react';
import { useNavigate } from 'react-router-dom'; 
import useJsonFetch from '../hooks/useJsonFetch';

export default function ProductPage({ match }) {
  let matchId = match && match.params && match.params.id;
  let num = matchId ? matchId.match(/\d+/) : null;
  const url = num ? process.env.REACT_APP_DATA_CATEGORIES_URL + '/' + num[0] : null;
  const [data] = useJsonFetch(url, {});
  const [selected, setSelected] = useState(false);
  const [amount, setAmount] = useState(0);
  const [mark, setMark] = useState(false);
  const navigate = useNavigate();

  const [form, setForm] = useState({
    image: '',
    title: '',
    sku: '',
    manufacturer: '',
    color: '',
    material: '',
    season: '',
    reason: '',
  });

  useEffect(() => {
    if (data && data.id !== undefined) {
      setForm({
        image: data.images[0],
        title: data.title,
        sku: data.sku,
        manufacturer: data.manufacturer,
        color: data.color,
        material: data.material,
        season: data.season,
        reason: data.reason,
        sizes: data.sizes,
      });
    }
  }, [data]);

  const handleSelected = () => {
    setSelected(!selected);
  };

  const handleDecrement = () => {
    if (amount === 0) {
      setAmount(0);
    } else if (amount === 1) {
      setAmount(amount => amount - 1);
      setMark(false);
    } else {
      setAmount(amount => amount - 1);
    }
  };

  const handleIncrement = () => {
    if (amount === 10) {
      setAmount(10);
    } else {
      setAmount(amount => amount + 1);
      setMark(true);
    }
  };

  const hendleRef = () => {
    navigate('cart');
  };

  return (
    <Fragment>
      {form.title !== undefined && (
        <section className="catalog-item container catalog">
          <h2 className="text-center">{form.title}</h2>
          <div className="row">
            <div className="col-5">
              <img src={form.image} className="img-fluid" alt={form.title} />
            </div>
            <div className="col-7">
              <table className="table table-bordered">
                <tbody>
                  <tr>
                    <td>Артикул</td>
                    <td>{form.sku}</td>
                  </tr>
                  <tr>
                    <td>Производитель</td>
                    <td>{form.manufacturer}</td>
                  </tr>
                  <tr>
                    <td>Цвет</td>
                    <td>{form.color}</td>
                  </tr>
                  <tr>
                    <td>Материалы</td>
                    <td>{form.material}</td>
                  </tr>
                  <tr>
                    <td>Сезон</td>
                    <td>{form.season}</td>
                  </tr>
                  <tr>
                    <td>Повод</td>
                    <td>{form.reason}</td>
                  </tr>
                </tbody>
              </table>
              <div className="text-center">
                <p>
                  Размеры в наличии:
                  {form.sizes !== undefined &&
                    form.sizes.map((o, i) =>
                      o.avalible && (
                        <span
                          className={`catalog-item-size ${selected ? 'selected' : ''} `}
                          key={i}
                          onClick={handleSelected}
                        >
                          {o.size}
                        </span>
                      )
                    )}
                </p>
                {form.sizes !== undefined && (
                  <p>
                    Количество:{' '}
                    <span className="btn-group btn-group-sm pl-2">
                      <button className="btn btn-secondary" onClick={handleDecrement}>
                        -
                      </button>
                      <span className="btn btn-outline-primary">{amount}</span>
                      <button className="btn btn-secondary" onClick={handleIncrement}>
                        +
                      </button>
                    </span>
                  </p>
                )}
              </div>

              <button
                className="btn btn-danger btn-block btn-lg"
                disabled={mark && selected ? false : true}
                onClick={hendleRef}
              >
                В корзину
              </button>
            </div>
          </div>
        </section>
      )}
    </Fragment>
  );
}
