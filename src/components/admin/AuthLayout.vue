<template>
  <div class="auth-layout">
    <div class="left-section">
      <div class="content">
        <h2 class="title">Welcome to Mental Health Admin</h2>
        <p class="text">
          Manage users, content, and settings to provide the best experience for
          our users. Please log in to continue.
        </p>
      </div>
    </div>
    <div class="right-section">
      <router-view></router-view>
    </div>
  </div>
</template>
<style scoped lang="scss">
.auth-layout {
  display: flex;
  height: 100vh;
  .left-section {
    flex: 1;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    .content {
      max-width: 400px;
      text-align: center;
      .title {
        font-size: 28px;
        margin-bottom: 16px;
      }
      .text {
        font-size: 16px;
        line-height: 1.5;
      }
    }
  }
  .right-section {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #f4f7f6;
  }
}
</style>
