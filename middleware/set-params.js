
export default defineNuxtRouteMiddleware((to) => {
    clearNuxtState('routeParamId')
    useState('routeParamId', () => to.params.id)
})