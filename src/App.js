import React, {useEffect, useState,useRef} from 'react';
import { Block } from './Block';
import './index.scss';

function App() {
    const [rates,setRates]=useState({})
    const [fromCurs,setFromCurs]=useState('RUB')
    const [toCurs,setToCurs]=useState('USD')
    const [fromPrice,setFromPrice]=useState(0)
    const [toPrice,setToPrice]=useState(1)
    const ref = useRef({});
    console.log(fromCurs)
    useEffect(() => {
        fetch('https://www.cbr-xml-daily.ru/latest.js')
            .then((res)=>res.json())
            .then((json)=>{
                ref.current=json.rates;
                onChangeToCurs(1)

            }).catch(err=>{
                console.warn(err);
                alert('Данные не загрузились');
        });
    }, []);

    function onChangeFromCurs(value) {console.log(value)
        let price,result;
        if (fromCurs==='RUB'){
            let baseCurs=1;
             price= value / baseCurs;
        }else{
             price= value / ref.current[fromCurs]
        }
        if (toCurs==='RUB'){
            let baseCurs=1;
            result=price * baseCurs
        }else{
            result=price * ref.current[toCurs]
        }

        setFromPrice(value)
        setToPrice(result.toFixed(1))
    }
    function onChangeToCurs(value) {
        let price,result;
        if (fromCurs==='RUB'){
            let baseCurs=1;
            price= value * baseCurs;
        }else{
            price= value * ref.current[fromCurs]
        }
        if (toCurs==='RUB'){
            let baseCurs=1;
            result=price / baseCurs
        }else{
            result=price / ref.current[toCurs]
        }
        setFromPrice(result.toFixed(1))
        setToPrice(value)
    }

    useEffect(() => {
        onChangeFromCurs(fromPrice)
    }, [fromCurs]);
    useEffect(() => {
        onChangeToCurs(toPrice)
    }, [toCurs]);
  return (
    <div className="App">
      <Block value={fromPrice} currency={fromCurs} onChangeCurrency={(cur) => setFromCurs(cur)} onChangeValue={onChangeFromCurs}/>
      <Block value={toPrice} currency={toCurs} onChangeCurrency={setToCurs} onChangeValue={onChangeToCurs}/>
    </div>
  );
}

export default App;
