// import './styles.css'
import Swal from 'sweetalert2';

const btnSearch = document.querySelector('#btnSearch');
const coinInput = document.querySelector('#coin-input');

function fetchAPI(coin){
  const endpoint = `https://api.exchangerate.host/latest?base=${coin}`;

  return fetch(endpoint)
    .then((response) => response.json())
    .then((dados) => dados)
    .catch((error) => console.log(error));
}

function renderCoins(coins){
  const ul = document.querySelector('#coins');
  
  ul.innerHTML = '';

  coins.forEach(([coin, valueCoin]) => {
    const li = document.createElement('li');
    li.innerText = `${coin} ${valueCoin}`;
    ul.appendChild(li);
  });
}

function handleSearch() {
  
  if(coinInput.value) {
    const titleCoins = document.querySelector('#titleCoins');
    
    
  
    fetchAPI(coinInput.value).then(({ rates, base }) => {
      if(base.toLowerCase() !== coinInput.value.toLowerCase()){
        throw new Error('Moeda inexistente');
      } else {
        const coins = Object.entries(rates);
        titleCoins.innerText =`Valor referente à 1 ${coinInput.value}`;
        renderCoins(coins);
      }
    }).catch((error) => {
      Swal.fire(error.message);
    });
  }else {
    Swal.fire(
      'Nenhuma moeda é passada.'
    );
  }
}


btnSearch.addEventListener('click', handleSearch);
