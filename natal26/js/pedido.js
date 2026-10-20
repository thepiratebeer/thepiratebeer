// =============================
// THE PIRATE BEER
// pedido.js
// =============================

const indice = sessionStorage.getItem("cervejaSelecionada");

if (indice === null) {
    window.location.href = "index.html";
}

const cerveja = cervejas[indice];

const nome = document.getElementById("nomeCerveja");
const ibu = document.getElementById("ibu");
const abv = document.getElementById("abv");
const estoque = document.getElementById("estoque");

const quantidade = document.getElementById("quantidade");

const valorUnitario = document.getElementById("valorUnitario");
const valorTotal = document.getElementById("valorTotal");

const menos = document.getElementById("menos");
const mais = document.getElementById("mais");

const pix = document.getElementById("pix");
const copiarPix = document.getElementById("copiarPix");

const apelido = document.getElementById("apelido");

const confirmar = document.getElementById("confirmado");

const whatsapp = document.getElementById("whatsapp");


// ----------------------------
// Carrega informações
// ----------------------------

nome.textContent = cerveja.nome;
ibu.textContent = cerveja.ibu;
abv.textContent = cerveja.abv;
estoque.textContent = cerveja.estoque;

const descricao = document.getElementById("descricaoCerveja");

descricao.textContent =
    cerveja.descricao ||
    "Descrição deste estilo em desenvolvimento.";

valorUnitario.textContent =
    `R$ ${Number(cerveja.preco).toFixed(2).replace(".", ",")}`;

calcular();


// ----------------------------
// Calcula total
// ----------------------------

function calcular() {

    let qtd = parseInt(quantidade.value);

    if (isNaN(qtd))
        qtd = 1;

    if (qtd < 1)
        qtd = 1;

    if (qtd > cerveja.estoque)
        qtd = cerveja.estoque;

    quantidade.value = qtd;

    const total = qtd * Number(cerveja.preco);

    valorTotal.textContent =
        `R$ ${total.toFixed(2).replace(".", ",")}`;

}


// ----------------------------
// Botões + e -
// ----------------------------

mais.onclick = () => {

    quantidade.value++;

    calcular();

};

menos.onclick = () => {

    quantidade.value--;

    calcular();

};

quantidade.oninput = calcular;


// ----------------------------
// Copiar PIX
// ----------------------------

copiarPix.onclick = () => {

    navigator.clipboard.writeText(pix.value);

    copiarPix.innerText = "Copiado!";

    setTimeout(() => {

        copiarPix.innerText = "Copiar";

    }, 1500);

};


// ----------------------------
// Libera WhatsApp somente após confirmação
// ----------------------------

whatsapp.disabled = true;

confirmar.onchange = () => {

    whatsapp.disabled = !confirmar.checked;

};


// ----------------------------
// Envia para WhatsApp
// ----------------------------

whatsapp.onclick = () => {

    if (apelido.value.trim() === "") {

        alert("Quem tá reservando?");

        apelido.focus();

        return;

    }

    const qtd = Number(quantidade.value);

    const total = qtd * Number(cerveja.preco);

    const mensagem =
`🍺 RESERVA THE PIRATE BEER

Cerveja:
${cerveja.nome}

Quantidade:
${qtd}

Valor:
R$ ${total.toFixed(2).replace(".", ",")}

Reserva em nome de:
${apelido.value}

✅ PIX realizado.`;

    window.open(
        "https://wa.me/5555981163122?text=" +
        encodeURIComponent(mensagem),
        "_blank"
    );

};