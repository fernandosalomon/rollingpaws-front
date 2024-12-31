export const setPageTitle = (route) => {
    const routeName = route.split("/")[route.split("/").length - 1];
    route === "/"
        ? (document.title = "RollingPaws")
        : (document.title =
            routeName.charAt(0).toUpperCase() + routeName.slice(1) + " - RollingPaws");
};