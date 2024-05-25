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
    })
})
/* realizar un diagrama de flujo que explique lo siguiente, un usuario debe kingresar a un portal con sus credenciales, seleccionar el servicio, hacer clic en crear, colocar la información solicitada, enviar su requerimiento, con esto se crea un ticket, si el ticket  */