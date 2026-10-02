// Función oficial de la DIAN para calcular el Dígito de Verificación (DV)
function calcularDV(nit) {
    // Limpiamos el texto: solo dejamos números
    const soloNumeros = nit.replace(/\D/g, '');

    if (!soloNumeros || soloNumeros.length === 0) {
        return null;
    }

    const factores = [71, 67, 59, 53, 47, 43, 41, 37, 29, 23, 19, 17, 13, 7, 3];
    const longitud = soloNumeros.length;
    let suma = 0;

    for (let i = 0; i < longitud; i++) {
        // Multiplicamos cada dígito de derecha a izquierda por su factor
        suma += parseInt(soloNumeros.charAt(i), 10) * factores[factores.length - longitud + i];
    }

    const residuo = suma % 11;

    if (residuo > 1) {
        return 11 - residuo;
    }
    return residuo; // 0 o 1
}

// Interceptamos el formulario
const formulario = document.getElementById('formConsulta');
const resultado = document.getElementById('resultado');

formulario.addEventListener('submit', function (evento) {
    evento.preventDefault();

    const inputNit = document.getElementById('nit').value.trim();
    const selectTipo = document.getElementById('tipo');
    const nombreTipo = selectTipo.options[selectTipo.selectedIndex].text;

    // Calculamos el Dígito de Verificación
    const dv = calcularDV(inputNit);
    const soloNumeros = inputNit.replace(/\D/g, '');

    if (dv === null) {
        alert('Por favor ingrese un número de identificación válido.');
        return;
    }

    // Formateamos el NIT limpio con su DV calculado
    const nitCompleto = `${soloNumeros} - ${dv}`;
    const fecha = new Date().toLocaleDateString('es-CO');

    resultado.innerHTML = `
        <div class="alerta-exito">
            <h3>Resultado de la Consulta</h3>
            <p><strong>NIT Oficial Calculado:</strong> ${nitCompleto}</p>
            <p><strong>Dígito de Verificación (DV):</strong> <span class="badge">${dv}</span></p>
            <p><strong>Módulo Solicitado:</strong> ${nombreTipo}</p>
            <p><strong>Estado DIAN:</strong> <span class="badge">Habilitado / Al Día</span></p>
            <small>Fecha de validación: ${fecha}</small>
        </div>
    `;

    resultado.style.display = 'block';
});