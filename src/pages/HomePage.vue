<template>
  <div class="home">
    <h1>Bienvenido a Game Ender</h1>
    <p>Esta aplicación te permite gestionar y llevar un seguimiento de los videojuegos que has jugado, agregar nuevos juegos, editarlos y marcarlos como completados.</p>
    <p><router-link to="/games" class="btn-back-home">Ver la lista de juegos</router-link></p>
  </div>
</template>

<script setup>
</script>

<style>
.home {
  text-align: center;
  margin-top: 50px;
}

h1 {
  color: #D7D2D4;
}

.btn-back-home {
  display: inline-block;
  background-color: #3C4453;
  color: white;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
}

.btn-back-home:hover {
  background-color: #D42829;
}
</style>