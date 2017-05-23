window.onload = function() {

   /*          Input handlers         */

   document.querySelector('.pokemon__input').addEventListener('keyup', function(e) {
      let input = this.value;
      let obj = new PokemonSearch(input.toLowerCase());
   });

   /*          Request handler         */

   function PokemonSearch(input) {
      let currentInput = input;
      let pokemonList = [];
      let currentPage = 1;
      let perPage = 30; // Can be set directly

      let displayHandler = new PokemonDisplay();

      let time = performance.now();

      inputCheck();

      function inputCheck() {
         displayHandler.clear();
         if (currentInput) {
            searching();
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
               if (obj.name.toLowerCase().indexOf(currentInput) != -1) {
                  if (pokemonList.length < 5) {
                     pokemonList.push(obj.name);
                  } else {
                     displayHandler.display(pokemonList, time);
                     return;
                  }
               }
            }

            currentPage++;
            searching(nextPage);
         } else {
            displayHandler.display(pokemonList, time);
            return;
         }
      }
   }

   /*          Names displaying        */

   function PokemonDisplay() {
      let dropDown = document.querySelector('.drop-down');

      function displaySelect(pokemonsList, time) {
         console.log('Time spent:', time - performance.now());
         console.log(pokemonsList.length);
         if (!pokemonsList) {
            console.log('in');
            clearList();
         }

         dropDown.style.display = 'inline-block';

         for (let name of pokemonsList) {
            let obj = document.createElement('li');
            obj.classList.add('drop-down__item');
            obj.innerText = name;

            dropDown.appendChild(obj);
         }
      }

      function clearList() {
         if (dropDown.length != 0) {
            let obj = dropDown.firstChild;
            while (obj) {
               dropDown.removeChild(obj);
               obj = dropDown.firstChild;
            }
            dropDown.style.display = 'none';
         }
      }

      return {
         display: displaySelect,
         clear: clearList
      }
   }
};
