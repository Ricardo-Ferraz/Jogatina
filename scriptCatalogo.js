const container = document.getElementById("container");

function fazGet(url){
    let request = new XMLHttpRequest();
    request.open("GET", url, false);
    request.send();
    return request.responseText;
}

let data= fazGet("https://www.cheapshark.com/api/1.0/deals");
let lista = JSON.parse(data);
//lista=removeRepetido(lista);
var listaAdd= new Array(); //vetor de botões de adicionar ao carrinho
var listaRemove= new Array();//vetor de botões de remover do carrinho 
var precoTotal= 0;
var carrinho= new Array();

const text_precoTotal= document.getElementById("id_precoTotal");
const btnCarrinho= document.getElementById("caixa");
const btnLimpar= document.getElementById("limpar");

const divAtual= document.querySelector("section.catalogo")

//Criar as div's dos jogos da API
function criaHTML(lista){
    for(let i=0; i < lista.length; i++){
        var novaDiv= document.createElement("div");
        var novoTitulo= document.createElement("span");
        novoTitulo.innerText= lista[i].title;
        var novoImg= document.createElement("img");
        novoImg.src= lista[i].thumb;
        var novoTexto= document.createElement("p");
        var novoPreco= document.createElement("strong");
        novoPreco.innerText= lista[i].normalPrice;
        novoPreco.id= "preco"+i;
        novoTexto.innerText= "Preço: R$ "+novoPreco.innerHTML;
        var novoAdd= document.createElement("button");
        novoAdd.innerText= "Adicionar Carrinho";
        novoAdd.id= "add"+i;
        var novoRemove= document.createElement("button");
        novoRemove.innerText= "Remove Carrinho";
        novoRemove.id= "remove"+i;
        novaDiv.appendChild(novoTitulo);
        novaDiv.appendChild(novoImg);
        novaDiv.appendChild(novoTexto);
        novaDiv.appendChild(novoAdd);
        novaDiv.appendChild(novoRemove);

        divAtual.appendChild(novaDiv);
        listaAdd[i]= novoAdd;
        listaRemove[i]= novoRemove;
    }
}

criaHTML(lista);

//Cajo haja algum click em algum botão de Adicionar
for(let i= 0; i < listaAdd.length; i++){
    var aux=0;
    listaAdd[i].addEventListener("click", () => {
        aux += parseFloat(lista[i].normalPrice);
        carrinho.unshift(lista[i]); 
        precoTotal= aux.toFixed(2); 
        text_precoTotal.innerText= precoTotal;
    });
}

//Caso haja click em algum no botão de remover
for(let i= 0; i < listaRemove.length; i++){
    var aux= precoTotal;

    listaRemove[i].addEventListener("click", () => {
        let pos= buscaCarrinho(lista[i].gameID);
        if(pos == -1){
            console.log("Não existe no carrinho");
        }
        else{
            aux-= carrinho[pos].normalPrice;
            carrinho.splice(pos,1);
        }
        precoTotal= aux.toFixed(2);
        if(precoTotal < 0){
            precoTotal= 0;
        }
        text_precoTotal.innerText= precoTotal;
    });
}

function removeRepetido(lista){
    for(let i=0; i < lista.length; i++){
        console.log(lista.length);
        for(let j=1; j < lista.length; j++){
            if(parseInt(lista[i].gameID) == parseInt(lista[j].gameID)){
                console.log("foi removido o abaixo")
                console.log(lista[j]);
                lista.splice(j,1);
            }
        }
    }
    return lista;
}


function buscaCarrinho(gameID){
    for(let i=0; i < carrinho.length; i++){
        if(carrinho[i].gameID == gameID){
            return i;
        }
    }
    return -1;
}

btnCarrinho.addEventListener("click", () => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
    localStorage.setItem("preco", precoTotal);
});

btnLimpar.addEventListener("click", () => {
    precoTotal=0;
    carrinho = new Array();
    localStorage.clear();
    alert("Atualize a página!")
});