<template>
  <div class="admin-dashboard">
    <header class="admin-header">
      <h1>Admin Dashboard</h1>
      <nav class="admin-nav">
        <a href="#users">Users</a>
        <a href="#content">Content</a>
        <a href="#analytics">Analytics</a>
        <a href="#settings">Settings</a>
      </nav>
    </header>

    <div class="admin-container">
      <aside class="admin-sidebar">
        <ul class="menu">
          <li><router-link to="/admin/users">Manage Users</router-link></li>
          <li><router-link to="/admin/content">Manage Content</router-link></li>
          <li>
            <router-link to="/admin/analytics">View Analytics</router-link>
          </li>
          <li><router-link to="/admin/settings">Settings</router-link></li>
          <li><router-link to="/admin/reports">Reports</router-link></li>
        </ul>
      </aside>

      <main class="admin-main">
        <router-view></router-view>
      </main>
    </div>
  </div>
</template>
