import React from "react";
import Rest from "./Rest";

const App = () => {
  const data = Rest();

  return (
    <div>
      {data && <pre>{JSON.stringify(data.data)}</pre>}
      <h1>Compras</h1>
      <div className="card">
        <div className="status">Check aqui</div>
        <header>
          <ul>
            <li>Data</li>
            <li>Hora</li>
            <li>Shopping</li>
            <li>Valor da compra</li>
          </ul>
        </header>
        <section>
          <table>
            <thead>
              <tr>
                <th>Produto</th>
                <th>Preço</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Camisa</td>
                <td>100,00</td>
              </tr>
            </tbody>
          </table>
        </section>
      </div>
    </div>
  );
};

export default App;
