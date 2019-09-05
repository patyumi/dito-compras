import React from "react";

import check from "../../assets/icons/check.svg";
import calendar from "../../assets/icons/calendar.svg";
import clock from "../../assets/icons/clock.svg";
import place from "../../assets/icons/place.svg";
import money from "../../assets/icons/money.svg";

import "./index.css";

const Card = ({ data }) => {
  return data.data.map(item => {
    return (
      <div key={item.id} className="compras-card">
        <div className="compras-card-status">
          <img src={check} alt="checked" />
        </div>
        <div className="compras-card-body">
          <header>
            <ul>
              <li>
                <img src={calendar} alt="calendar" />

                {item.data}
              </li>
              <li>
                <img src={clock} alt="clock" />
                {item.horas}
              </li>
              <li>
                <img src={place} alt="place" />
                {item.loja}
              </li>
              <li>
                <img src={money} alt="money" />
                R$ {item.valorTotal}
              </li>
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
                {item["compras"].map(compra => {
                  return (
                    <tr key={compra.timeStamp}>
                      <td>{compra.name}</td>
                      <td>R$ {compra.precoUni}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </section>
        </div>
      </div>
    );
  });
};

export default Card;
