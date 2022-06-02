document.addEventListener('DOMContentLoaded', () => {
    getServicios();
});

async function getServicios(){
    const response = await fetch('https://627ad05ab54fe6ee007e27f4.mockapi.io/servicios-barberia');
    const data = await response.json();
    console.log(data);
    mostarServicios(data);
}
function mostarServicios(servicios){
    const root = document.querySelector('#catalogo');
    servicios.forEach(servicio => {
        const {nombre, precio} = servicio;
        const contenedorServicio = document.createElement('DIV');
        const nombreServicio = document.createElement('P');
        const precioServicio = document.createElement('P');
        contenedorServicio.classList.add('servicio');
        nombreServicio.textContent = nombre;
        nombreServicio.classList.add('nombreServicio');
        precioServicio.textContent = precio;
        precioServicio.classList.add('precioServicio');
        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);
        root.appendChild(contenedorServicio);
    });
}

