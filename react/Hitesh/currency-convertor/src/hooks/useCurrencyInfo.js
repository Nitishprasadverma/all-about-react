import { useEffect, useState } from "react";
const apiKey = 'b9a3a17d9974c834c39d7dbc'
function useCurrencyInfo(currency) {
    const [data, setData] = useState({});
    useEffect(() => {
        fetch(` https://v6.exchangerate-api.com/v6/${apiKey}/latest/${currency}
`)
            .then((res) => res.json())
            .then((res) => setData(res.conversion_rates))
    }, [currency])
    console.log(data);
    return data
}
export default useCurrencyInfo;
