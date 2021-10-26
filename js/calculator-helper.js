// Добавляем все кнопки из документа в переменные
var keys = document.querySelectorAll('#calculator span');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

// Добавляем onClick event для всех кнопок
for(var i = 0; i < keys.length; i++) {
  keys[i].onclick = function(e) {
    
    // Указываем значение областей
    var input = document.querySelector('.screen');
    var inputVal = input.innerHTML;
    var btnVal = this.innerHTML;
    var total;

    // Указываем поведение кнопок
    // Если нажата 'С':
    if(btnVal == 'C') {
      input.innerHTML = '0';
      decimalAdded = false;
    }

    // Если нажато значение '=' посчитать и выдать результат. Equation - вычисление
    else if(btnVal == '=') {
      var equation = inputVal;
      var lastChar = equation[equation.length - 1];
      
      // Заменяем символы умножить и разделить на соответствующие символы
      equation = equation.replace(/x/g, '*').replace(/÷/g, '/');
      
      // Проверяем последний символ уравнения
      if(operators.indexOf(lastChar) > -1 || lastChar == '.') equation = equation.replace(/.$/, '');
      
      if(equation) {
        total = eval(equation);
        if(total.toString().indexOf('.') != -1)
          total= total.toFixed(2);
        
        input.innerHTML = total;
        }
          
      decimalAdded = false;
      }
    
    // Избегаем выбора двух операторов
    else if(operators.indexOf(btnVal) > -1) {
        
      // Определяем последний символ в выражении
      var lastChar = inputVal[inputVal.length - 1];
      
      // Добавляем оператор только в том случае, если последним символом не оператор
      if(inputVal != '' && operators.indexOf(lastChar) == -1) 
      input.innerHTML += btnVal;
      
      // Разрешаем минус, если строка пуста
      else if(inputVal == '' && btnVal == '-') 
      input.innerHTML += btnVal;
      // Заменяем последний оператор, если таков нажат, другим оператором
      if(operators.indexOf(lastChar) > -1 && inputVal.length > 1) {
      input.innerHTML = inputVal.replace(/.$/, btnVal);
      }
  
      decimalAdded =false;
    }
    
    // Определяем порядок для десятичной дроби
    else if(btnVal == '.') {
      if(!decimalAdded) {
        input.innerHTML += btnVal;
        decimalAdded = true;
      }
    }
    
    // Если нажата другая кнопка
    else { 
      if(inputVal === '0') {
        input.innerHTML = '';
      }
      input.innerHTML += btnVal;
    }

    
    
    e.preventDefault();
  } 
}