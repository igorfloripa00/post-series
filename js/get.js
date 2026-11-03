//Manipulação - DOM
const resposta = document.querySelector("#resposta");
const lista = document.querySelector("#lista-series");
const modelo = document.querySelector("#modelo-serie");


const apiKey="cv__2IyjF4CrDelfYwShGPv0WkByAwyQ0Vpb_PNYGCJ_h2USxbVQHgSVx9xrCHb2kWB";
const apiUrl="https://api-ds.codeverse.dev.br/api/series";


//Funcao que busca todos os series da API


async function buscarSeries() {
  resposta.textContent = "Carregando séries..."


  try {
    //Fazer uma requisicao GET para buscar os series
    const retorno = await fetch(apiUrl, {
      method: "GET",
      headers: {"x-api-key": apiKey}
    });


    if(!retorno.ok){
      throw new Error("Nao foi possivel buscar os series")
    }


    //converter para JSON
    const resultado = await retorno.json();


    //Percorrer todos os series e montar o series.


    for (const serie of resultado.data) {
      const card = modelo.content.cloneNode(true);


      card.querySelector(".nome").textContent = serie.title;
      card.querySelector(".Gênero").textContent = serie.Gênero;
      card.querySelector(".ano").textContent = serie.ano;
      card.querySelector(".diretor").textContent = serie.diretor;


      const imagem = card.querySelector("img");


      if(serie.imageUrl){
        imagem.src = serie.imageUrl;
        imagem.alt =  serie.title;
      } else {
        imagem.remove();
      }


      lista.appendChild(card);
    }


    resposta.textContent="";




  } catch (error) {
    resposta.textContent = "Não foi possivel carregar os series. Tente novamente!"
    console.error(error);
  }


}


//executo a funcao
buscarSeries();