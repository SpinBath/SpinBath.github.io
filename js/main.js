document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();

        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth',
            block: 'start',
        });
    });
});

document.addEventListener("DOMContentLoaded", () => {
    // Seleccionamos los enlaces del menú y las secciones
    const menuLinks = document.querySelectorAll("#div-navegator a");
    const sections = document.querySelectorAll(".seccion");

    // Configuración de Intersection Observer
    const observerOptions = {
        root: null,         // Usa el viewport como contenedor
        threshold: 0.35      // Detecta cuando el 60% de la sección es visible
    };

    // Instancia de Intersection Observer
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                // Remueve la clase 'active' de todos los enlaces
                menuLinks.forEach(link => link.classList.remove("active"));

                // Selecciona el enlace que corresponde a la sección visible
                const activeLink = document.querySelector(`#div-navegator a[href="#${entry.target.id}"]`);
                if (activeLink) {
                    activeLink.classList.add("active");
                }
            }
        });
    }, observerOptions);

    // Observa cada sección
    sections.forEach(section => observer.observe(section));
});




function menuButton(value) {

    const valuebutton = document.getElementById("button-showmenu");

    console.log("Valor actual del botón:", valuebutton.value);

    let anchoVentana = window.innerWidth;

    if (anchoVentana <= 1250) {
        if (valuebutton.value === "show") {
            hideMenu();
            valuebutton.value = "hide";
            console.log("Nuevo valor del botón:", valuebutton.value);
        } else {
            showMenu();
            valuebutton.value = "show";
            console.log("Nuevo valor del botón:", valuebutton.value);
        }
    }

}


function hideMenu() {

    console.log("hidenmenu")


    const divMenu = document.getElementById("div-menu");
    const divLanguageOpt = document.getElementById("div-language-opt");
    const divStyleOpt = document.getElementById("div-style-opt");
    const divShowMenu = document.getElementById("div-showmenu");
    const divShowMenuButton = document.getElementById("button-showmenu");
    const divNavigatorUl = document.querySelector("#div-navegator-ul");
    const divNavigatorIl = document.querySelectorAll("#div-navegator-li");

    // Aplicación de estilos
    divMenu.style.height = "50%";
    divMenu.style.gridTemplateColumns = "100%";

    divLanguageOpt.style.display = "none";
    divStyleOpt.style.display = "none";

    divShowMenu.style.display = "block";

    divShowMenuButton.style.borderBottom = "1px solid #5ce1e6";
    divShowMenuButton.style.borderTop = "1px solid #5ce1e6";
    divShowMenuButton.style.marginTop = "15px";

    divNavigatorUl.style.display = "block";

    divNavigatorIl.forEach(item => {
        item.style.width = "100%";
        item.style.paddingTop = "15px";
        item.style.paddingBottom = "15px";
    });
}








function showMenu() {


    console.log("showmenu")

    const divMenu = document.getElementById("div-menu");
    const divLanguageOpt = document.getElementById("div-language-opt");
    const divStyleOpt = document.getElementById("div-style-opt");
    const divShowMenu = document.getElementById("div-showmenu");
    const divShowMenuButton = divShowMenu.querySelector("button");
    const divNavigator = document.getElementById("div-navegator");
    const divNavigatorUl = document.getElementById("div-navegator-ul");
    const divNavigatorIl = document.querySelectorAll("#div-navegator-li");

    // Aplicación de estilos
    divMenu.style.gridTemplateColumns = "20% 60% 20%";
    divMenu.style.fontSize = "14px";
    divMenu.style.height = "60px";
    divMenu.style.paddingLeft = "20px";
    divMenu.style.paddingRight = "20px";

    divLanguageOpt.style.display = "block";
    divStyleOpt.style.display = "block";

    // Estilos de <select> y <button> en #div-menu
    const menuSelects = divMenu.querySelectorAll("select");
    const menuButtons = divMenu.querySelectorAll("button");

    menuSelects.forEach(select => {
        select.style.fontSize = "14px";
    });

    menuButtons.forEach(button => {
        button.style.fontSize = "14px";
    });

    divNavigator.style.width = "100%";

    divShowMenu.style.display = "block";
    divShowMenu.style.marginTop = "0px";

    divShowMenuButton.style.backgroundColor = "#0d1117";
    divShowMenuButton.style.border = "none";
    divShowMenuButton.style.color = "white";
    divShowMenuButton.style.width = "100%";
    divShowMenuButton.style.height = "40px";
    divShowMenuButton.style.marginTop = "0px";

    divNavigatorUl.style.display = "none";

    divNavigatorIl.forEach(item => {
        item.style.paddingTop = "0px";
        item.style.paddingBottom = "0px";
    });
}
