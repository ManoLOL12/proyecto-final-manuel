<template>
  <div class="home-page">
    <h1>Bienvenido a la Todo List de Videojuegos</h1>
    <p>Explora, crea y organiza tus juegos favoritos.</p>
    <router-link to="/games">Ver lista de juegos</router-link>
  </div>
</template>

<script setup>
// No necesitas ningún script aquí para este ejemplo
</script>

<style scoped>
.home-page {
  text-align: center;
  font-family: 'Arial', sans-serif;
  color: white;
  background-color: #3C4453;
  padding: 50px;
  border-radius: 10px;
}

.home-page h1 {
  font-size: 2.5rem;
  color: #D42829;
}

.home-page p {
  font-size: 1.2rem;
}
</style>