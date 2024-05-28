document.addEventListener('DOMContentLoaded', ()=>{

    const btnCambiarModo = document.querySelector(".btn-cambiar-modo")

    btnCambiarModo.addEventListener("click", ()=>{
        const header = document.querySelector("header")
        const mensajeTexoImagen = document.querySelector(".mensaje-inicial-imagen-texto")

        if(header.className=='header-oscuro'){
            header.classList.remove("header-oscuro")
            header.classList.add("header-claro")

            mensajeTexoImagen.classList.remove("mensaje-inicial-imagen-texto-oscuro")
            mensajeTexoImagen.classList.add("mensaje-inicial-imagen-texto-claro")
        }else{
            header.classList.remove("header-claro")
            header.classList.add("header-oscuro")

            mensajeTexoImagen.classList.remove("mensaje-inicial-imagen-texto-claro")
            mensajeTexoImagen.classList.remove("mensaje-inicial-imagen-texto-oscuro")
        }

        const sectionTextoIntermedio = document.querySelector(".texto-intermedio")

        if(sectionTextoIntermedio.className.includes('texto-intermedio-oscuro')){
            sectionTextoIntermedio.classList.remove("texto-intermedio-oscuro")
            sectionTextoIntermedio.classList.add("texto-intermedio-claro")
        }else{
            sectionTextoIntermedio.classList.remove("texto-intermedio-claro")
            sectionTextoIntermedio.classList.add("texto-intermedio-oscuro")
        }

        const organizacionesServiciosContenedor = document.querySelector(".organizaciones-servicios")
        const tituloOrganizacioenServicios = document.querySelector(".organizaciones-servicios-titulo")
        if(organizacionesServiciosContenedor.className.includes('organizaciones-servicios-oscuro')){
            organizacionesServiciosContenedor.classList.remove('organizaciones-servicios-oscuro')
            organizacionesServiciosContenedor.classList.add("organizaciones-servicios-claro")
            tituloOrganizacioenServicios.style.color = "black"
        }else{
            organizacionesServiciosContenedor.classList.remove('organizaciones-servicios-claro')
            organizacionesServiciosContenedor.classList.add("organizaciones-servicios-oscuro")
            tituloOrganizacioenServicios.style.color = "white"
        }
    })

    const btnOrganizacion = document.querySelectorAll(".btn-organizacion")
    btnOrganizacion.forEach((e)=>{
        e.addEventListener("click", ()=>{
            // realizar una operación similar cargando y mostrando los servicos que el área de ti ofrece a cda organizacipin¿ín 
            let organizacion_especifica = document.createElement("div")
            organizacion_especifica.innerHTML = `<p>Probando en caso del primer dato</p>`
            // implementar sistema de base de datos o json para poder cargar información en el servidor

            let conteneddor_organizacion = document.querySelector(".contenedor-organizacion-a-mostrar")
            conteneddor_organizacion.appendChild(organizacion_especifica)
        })
    })

    // consultas
    let url = "./js/datos.json"

    fetch(url)
        .then(response => {
        // verificar si la respuesta es exitosa
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        // Convertir la respuesta a JSON
        return response.json();
        })
        .then(data => {
        // Trabajar con los datos
        console.log(data);

        // Ejemplo: Obtener todos los servicios de una familia específica
        const familiaId = 'f2'; // ID de la familia que deseas filtrar
        const serviciosDeFamilia = data.servicios.filter(servicio => servicio.id_familia_servicios === familiaId);

        console.log(serviciosDeFamilia);
        })
        .catch(error => {
        // Manejo de errores
        console.error('Hubo un problema con la consulta fetch:', error);
        });
    })

/* realizar un diagrama de flujo que explique lo siguiente, un usuario debe kingresar a un portal con sus credenciales, seleccionar el servicio, hacer clic en crear, colocar la información solicitada, enviar su requerimiento, con esto se crea un ticket, si el ticket  */