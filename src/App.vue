<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script setup>
import { ref } from 'vue'
</script>

<style>
@import url('https://fonts.googleapis.com/css2?family=Pixelify+Sans:wght@400..700&display=swap');

body {
  font-family: 'Pixelify Sans', sans-serif;
  margin: 40px;
  background-color: #3C4453;
  color: #D7D2D4;
}

h1 {
  font-size: 36px;
  text-align: center;
  margin-bottom: 20px;
  color: #D7D2D4;
}

button {
  background-color: #D42829; 
  color: #D7D2D4;
  border: none;
  padding: 10px 20px;
  font-size: 14px;
  cursor: pointer;
  margin-left: 10px;
  border-radius: 5px;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #838B93; 
}

button:disabled {
  background-color: #A6A5A1;
  cursor: not-allowed;
}

form input {
  background-color: #767679; 
  border: 1px solid #838B93; 
  color: #D7D2D4; 
  padding: 8px 10px;
  margin: 10px 0;
  border-radius: 5px;
  width: 100%;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  background-color: #767679;
  margin: 10px 0;
  padding: 15px;
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

li span {
  font-size: 14px;
  color: #838B93; 
}

li strong {
  font-size: 16px;
}

li button {
  font-size: 12px;
}

li span {
  color: #D7D2D4;
  margin-top: 5px;
}

.button {
  font-family: 'Pixelify sans';
  display: inline-block;
  background-color: #D42829;
  color: #D7D2D4;
  padding: 10px 20px;
  text-decoration: none;
  border-radius: 5px;
  font-size: 16px;
  margin-right: 10px;
  margin-bottom: 10px;
}

.button:hover {
  background-color: #838B93;
}

::placeholder {
  font-family: 'Pixelify Sans';
  color: #D7D2D4;
  opacity: 1; 
}

.centered {
  text-align: center;
}

label {
  text-align: left;
}
</style>