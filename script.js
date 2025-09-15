// Cotação de moedas do dia.
const USD = 5.44
const EUR = 6.37
const GBP = 7.35


// Obtendo os elementos do formulário
const form = document.querySelector("form")
const amount = document.getElementById("amount")
const currency = document.getElementById("currency")
const footer = document.querySelector("main footer")
const description = document.getElementById("description")
const result = document.getElementById("result")

// Manipulando o input amount para receber apenas números. O amount.addEventListener("input", ...) serve para adicionar um evento que é acionado toda vez que o conteúdo do input é modificado. 
amount.addEventListener("input" , () => {
    const hasCharactersRegex = /\D+/g
    //string.replace(o_que_procurar, pelo_que_substituir)
    amount.value = amount.value.replace(hasCharactersRegex, "")
})

// Captando o evento de submit (enviar) do formulário.
form.onsubmit = (event) => {
    event.preventDefault ()
    switch (currency.value) {
        case "USD":
            convertCurrency(amount.value, USD, "US$")
            break
        case "EUR":
            convertCurrency(amount.value, EUR, "€")
            break
        case "GBP":
            convertCurrency(amount.value, GBP, "£")
    }
}

// Função para converter a moeda.

function convertCurrency(amount, price, symbol) {
    try {
        // Exibindo a cotação da moeda selecionada.
        description.textContent =  `${symbol} 1 = ${formatCurrencyBRL(price)}`

        //Calcula o total e arredonda para 2 casas decimais.
        let total = (amount * price).toFixed(2).replace(".",",")

        // Exibe o resultado final
        result.textContent = `${total} Reais`
        
        // Aplica a classe que exibe o footer para mostrar o resultado
        footer.classList.add("show-result")

    } catch (error) {
        // Remove a classe do footer removendo ele da tela
        footer.classList.remove("show-result")
        
        console.log(error)
        alert("Não foi possível converter. Tente novamente mais tarde.")
    }
}

// Fromata a moeda em moeda real brasileiro.
function formatCurrencyBRL(value){
    // converte para número para utilizar o toLocalString para formatar no padrão BRL
    return Number(value).toLocaleString("pt-BR", {
        style: "currency",
        currency: "BRL",
    })
}