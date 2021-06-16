import { Link } from 'react-router-dom';

import './styles/Header.scss';

export function Header() {
    return (
      <>
        <header>
            <p>Välkommen på</p>
            <Link to="/" className="link"><h1><span>Z</span><span>o</span><span>o</span></h1></Link>
        </header>
      </>
    );
  }
  