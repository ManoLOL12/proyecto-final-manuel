<template>
  <div class="home-page">
    <h1>Bienvenido a Game Ender</h1>
    <h2>Vamos a acabar con esos juegos de una vez</h2>
    <p>Organiza una lista con tus juegos sin terminar y márcalos como completados.</p>
    <router-link to="/games" class="button">Ver lista de juegos</router-link>
  </div>
</template>

<script setup>
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

.home-page {
  text-align: center;
  font-family: 'Pixelify sans';
  color: white;
  background-color: #3C4453;
  padding: 50px;
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