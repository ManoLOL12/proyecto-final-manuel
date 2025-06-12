<script setup>
</script>

<template>
  <div class="home-page">
    <h1>Bienvenido a Game <img class="logo" src="../assets/Game_Ender.svg" alt="Icono de Game Ender, una bomba a punto de explotar blanca sobre un circulo rojo"> Ender</h1>
    <h2>Vamos a acabar con esos juegos de una vez</h2>
    <p>Esta aplicación te permite gestionar y llevar un seguimiento de los videojuegos que has jugado, agregar nuevos juegos, editarlos y marcarlos como completados.</p>
    <router-link to="/games" class="button">Ver lista de juegos</router-link>
  </div>
</template>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

.home-page {
  text-align: center;
  font-family: 'Pixelify sans';
  color: #D7D2D4;
  background-color: #3C4453;
  padding: 20px;
  border-radius: 10px;
}

.home-page h1 {
  font-size: 3rem;
  color: #D7D2D4;
}

.home-page h2 {
  font-size: 2rem;
  color: #D42829;
}

.home-page p {
  font-size: 1.2rem;
}

.logo {
  height: 8rem;
  vertical-align: middle;
}

.button {
  display: inline-block;
  background-color: #D42829;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.button:hover {
  background-color: #838B93;
}
</style>