// Обьявляем переменные 
var inputStr = document.querySelector(".inputStr");
var input = document.querySelector("input");
var ul = document.querySelector("ul");
var containerToDo = document.querySelector("div");
var lists = document.querySelectorAll("li");
var spans = document.getElementsByTagName("span");
var pencil = document.querySelector("#pencil");
var saveBtn = document.querySelector(".save");
var clearBtn = document.querySelector(".clear");
var tipsBtn = document.querySelector(".tipBtn");
var closeBtn = document.querySelector(".closeBtn");
var overlay = document.getElementById("overlay")


// Функция по нажатию корзины на элементе списка
function deleteTodo(){
  for(let span of spans){
    span.addEventListener ("click",function (){
      span.parentElement.remove();
      event.stopPropagation();
    });
  }
}

//function to load todo if list is found in local storage.
function loadTodo(){
  if(localStorage.getItem('todoList')){
    ul.innerHTML = localStorage.getItem('todoList');
    deleteTodo();
  }
}

//event listener for input to add new todo to the list.
input.addEventListener("keypress",function(keyPressed){
  if(keyPressed.which === 13){
    //creating lists and span when enter is clicked
    var li = document.createElement("li");
    var spanElement = document.createElement("span");
    var icon = document.createElement("i");
        
    var newTodo = this.value;
    this.value = " " ;
        
    icon.classList.add('fas', 'fa-trash');
    spanElement.append(icon);
    ul.appendChild(li).append(spanElement,newTodo);

    deleteTodo();
    
    }
    
});

// зачеркивание пункта списка после клика по нему
ul.addEventListener('click', function(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
  },false
);

// скрытие строки ввода по клику на карандаш
pencil.addEventListener('click', function(){
  inputStr.classList.toggle('display');
  ul.classList.toggle('todos-top');
});



// сохранение списка
saveBtn.addEventListener('click',function(){
  localStorage.setItem('todoList',ul.innerHTML );
});

// очистить список
clearBtn.addEventListener('click', function(){
  ul.innerHTML= "";
  localStorage.removeItem('todoList',ul.innerHTML );
});

// показывать FAQ по нажатию на кнопку
tipsBtn.addEventListener("click", function(){
   overlay.style.right = "0px";
});

// закрывать FAQ по нажатию на кнопку
closeBtn.addEventListener("click", function(){
  overlay.style.right = "-310px";
});

//delete todo
deleteTodo();

//load todo
loadTodo();
