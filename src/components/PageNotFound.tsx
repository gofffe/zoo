import { Link } from "react-router-dom";

import "./styles/PageNotFound.scss";

export function PageNotFound() {
    return (
      <>
      <div className="not-found-container">
        <h4>Hoppsan!</h4>
        <p>Nu har du kommit till en sida där det inte finns några djur.</p>
        <Link to={"/"} className="link"><span>&#10094; </span> Gå till startsidan</Link>
      </div>
      </>
    );
  }
  