// import React from 'react';
// import millify from 'millify';
// import { Collapse, Row, Col, Typography, Avatar } from 'antd';
// import HTMLReactParser from 'html-react-parser';

// import { useGetExchangesQuery } from '../services/cryptoApi';
// import Loader from './Loader';

// const { Text } = Typography;
// const { Panel } = Collapse;

// const Exchanges = () => {
//   const { data, isFetching } = useGetExchangesQuery();
//   const exchangesList = data?.data?.exchanges;
//  // Note: To access this endpoint you need premium plan
//   if (isFetching) return <Loader />;

//   return (
//     <>
//       <Row>
//         <Col span={6}>Exchanges</Col>
//         <Col span={6}>24h Trade Volume</Col>
//         <Col span={6}>Markets</Col>
//         <Col span={6}>Change</Col>
//       </Row>
//       <Row>
//         {exchangesList.map((exchange) => (
//           <Col span={24}>
//             <Collapse>
//               <Panel
//                 key={exchange.uuid}
//                 showArrow={false}
//                 header={(
//                   <Row key={exchange.uuid}>
//                     <Col span={6}>
//                       <Text><strong>{exchange.rank}.</strong></Text>
//                       <Avatar className="exchange-image" src={exchange.iconUrl} />
//                       <Text><strong>{exchange.name}</strong></Text>
//                     </Col>
//                     <Col span={6}>${millify(exchange.volume)}</Col>
//                     <Col span={6}>{millify(exchange.numberOfMarkets)}</Col>
//                     <Col span={6}>{millify(exchange.marketShare)}%</Col>
//                   </Row>
//                   )}
//               >
//                 {HTMLReactParser(exchange.description || '')}
//               </Panel>
//             </Collapse>
//           </Col>
//         ))}
//       </Row>
//     </>
//   );
// };

// export default Exchanges;

// // Exchanges.js
// import React from 'react';

// const Exchanges = ({ exchanges }) => {
//   // Check if exchanges is undefined or null
//   if (!exchanges) {
//     return <p>No exchanges available.</p>; // or any other message
//   }

//   // Check if exchanges is an array before mapping
//   if (!Array.isArray(exchanges)) {
//     return <p>Invalid data format for exchanges.</p>; // or handle the error in another way
//   }

//   return (
//     <div>
//       <h2>Exchanges</h2>
//       <ul>
//         {exchanges.map((exchange, index) => (
//           <li key={index}>{exchange.name}</li>
//           // Replace 'name' with the actual property you want to display
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Exchanges;


import React, { useState, useEffect } from "react";
import { Card } from "antd";
import axios from "axios";

const Convertor = () => {
  const [initialState, setState] = useState({
    currencies: ["USD", "SGD", "PHP", "EUR", "INR"],
    base: "USD",
    amount: "",
    convertTo: "INR",
    result: "",
    date: "",
  });

  const { currencies, base, amount, convertTo, result, date } = initialState;

  useEffect(() => {
    if (amount === isNaN) {
      return;
    } else {
      const getCurrencyconvertTor = async () => {
        const response = await axios.get(
          `https://api.exchangeratesapi.io/latest?base=${base}`
        );
        console.log("response==>", response);
        const date = response.data.date;
        // const result = (response.data.rates[convertTo] * amount).toFixed(3);
        // Assuming this code is part of a function or a block where `response` and other variables are available
if (response.data && response.data.rates && response.data.rates[convertTo]) {
  const result = (response.data.rates[convertTo] * amount).toFixed(3);
  console.log('Conversion Result:', result);
} else {
  console.error('Invalid response data or missing conversion rate for', convertTo);
  // Handle the error case, maybe show an error message to the user
}

        setState({
          ...initialState,
          result,
          date,
        });
      };
      getCurrencyconvertTor();
    }
  }, [amount, base, convertTo]);

  const onChangeInput = (e) => {
    setState({
      ...initialState,
      amount: e.target.value,
      result: null,
      date: null,
    });
  };
  const handleSelect = (e) => {
    setState({
      ...initialState,
      [e.target.name]: e.target.value,
      result: null,
    });
  };

  const handleSwap = (e) => {
    e.preventDefault();
    setState({
      ...initialState,
      convertTo: base,
      base: convertTo,
      result: null,
    });
  };

  return (
    <div className="container ml-5">
      <div className="row">
        <div style={{ padding: "30px", background: "#ececec" }}>
          <Card
            title="CURRENCY CONVERTOR"
            bordered={false}
            style={{ width: 550 }}
          >
            <h5>
              {amount} {base} is equivalent to{" "}
            </h5>
            <h3>
              {amount === ""
                ? "0"
                : result === null
                ? "Calculating ..."
                : result}
              {convertTo}
            </h3>
            <p>As of {amount === "" ? "" : date === null ? "" : date}</p>
            <div className="row">
              <div className="col-lg-10">
                <form className="form-inline mb-4">
                  <input
                    type="number"
                    value={amount}
                    onChange={onChangeInput}
                    className="form-control form-control-lg mx-5"
                  />
                  <select
                    name="base"
                    value={base}
                    onChange={handleSelect}
                    className="form-control form-control-lg"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
                <form className="form-inline mb-4">
                  <input
                    disabled={true}
                    value={
                      amount === ""
                        ? "0"
                        : result === null
                        ? "Calculating..."
                        : result
                    }
                    className="form-control form-control-lg mx-5"
                  />
                  <select
                    name="convertTo"
                    value={convertTo}
                    onChange={handleSelect}
                    className="form-control form-control-lg"
                  >
                    {currencies.map((currency) => (
                      <option key={currency} value={currency}>
                        {currency}
                      </option>
                    ))}
                  </select>
                </form>
              </div>
              <div className="col-lg-2 align-self-center">
                <h1 onClick={handleSwap} style={{ cursor: "pointer" }}>
                  &#8595;&#8593;
                </h1>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Convertor;