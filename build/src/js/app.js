document.addEventListener('DOMContentLoaded', () => {
    getServicios();
});

async function getServicios(){
    const response = await fetch('https://627ad05ab54fe6ee007e27f4.mockapi.io/servicios-barberia');
    const data = await response.json();
    console.log(data);
    mostarServicios(data);
    seleccionarServicio();
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
        precioServicio.textContent = `$ ${precio}`;
        precioServicio.classList.add('precioServicio');
        contenedorServicio.appendChild(nombreServicio);
        contenedorServicio.appendChild(precioServicio);
        root.appendChild(contenedorServicio);
    });
}

let serviciosElegidos = [];
function seleccionarServicio(){
    const listaServicios = document.querySelectorAll('.servicio');
    listaServicios.forEach(servicio => {
        servicio.addEventListener('click', () => {
            if(servicio.classList.contains('selected')){
                // LE RETIRO LA CLASE 'SELECTED' PARA LOS ESTILOS
                servicio.classList.remove('selected');
                // LA ELIMINO DEL ARRAY DE SERVICIOS ELEGIDOS
                serviciosElegidos = serviciosElegidos.filter(e => {
                    return (e[0] !== servicio.textContent.split('$ ')[0]);
                });
            } else {
                // LE AGREGO LA CLASE 'SELECTED' PARA LOS ESTILOS
                servicio.classList.add('selected');
                // LO AGREGO AL ARRAY DE SERVICIOS ELEGIDOS
                serviciosElegidos.unshift(servicio.textContent.split('$ '));
            }
            // BOTON QUE MUESTRA EL TOTAL
            const btn = document.querySelector('.btn-confirmarServicio');
            if(serviciosElegidos.length == 0){
                btn.classList.add('btn-apagado');
            } else {
                btn.classList.remove('btn-apagado');
                calcTotal();
                btn.textContent = `Total: $${total}`;
            }
            displayTurno();
            cuentaServicios();
        });
    });
}

let total = 0;
function calcTotal(){
    const precios = serviciosElegidos.map(elemento => {
        return parseInt(elemento[1]);
    })
    total = precios.reduce((x,y) => x+y );
}

function displayTurno(){
    const blockTurnos = document.querySelector('#turnos .default');
    const ableTurnos = document.querySelector('#turnos .solicitarTurnos');
    if (serviciosElegidos.length === 0){
        ableTurnos.classList.add('hidden');
        blockTurnos.classList.remove('hidden');
    } else {
        ableTurnos.classList.remove('hidden');
        blockTurnos.classList.add('hidden');
    }
}

function cuentaServicios(){
    const root = document.querySelector('#cuenta-servicios');
    let x = root.childNodes.length;
    for(x; x > 0; x--){
        root.childNodes[x-1].remove();
    }
    serviciosElegidos.forEach(servicio => {
        const nombreServicio = document.createElement('P');
        nombreServicio.textContent = servicio[0];
        root.appendChild(nombreServicio);
    });
    const link = document.createElement('A');
    const button = document.createElement('BUTTON');
    link.href = '#servicios';
    button.textContent = 'Modificar Servicios';
    link.appendChild(button);
    root.appendChild(link);
}