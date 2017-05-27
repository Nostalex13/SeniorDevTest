window.onload = function() {

   function PokemonData(input) {
      let pokemonList = [];
      let currentInput = null;
      let currentPage = 1;
      let perPage = 300;

      let display = new PokemonDisplay();

      this.inputCheck = function() {
         currentInput = input.toLowerCase();
         if (currentInput) {
            searching();
         } else {
            display.clearList();
         }
      }

      function getXmlHttp() {
         let xmlhttp;
         try {
            xmlhttp = new ActiveXObject("Msxml2.XMLHTTP");
         } catch (e) {
            try {
               xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
            } catch (E) {
               xmlhttp = false;
            }
         }
         if (!xmlhttp && typeof XMLHttpRequest!='undefined') {
            xmlhttp = new XMLHttpRequest();
         }
         return xmlhttp;
      }

      function searching(nextPage = `http://www.pokeapi.co/api/v2/pokemon/?limit=${perPage}`) {
         let xmlhttp = getXmlHttp();

         xmlhttp.open('GET',
         `${nextPage}`,
         true);
         xmlhttp.onreadystatechange = function() {
            if (xmlhttp.readyState == 4) {
               if(xmlhttp.status == 200) {
                  update(JSON.parse(xmlhttp.responseText));
               } else {
                  console.log('Something went wrong');
               }
            }
         };
         xmlhttp.send(null);
      }

      function update(searchQuery) {
         if((currentPage * perPage) < searchQuery.count) {

            let pageResults = searchQuery.results;
            let nextPage = searchQuery.next;

            for (var obj of pageResults) {
               if (obj.name.toLowerCase().indexOf(currentInput) == 0) {
                  if (pokemonList.length < 5) {
                     pokemonList.push(obj.name);
                  } else {
                     display.displaySelected(pokemonList, currentInput);
                     return;
                  }
               }
            }

            currentPage++;
            searching(nextPage);
         } else {
            if (pokemonList.length) {
               display.displaySelected(pokemonList, currentInput);
               return;
            }
            display.clearList();
            return;
         }
      }
   }

   function PokemonDisplay() {
      let self = this;
      let dropDown = document.querySelector('.pokemon__drop-down');

      this.displaySelected = function(data, input) {
         /* checking for difference between input field before request
         and after */
         let currentInput = document.querySelector('.pokemon__input').value;
         if (currentInput != input) {
            return;
         }

         self.clearList();

         dropDown.style.display = 'inline-block';

         for(let i = 0; i < data.length; i++) {
            let obj = document.createElement('li');
            obj.classList.add('pokemon__item');
            obj.innerText = data[i];

            dropDown.appendChild(obj);
         }
      }

      this.clearList = function() {
         if (dropDown.length != 0) {
            let obj = dropDown.firstChild;
            while (obj) {
               dropDown.removeChild(obj);
               obj = dropDown.firstChild;
            }
            dropDown.style.display = 'none';
         }
      }
   }

   function PokemonHandlers() {
      let display = new PokemonDisplay();
      let buttons = {
         down: 40,
         up: 38,
         enter: 13
      };

      /*          Input handlers         */

      document.querySelector('.pokemon__input').addEventListener('keyup', function(e) {
         if (e.keyCode != 40 && e.keyCode != 38 && e.keyCode != 13) {
            let input = this.value;
            let data = new PokemonData(input);
            data = data.inputCheck();
         }
      });

      /*          Arrows control          */

      document.querySelector('.pokemon__input').addEventListener('keydown', function(e) {
         if (e.keyCode == buttons.down) {
            e.preventDefault();
            let dropDown = document.querySelector('.pokemon__drop-down');
            let nextChild = dropDown.firstChild;

            if (nextChild) {
               while (nextChild) {
                  if (nextChild.classList.contains('pokemon__item--active')) {
                     if (nextChild != dropDown.lastChild) {
                        nextChild.classList.remove('pokemon__item--active');
                        nextChild = nextChild.nextSibling;
                        nextChild.classList.add('pokemon__item--active');
                     }

                     return;
                  } else {
                     nextChild = nextChild.nextSibling;
                  }
               }

               dropDown.firstChild.classList.add('pokemon__item--active');
            }
         }

         if (e.keyCode == buttons.up) {
            e.preventDefault();
            let dropDown = document.querySelector('.pokemon__drop-down');
            let nextChild = dropDown.firstChild;

            if (nextChild) {
               while (nextChild) {
                  if (nextChild.classList.contains('pokemon__item--active')) {
                     if (nextChild != dropDown.firstChild) {
                        nextChild.classList.remove('pokemon__item--active');
                        nextChild = nextChild.previousSibling;
                        nextChild.classList.add('pokemon__item--active');
                     }

                     return;
                  } else {
                     nextChild = nextChild.nextSibling;
                  }
               }

               dropDown.firstChild.classList.add('pokemon__item--active');
            }
         }
      });

      /*          Enter btn pokemon selection          */

      document.querySelector('.pokemon__input').addEventListener('keydown', function(e) {
         if (e.keyCode == buttons.enter) {
            let dropDown = document.querySelector('.pokemon__drop-down');
            let nextChild = dropDown.firstChild;

            while (nextChild) {
               if (nextChild.classList.contains('pokemon__item--active')) {
                  document.querySelector('.pokemon__input').value = nextChild.innerText;
                  display.clearList();

                  return;
               } else {
                  nextChild = nextChild.nextSibling;
               }
            }
         }
      });

      /*         Click pokemon selection          */

      document.querySelector('.pokemon__drop-down').addEventListener('click', function(e) {
         document.querySelector('.pokemon__input').value = e.target.innerText;
         display.clearList();
      });
   }

   let handler = new PokemonHandlers();
};
