function getMovies() {
    fetch("./filmes.json")
        .then((response) => {
            if (!response.ok) {
                throw new Error
                    (`HTTP error! Status: ${response.status}`);
            }
            return response.json();
        })
        .then(data => {
            const filmes = data;
            CriarFilmes(filmes);

        })
        .catch((error) =>
            console.error("Unable to fetch data:", error));
}

const filmesLista = JSON.parse(localStorage.getItem("filmesLista"))|| [];
const filmesFavorito = JSON.parse(localStorage.getItem("filmesFavorito")) || [];

function CriarFilmes(filmes) {
    let cartao = document.getElementById("Cartao");
    let Procurartxt = document.getElementById("Procurartxt");
    let ProcurarCategoria = document.getElementById("ProcurarCategoria");

    function atualizarFilmesFiltrados() {
        cartao.innerHTML = "";
        let textoFiltro = Procurartxt.value.trim().toLowerCase();
        let filtroselect = ProcurarCategoria.value;

        let filmesFiltrados = filmes.filter(filme => {
            let TituloProcurado = filme.titulo.toLowerCase().includes(textoFiltro);
            let generoProcurado = filtroselect === "Todos" || filme.genero.includes(filtroselect);
            return TituloProcurado && generoProcurado;
        });
        
        filmesFiltrados.forEach(filme => {
            if (window.location.pathname.endsWith("inicio.html")) {
                CriarCartao(filme, cartao)
            }else{
                if (window.location.pathname.endsWith("MinhaLista.html") && filmesLista.includes(filme.titulo)) {
                    CriarCartao(filme, cartao)
                }else{
                    if(window.location.pathname.endsWith("Favoritos.html") && filmesFavorito.includes(filme.titulo)) {
                        CriarCartao(filme, cartao)
                    }
                }
            }
        });
    }

    Procurartxt.addEventListener("input", atualizarFilmesFiltrados);
    ProcurarCategoria.addEventListener("change", atualizarFilmesFiltrados);
    
    atualizarFilmesFiltrados();
}

function CriarCartao(filme, cartao) {
    let FilmeCartao = document.createElement("div");
    FilmeCartao.classList.add("Cartao");

    let Poster = document.createElement("img");
    Poster.src = filme.poster;

    let Detalhes = document.createElement("div");
    Detalhes.classList.add("Detalhes");

    let Titulo = document.createElement("h2");
    Titulo.textContent = filme.titulo;
    Titulo.className = `InfoConst`;

    let IconLista = document.createElement("img");
    if (filmesLista.includes(Titulo.textContent)) {
        IconLista.src = "./IconMarcado.png";
    } else {
        IconLista.src = "./IconNaoMarcado.png";
    }

    IconLista.id = "Bandeira";
    IconLista.addEventListener("click", function() {
        if (IconLista.src.endsWith("IconNaoMarcado.png")) {
            IconLista.src = "./IconMarcado.png";
            filmesLista.push(Titulo.textContent);
            localStorage.setItem("filmesLista", JSON.stringify(filmesLista));
        } else {
            IconLista.src = "./IconNaoMarcado.png";
            filmesLista.splice(filmesLista.indexOf(Titulo.textContent), 1);
            localStorage.setItem("filmesLista", JSON.stringify(filmesLista));
        }
    });

    let Ano = document.createElement("p");
    Ano.textContent = `Ano: ${filme.ano}`;
    Ano.className = `InfoConst`;

    let DuracaoEmMinutos = document.createElement("p");
    DuracaoEmMinutos.textContent = `Duração: ${filme.duracaoEmMinutos} minutos`;
    DuracaoEmMinutos.className = `InfoConst`;

    let Genero = document.createElement("p");
    Genero.textContent = `Gênero: ${filme.genero.join(", ")}`;
    Genero.className = `InfoConst`;

    let Diretor = document.createElement("p");
    Diretor.textContent = `Diretor: ${filme.diretor}`;
    Diretor.className = `InfoDinamica`;

    let Roteiristas = document.createElement("p");
    Roteiristas.textContent = `Roteiristas: ${filme.roteiristas.join(", ")}`;
    Roteiristas.className = `InfoDinamica`;

    let Atores = document.createElement("p");
    Atores.textContent = `Atores: ${filme.atores.join(", ")}`;
    Atores.className = `InfoDinamica`;

    let metascore = document.createElement("p");
    metascore.textContent = `Metascore: ${filme.metascore}`;
    metascore.className = `InfoDinamica`;

    Detalhes.append(Titulo, Ano, DuracaoEmMinutos, Genero, Diretor, Roteiristas, Atores, metascore);
    FilmeCartao.append(Poster, IconLista, Detalhes);

    Poster.addEventListener("click", function Assistir(){
        window.location.href = `./AssistirFilme.html?filme=${encodeURIComponent(filme.titulo)}`;
        
    });
    Detalhes.addEventListener("click", function Assistir(){
        window.location.href = `./AssistirFilme.html?filme=${encodeURIComponent(filme.titulo)}`;
        
    });
    cartao.appendChild(FilmeCartao);
};


function NomeFilme(){
    return document.getElementById('NmeFilme').textContent = (new URLSearchParams(window.location.search)).get('filme');
}

function Favoritos(){

    let IconFavorito = document.createElement('img');
    let H2Nome = document.getElementById('NmeFilme');
    
    IconFavorito.id = "Estrela"
    if (filmesFavorito.includes(H2Nome.textContent)) {
        IconFavorito.src = "./EstrelaCheia.png";
    } else {
        IconFavorito.src = "./EstrelaVazia.png";
    }


    IconFavorito.addEventListener("click", function() {
        if (IconFavorito.src.endsWith("EstrelaVazia.png")) {
            IconFavorito.src = "./EstrelaCheia.png";
            filmesFavorito.push(H2Nome.textContent);
            localStorage.setItem("filmesFavorito", JSON.stringify(filmesFavorito));
        } else {
            IconFavorito.src = "./EstrelaVazia.png";
            filmesFavorito.splice(filmesFavorito.indexOf(H2Nome.textContent), 1);
            localStorage.setItem("filmesFavorito", JSON.stringify(filmesFavorito));
        }
    });
    

    H2Nome.appendChild(IconFavorito)
}