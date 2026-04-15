import {defineStore} from "pinia";
import {ref} from "vue";

const useAdminStore = defineStore("admin", () => {
  // sidebar collapsed state
  const sidebarCollapsed = ref(false);
  // toggle sidebar collapsed state
  const toggleSidebar = () => {
    sidebarCollapsed.value = !sidebarCollapsed.value;
  };
  return {
    sidebarCollapsed,
    toggleSidebar,
  };
});

export default useAdminStore;
