import React from 'react';

export default function Header({ children }){
    return (
        <header>
            <h1>{children}</h1>
        </header>
    );
}

//Posso exportar separado ou direto na function
//export default Header;