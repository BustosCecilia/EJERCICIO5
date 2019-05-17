
const app = document.getElementById('root');

const logo = document.createElement('img');

logo.src = 'logo.png';

const container = document.createElement('div');
container.setAttribute('class', 'container');

app.appendChild(logo);
app.appendChild(container);

var request = new XMLHttpRequest();
request.open('GET', 'https://api.mercadolibre.com/sites', true);
request.onload = function () {

  // Begin accessing JSON data here
  var data = JSON.parse(this.response);
  if (request.status >= 200 && request.status < 400) {
    data.forEach(site => {
      const card = document.createElement('div');
      card.setAttribute('class', 'card');


      const h1 = document.createElement('h1');
      h1.type = 'button';
      h1.innerText = site.id + ":" + site.name;
      container.appendChild(card);
      card.appendChild(h1);
      h1.onclick = function() {
        console.log(site.id);
        prueba(card,site.id);
      };
      //categorias();
      //prueba(card,site.id);


    });
  } else {
    const errorMessage = document.createElement('marquee');
    errorMessage.textContent = "No funciona!";
    app.appendChild(errorMessage);
  }
};

request.send();


function prueba(card,sitio_id) {

  var request = new XMLHttpRequest();
  request.open('GET', 'https://api.mercadolibre.com/sites/'+ sitio_id, true);
  request.onload = function () {

    // Begin accessing JSON data here
    var data1 = JSON.parse(this.response);
    if (request.status >= 200 && request.status < 400) {
      data1.categories.forEach( categories =>{
        var p = document.createElement("li");
        p.textContent = categories.name;
        card.appendChild(p);
        //card.removeChild(nodo);
      });
    }
  };
  request.send();

}

function muestraMensaje(site)
{
  console.log(site);
}
function ocultar(){
  document.getElementById('obj1').style.display = 'none';
}

function mostrar(){
  document.getElementById('obj2').style.display = 'block';
}