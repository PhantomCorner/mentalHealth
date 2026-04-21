<template>
  <div class="not-found">
    <h1>404</h1>
    <h2>Page Not Found</h2>
    <p>
      Sorry, the page you are looking for does not exist or has been removed.
    </p>
    <router-link to="/admin/dashboard">Go Back to Home</router-link>
  </div>
</template>

<style scoped>
.not-found {
  text-align: center;
  padding: 100px 20px;
  min-height: 100vh;
  background: #f5f5f5;
}

h1 {
  font-size: 120px;
  margin: 0;
  color: #e74c3c;
}

h2 {
  font-size: 24px;
  color: #333;
  margin: 20px 0;
}

p {
  color: #666;
  margin-bottom: 30px;
}

a {
  display: inline-block;
  padding: 12px 24px;
  background: #3498db;
  color: white;
  text-decoration: none;
  border-radius: 6px;
  transition: background 0.3s;
}

a:hover {
  background: #2980b9;
}
</style>
