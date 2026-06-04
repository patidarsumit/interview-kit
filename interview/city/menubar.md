<!DOCTYPE html>
<html>
  <head>
    <title>Hello, World!</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
  <nav>
    <h2>Logo  <button class="menu-btn">Menu</button></h2>
   
    <ul>
      <li>Home</li>
      <li>About</li>
      <li>Contact</li>
    </ul>
  </nav>

  <div class="container">

    <aside>
      Sidebar
    </aside>

    <main>
      Main Content
    </main>

  </div>

      <script src="script.js"></script>
  </body>
</html>
    
    
    
    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
    }

    body{
      display:grid;
      grid-template-rows:60px 1fr;
      height:100vh;
    }

    nav{
      background:black;
      color:white;

      display:grid;
      grid-template-columns:1fr auto;
      align-items:center;

      padding:0 20px;
    }

    ul{
      list-style:none;

      display:grid;
      grid-auto-flow:column;
      gap:20px;
    }

    .container{
      display:grid;
      grid-template-columns:200px 1fr;
    }

    aside{
      background:lightgray;
      padding:20px;
    }

    main{
      padding:20px;
    }


    const menuBtn = document.querySelector(".menu-btn");
const aside = document.querySelector("aside");

menuBtn.addEventListener("click", () => {
  aside.style.display = aside.style.display === "none" ? "block" : "none";
});