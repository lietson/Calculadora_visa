(function(){
    'use strict';

    //Chamada do elementos HTML(DOM)
    var $visor = document.querySelector('[data-js="visor"]')
    var $buttonsNumbers = document.querySelectorAll('[data-js="button-number"]')
    var $buttonCE = document.querySelector('[data-id="button-ce"]')
    var $buttonC = document.querySelector('[data-id="button-c"]')
    var $buttonsOperations = document.querySelectorAll('[data-js="button-operation"]')
    var $buttonEqual = document.querySelector('[data-id="button-equal"]')
    var $pi = document.querySelector('[data-js="pi"]')
    var $raiz = document.querySelector('[data-id="button-raiz"]')
    
    //Valida os números
    Array.prototype.forEach.call($buttonsNumbers, function(button) {
        button.addEventListener('click', function() {
            if($visor.value == '0'){
                $visor.value = ''
            }
            $visor.value += this.value
        }, false)
    })
    
    //Valida os Operadores
    Array.prototype.forEach.call($buttonsOperations, function(button) {
        button.addEventListener('click', function(){
            if($visor.value == '0'){
                $visor.value = ''
            }
            $visor.value = removeLastItemIfAnOperator($visor.value)
            $visor.value += this.value
        }, false)
    });

    //Button CE
    $buttonCE.addEventListener('click', () => { $visor.value = 0 }, false)

    //Button C
    $buttonC.addEventListener('click', () => { 
        $visor.value = $visor.value.slice(0, -1) 
    }, false)
    
    //Button PI
    $pi.addEventListener('click', () => { 
        if($visor.value == '0'){
            $visor.value = ''
        }
        $visor.value += Math.PI
    }, false)
    
    //Raiz quadrada
    $raiz.addEventListener('click', () => {
        try{
        $visor.value = removeLastItemIfAnOperator($visor.value)
        var allValues = $visor.value.match(/\d+[+÷^x-]?/g)
        var valor = allValues.reduce(function(accumulated, actual){
            var firstValue = accumulated.slice(0, -1)
            var operator = accumulated.split('').pop()
            var lastValue = actual
            switch(operator) {
                case '+':
                    return Number(firstValue) + Number(lastValue)
                case '-':
                    return Number(firstValue) - Number(lastValue)
                case 'x':
                    return Number(firstValue) * Number(lastValue)
                case '÷':
                    return Number(firstValue) / Number(lastValue)
                case '^':
                    return Math.pow(firstValue, lastValue)
            }
        })
       
        $visor.value = Math.sqrt(valor)
    
        if(String($visor.value) == 'NaN')
            $visor.value = 'Erro = √('+valor+')'
        }catch(error){
            $visor.value = 'Erro'
        }
    }, false)
    
    //remove o ultimo valor se for: ['+', '-', '÷', '^', 'x']
    function isLastItem(number) {
        var operations = ['+', '-', '÷', '^', 'x']
        var lastItem = number.split('').pop();
        return operations.some(function(operator){
            return operator === lastItem
        })
    }

    //Remove o ultimo valor se for um operador
    function removeLastItemIfAnOperator(number){
        if(isLastItem(number)){
            return number.slice(0, -1)
        }
        return number
    }

    //Button igual
    $buttonEqual.addEventListener('click', () => {
        $visor.value = removeLastItemIfAnOperator($visor.value)
        var allValues = $visor.value.match(/\d+[+÷^x-]?/g)
        $visor.value = allValues.reduce(function(accumulated, actual){
            var firstValue = accumulated.slice(0, -1)
            var operator = accumulated.split('').pop()
            var lastValue = removeLastItemIfAnOperator(actual)
            var lastOperator = isLastItem(actual) ? actual.split('').pop() : ''
            switch(operator) {
                case 'x':
                    return (Number(firstValue) * Number(lastValue)) + lastOperator
                case '+':
                    return (Number(firstValue) + Number(lastValue)) + lastOperator
                case '-':
                    return (Number(firstValue) - Number(lastValue)) + lastOperator
                case '÷':
                    return (Number(firstValue) / Number(lastValue)) + lastOperator
                case '^':
                    return (Math.pow(firstValue, lastValue)) + lastOperator
            }
        })
    })

})();