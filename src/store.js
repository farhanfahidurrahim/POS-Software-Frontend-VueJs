import { ref } from "vue";

export const isSidebarVisible = ref(true);
export const toggleSidebar = () => {
    isSidebarVisible.value = !isSidebarVisible.value;
};
export const hideSidebar = () => {
    isSidebarVisible.value = false;
};



export const isAuthenticated = ref(false);
export const login = () => {
    isAuthenticated.value = true;
};
export const logout = () => {
    isAuthenticated.value = false;
};
