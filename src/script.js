// fetch('http://localhost:8000/musicos.json')
// .then(res => res.json())
// .then((json) => {
//   console.log(json);
//   const ul = document.getElementById('Musicos');
//   json.forEach((tb_usuario) => {
//     const li = document.createElement("li");
//     li.innerHTML = `
//     <a href ="#">
//       <img src="${tb_usuario.nm_usuario}">
//       <span class="testo">${tb_usuario.cd_senha}</span>
//     </a>`;
//     ul.appendChild(li);
//   })
// })

// function filtrar() {
//   var input, filter, ul, li, a, i, txtValue, span, count = 0;

//   input = document.getElementById("idbusca");
//   ul = document.getElementById("Lista"); // Adjust to the correct ID if needed

//   filter = input.value.toUpperCase();

//   li = ul.getElementsByTagName("li");

//   for (i = 0; i < li.length; i++) {
//     a = li[i].getElementsByTagName("a")[0];
//     txtValue = a.textContent || a.innerText;
//     if (txtValue.toUpperCase().indexOf(filter) > -1) {
//       li[i].style.display = "";
//       count++;
//       span = li[i].querySelector(".testo");

//       if (span) {
//         span.innerHTML = txtValue.replace(new RegExp(filter, "gi"), (match) => {
//           return `<strong>${match}</strong>`;
//         });
//       }
//     } else {
//       li[i].style.display = "none";
//     }
//   }

//   // Hide the list if no matches found
//   if (count === 0 || input.value.trim() === "") {
//     ul.style.display = "none";
//   } else {
//     ul.style.display = "block";
//   }
// }
