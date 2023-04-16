var open = document.getElementById('hamburger');
var changeIcon = true;

let result = 0;
async function reqServer(searchQuery){
    try {
        const req = 'http://localhost:5000/search/' + searchQuery;
        console.log(req);
        const response = await fetch(req, {method: 'GET', headers: {
            'Content-Type': 'application/json'
          }});
        
        result  = await response.json();
  
        
        showList(result);
      } catch (error) {
        console.error(error);
      }
    
}

window.addEventListener("DOMContentLoaded", (event) => {
  const btn = document.getElementById('btn');
  const url = 'http://localhost:5500/src/search_results.html?';
  if (btn) {     
      btn.addEventListener('click', ()=>{
      let value = document.getElementById("input_query");
      const searchQuery = value.value;
      
      const searchParams = new URLSearchParams(searchQuery);
      const queryString = searchParams.toString(); 
      window.location.href = url + queryString;
  });
  }
});


function handleSubmit(event) {
  console.log("hanle submit called")
    event.preventDefault();
  }
  

function handleEvent(event){
  event.preventDefault(); 
  const btn2 = document.getElementById('btn2');
  const query2 = document.getElementById('input_query2');
  const url = 'http://localhost:5500/src/search_results.html?';
  const searchParams = new URLSearchParams(query2.value);
  const queryString = searchParams.toString(); 
  window.location.href = url + queryString;
  reqServer(query2.value);
}

function showList(data){
 
  var table = '<div class = "container">';
  table += '<table border=0 class="center">';

var tr = "";
for(let i = 0; i < data.length; i++) {
  tr += "<tr>";
  tr += `<td><a target = "_blank" href = "${data[i].link}">${data[i].name} </a></td>`;
  tr += "</tr>"
}
table += tr + "</table>";
table += '</div>'

  document.body.innerHTML = `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta http-equiv="X-UA-Compatible" content="IE=edge">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Document</title>
      <script src=".//index.js"></script>
      <link rel="stylesheet" type="text/css" href="styles2.css" /> 
      <link href=".//style.css" rel="stylesheet" type="text/css" />
      <header>
        <div class="menu-toggle" id="hamburger">
            <i class="fas fa-bars"></i>
        </div>
        <div class="overlay"></div>
        <div class="container">
            <nav>
                <h1 class="brand"><a href="index.html">Official<span>Dom</span>ains.in</a></h1>
                <ul>
                    <li><a href="#">Home</a></li>
                    <li><a href="#">Services</a></li>
                    <li><a href="#">About</a></li>
                    <li><a href="#">Contact</a></li>
                </ul>
            </nav>
        </div>
      </header>
      <script>
  
          const url = window.location.href;
          const searchParams = new URL(url).searchParams;
          const out = new URLSearchParams(searchParams).entries();
          const query = Array.from(out)[0].toString().slice(0, -1);
          console.log("query = ", query);
          reqServer(query);
      </script>
  </head>
  
    
  
  <body>
      
      
  </body>
  </html>`;
  document.body.innerHTML += table;
}