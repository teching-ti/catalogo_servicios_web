document.addEventListener('DOMContentLoaded', ()=>{

    let url = "./js/datos.json";

    const btnCambiarModo = document.querySelector(".btn-cambiar-modo");

    btnCambiarModo.addEventListener("click", ()=>{
        const header = document.querySelector("header");
        const mensajeTexoImagen = document.querySelector(".mensaje-inicial-imagen-texto");

        if(header.className=='header-oscuro'){
            header.classList.remove("header-oscuro");
            header.classList.add("header-claro");

            mensajeTexoImagen.classList.remove("mensaje-inicial-imagen-texto-oscuro");
            mensajeTexoImagen.classList.add("mensaje-inicial-imagen-texto-claro");
        }else{
            header.classList.remove("header-claro");
            header.classList.add("header-oscuro");

            mensajeTexoImagen.classList.remove("mensaje-inicial-imagen-texto-claro");
            mensajeTexoImagen.classList.add("mensaje-inicial-imagen-texto-oscuro");
        }

        const sectionTextoIntermedio = document.querySelector(".texto-intermedio");

        if(sectionTextoIntermedio.className.includes('texto-intermedio-oscuro')){
            sectionTextoIntermedio.classList.remove("texto-intermedio-oscuro");
            sectionTextoIntermedio.classList.add("texto-intermedio-claro");
        }else{
            sectionTextoIntermedio.classList.remove("texto-intermedio-claro");
            sectionTextoIntermedio.classList.add("texto-intermedio-oscuro");
        }

        const organizacionesServiciosContenedor = document.querySelector(".organizaciones-servicios");
        const tituloOrganizacioenServicios = document.querySelector(".organizaciones-servicios-titulo");
        if(organizacionesServiciosContenedor.className.includes('organizaciones-servicios-oscuro')){
            organizacionesServiciosContenedor.classList.remove('organizaciones-servicios-oscuro');
            organizacionesServiciosContenedor.classList.add("organizaciones-servicios-claro");
            tituloOrganizacioenServicios.style.color = "black";
        }else{
            organizacionesServiciosContenedor.classList.remove('organizaciones-servicios-claro');
            organizacionesServiciosContenedor.classList.add("organizaciones-servicios-oscuro");
            tituloOrganizacioenServicios.style.color = "white";
        }
    });

    const listaOrganizaciones = document.querySelector(".contenedor-opciones");
    const casillaCreada = document.createElement("div");

    fetch(url)
        .then(response=>response.json())
        .then(data=>{
            let organizaciones = data.organizaciones;
            organizaciones.forEach(org=>{
                let item = document.createElement("div");
                item.className = "btn-organizacion";
                item.textContent = org.nombre;
                listaOrganizaciones.appendChild(item);
            });
        })
        .catch(error=>console.error("Error al cargar el archivo", error));

    setTimeout(function(){
        const btnOrganizacion = document.querySelectorAll(".btn-organizacion");
        btnOrganizacion.forEach((e)=>{
            e.addEventListener("click", ()=>{
                let nombre = e.innerText.trim();
                const contenedorOrganizacionServicios = document.getElementById("contenedor-organizacion-a-mostrar")
                contenedorOrganizacionServicios.scrollIntoView({ behavior: 'smooth' });

                //hidden
                setTimeout(function(){
                    setTimeout(function(){
                        contenedorOrganizacionServicios.classList.remove("hidden")
                        contenedorOrganizacionServicios.classList.add("visible")
                    }, 300)
                    contenedorOrganizacionServicios.classList.remove("visible")
                }, 400)

                /*  Modificar texto de nombre para que el navegador interprete el texto como ID&QA y no recurra a escapes para pdoer mostar el carater   & */
                fetch(url)
                    .then(response => response.json())
                    .then(data => {
                        setTimeout(function(){
                            let organizacion = data.organizaciones.find(o => o.nombre == nombre);
                            if (organizacion) {
                                let serviciosId = organizacion.servicios.map(id => id.trim());
                                let servicios = data.servicios.filter(servicio => serviciosId.includes(servicio.id));
                                let contenedorOrganizacion = document.querySelector(".contenedor-organizacion-a-mostrar");
                                
                                contenedorOrganizacion.innerHTML = '';
                                let organizacionEspecifica = document.createElement("div");
                                organizacionEspecifica.className="probando";
                                organizacionEspecifica.innerHTML = `<p>Servicios ofrecidos al área de ${nombre}</p>`;
                                let serviciosList = document.createElement("ul");
                                serviciosList.className = "lista-servicios";
    
                                servicios.forEach(servicio => {
                                    let servicioItem = document.createElement("li");
                                    servicioItem.classList.add("servicio");
                                    servicioItem.innerHTML = `<span>${servicio.nombre}</span>`;
                                    servicioItem.addEventListener("click", (event) => {
                                        event.stopPropagation();
                                        toggleExpand(servicioItem);
                                        mostrarFamiliaYSubservicios(servicio, data, servicioItem);
                                    });
                                    serviciosList.appendChild(servicioItem);
                                });
                                contenedorOrganizacion.classList.add("hidden")
                                organizacionEspecifica.appendChild(serviciosList);
                                contenedorOrganizacion.appendChild(organizacionEspecifica);
                            }
                        }, 400)

                    })
                    .catch(error => console.error("Error al cargar el archivo", error));
            });
        });
    }, 1000);

    function toggleExpand(element) {
        element.classList.toggle("expand");
    }

    function mostrarFamiliaYSubservicios(servicio, data, servicioElement) {
        let familia = data.familias.find(f => f.id === servicio.id_familia_servicios);
        let subservicios = data.subservicios.filter(ss => ss.id_servicio === servicio.id);

        if (familia || subservicios.length) {
            let familiaDiv = document.createElement("div");
            familiaDiv.classList.add("familia");
            familiaDiv.innerHTML = `<p>Familia: ${familia ? familia.nombre_familia : 'N/A'}</p>`;
            let subserviciosList = document.createElement("ul");

            subservicios.forEach(ss => {
                let subservicioItem = document.createElement("li");
                subservicioItem.classList.add("subservicio");
                subservicioItem.innerHTML = `<span>${ss.nombre}</span>`;
                subservicioItem.addEventListener("click", (event) => {
                    event.stopPropagation();
                    toggleExpand(subservicioItem);
                });
                subserviciosList.appendChild(subservicioItem);
            });

            familiaDiv.appendChild(subserviciosList);
            servicioElement.appendChild(familiaDiv);
        }
    }
});
