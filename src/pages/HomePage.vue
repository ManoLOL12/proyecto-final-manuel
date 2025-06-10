<template>
  <div class="home">
    <h1>Bienvenido a la Todo List de Videojuegos</h1>
    <p>Esta aplicación te permite gestionar y llevar un seguimiento de los videojuegos que has jugado, agregar nuevos juegos, editarlos y marcarlos como completados.</p>
    <p><router-link to="/games">Ver la lista de juegos</router-link></p>
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
</style>