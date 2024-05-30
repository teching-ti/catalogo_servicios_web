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

    let url = "./js/datos.json"

    const btnOrganizacion = document.querySelectorAll(".btn-organizacion")
    btnOrganizacion.forEach((e)=>{
        e.addEventListener("click", ()=>{

            let nombre = e.innerHTML.trim();
            
            fetch(url)
                .then(response=>response.json())
                .then(data=>{
                    let organizacion = data.organizaciones.find(o=>o.nombre==nombre)

                    if(organizacion){
                        let serviciosId = organizacion.servicios.map(id=>id.trim())

                        let servicios = data.servicios.filter(servicio => serviciosId.includes(servicio.id))
                        let nombreServicios = servicios.map(servicio => servicio.nombre)

                        console.log(nombreServicios)

                        let organizacion_especifica = document.createElement("div")

                        organizacion_especifica.innerHTML = `<p>${nombre} - Servicios</p><ul>${nombreServicios.map(nombre => `<li>${nombre}</li>`).join('')}</ul>`
                        
                        let contenedor_organizacion = document.querySelector(".contenedor-organizacion-a-mostrar");
                        
                        contenedor_organizacion.innerHTML = '';
                        contenedor_organizacion.appendChild(organizacion_especifica);
                    }   

                })

            .catch(error=>console.error("Error al cargar el archivo", error))
        })
    })

})

/* diagramas de flujo sobre la creación y atención de tickets */