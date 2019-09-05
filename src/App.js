import React from "react";
import Rest from "./Rest";

import "./styles/app.css";

import Card from "./components/Cards";

const App = () => {
  const data = Rest();

  return (
    <>
      <nav>
        <h1>
          dito <span>Compras</span>
        </h1>
      </nav>
      <div className="container">
        <div className="container-compras">
          {data && !data.loading && <Card data={data} />}
        </div>
      </div>
    </>
  );
};

export default App;
