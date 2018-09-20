import React from 'react';
import {NavLink} from 'react-router-dom';

const LinkMenu = (props) => {

    const menuItems = props.menu.map(i => {
        return <li className='menu__item' key={Math.random()} > 
                    <NavLink to={i.path} className='menu__link'>
                        { i.name }
                    </NavLink>
               </li>
    })

    return(
        <div className='nav__menu'>
            <ul className='menu'>
                { menuItems }
            </ul>
        </div>
    )
}

export default LinkMenu;