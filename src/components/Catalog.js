import React, { useEffect, Fragment, useState } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { fetchCategories, fetchDataCategories, searchGoods } from '../actions/actionCreators';
import { useSelector, useDispatch } from 'react-redux';

export default function Catalog() {
    const { items, loading, error } = useSelector((state) => state.serviceCategories);
    const { data } = useSelector((state) => state.serviceDataCategories);
    const { text } = useSelector((state) => state.serviceSearch);
    const dispatch = useDispatch();
    const navigate = useNavigate(); 
    const location = useLocation();
    const [index, setIndex] = useState(null);
    const offset = '&offset=';
    const [num, setNum] = useState(6);

    useEffect(() => {
        async function fetchData() {
            await dispatch(fetchCategories());
            await dispatch(fetchDataCategories());
            await dispatch(searchGoods(text));
        }
        fetchData();
    }, [text, dispatch, location]);

    function handleClick(id) {
        dispatch(fetchDataCategories(id, '', text));
        setIndex(id);
        setNum(6);
        navigate(`/catalog/${id}`);
    }

    function yetClick() {
        const sum = parseInt(num) + 6;
        setNum(sum);
        const out = offset + num;
        dispatch(fetchDataCategories(index, out, text));
    }

    if (loading) {
        return (
            <div className='preloader'>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        );
    }

    if (error) {
        console.log(error);
        return <p>Что-то пошло не так. Попробуйте еще раз.</p>;
    }

    return (
        <Fragment>
            <ul className='catalog-categories nav justify-content-center'>
                <li className='nav-item'>
                    <p className='nav-link active' onClick={() => handleClick(null)}>Все</p>
                </li>
                {items.map((o) => (
                    <li className='nav-item' key={o.id}>
                        <p className='nav-link' onClick={() => handleClick(o.id)}>{o.title}</p>
                    </li>
                ))}
            </ul>
            {data && (
                <Fragment>
                    <div className='row'>
                        {data.map((o) => (
                            <div className='col-4' key={o.id}>
                                <div className='card catalog-item-card'>
                                    <img src={o.images[0]} className='card-img-top img-fluid' alt={o.title} style={{ width: '90%', height: 200, objectFit: 'cover' }} />
                                    <div className='card-body'>
                                        <p className='card-text'>{o.title}</p>
                                        <p className='card-text'>{o.price} руб.</p>
                                        <Link to={'/catalog/' + o.id} className='btn btn-outline-primary'>Заказать</Link>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {data.length === 6 && (
                        <div className='text-center'>
                            <button className='btn btn-outline-primary' onClick={() => yetClick()}>Загрузить ещё</button>
                        </div>
                    )}
                </Fragment>
            )}
            <Outlet />
        </Fragment>
    );
}
