const carrinho= JSON.parse(localStorage.getItem("carrinho"));
const precoTotal= localStorage.getItem("preco");
const divAtual= document.querySelector("section.container");
const textPreco= document.getElementById("precoTotal");

function criaDiv(){
    if(carrinho != null){
    for(let i=0; i < carrinho.length; i++){
        console.log("asdas");
        var novaDiv= document.createElement("div");
        var novoTitulo= document.createElement("span");
        novoTitulo.innerText= carrinho[i].title;
        var novoImg= document.createElement("img");
        novoImg.src= carrinho[i].thumb;
        var novoPreco= document.createElement("strong");
        novoPreco.innerText= carrinho[i].normalPrice;
        novaDiv.appendChild(novoTitulo);
        novaDiv.appendChild(novoImg);
        novaDiv.appendChild(novoPreco);

        divAtual.appendChild(novaDiv);

        }
    }
    else{

     }

}

textPreco.innerText= precoTotal; 

 

criaDiv();