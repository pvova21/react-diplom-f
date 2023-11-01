import React, { Fragment } from 'react';
import banner from '../img/banner.jpg';
import headerLogo from '../img/header-logo.png';
import { Link, useNavigate } from 'react-router-dom'; 
import { searchGoods } from '../actions/actionCreators';
import { useDispatch } from 'react-redux';

export default function Menu() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const henderClick = () => {
    const searchFormEl = document.querySelector('[data-id=search-form]');
    searchFormEl.classList.toggle('invisible');
    searchFormEl.querySelector('input').focus();
  };

  const handleChange = ({ target }) => {
    if (target.value) {
      navigate('/catalog');
      dispatch(searchGoods(target.value));
    }
  }

  return (
    <Fragment>
      <header className='container'>
        <div className='row'>
          <div className='col'>
            <nav className='navbar navbar-expand-sm navbar-light bg-light'>
              <Link to='/' className='navbar-brand'> 
                <img src={headerLogo} alt='Bosa Noga' />
              </Link>
              <div className='collapase navbar-collapse' id='navbarMain'>
                <ul className='navbar-nav mr-auto'>
                  <li className='nav-item active'>
                    <Link to='/' className='nav-link'>Главная</Link> 
                  </li>
                  <li className='nav-item'>
                    <Link to='/catalog' className='nav-link'>Каталог</Link> 
                  </li>
                  <li className='nav-item'>
                    <Link to='/about' className='nav-link'>О магазине</Link> 
                  </li>
                  <li className='nav-item'>
                    <Link to='/contacts' className='nav-link'>Контакты</Link> 
                  </li>
                </ul>
                <div>
                  <div className='header-controls-pics'>
                    <div data-id='search-expander' className='header-controls-pic header-controls-search' onClick={henderClick}></div>
                    <div className='header-controls-pic header-controls-cart'>
                      <div className='header-controls-cart-full'>1</div>
                      <div className='header-controls-cart-menu'></div>
                    </div>
                  </div>
                  <form data-id='search-form' className='header-controls-search-form form-inline invisible'>
                    <input className='form-control' placeholder='Поиск' onChange={handleChange} />
                  </form>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </header>
      <main className='container'>
        <div className='row'>
          <div className='col'>
            <div className='banner'>
              <img src={banner} className='img-fluid' alt='К весне готовы!' />
              <h2 className='banner-header'>К весне готовы!</h2>
            </div>
          </div>
        </div>
      </main>
    </Fragment>
  );
}
