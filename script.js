// Simulación de base de datos de usuarios
let userDatabase = {};
let saldo = 1000.00; // Saldo inicial con decimales

// Función para registrar un nuevo usuario
function registrarUsuario() {
    const documento = document.getElementById('documento-register').value;
    const nombre = document.getElementById('nombre-register').value;
    const password = document.getElementById('password-register').value;

    const mensajeError = document.getElementById('register-error-message');
    const mensajeExito = document.getElementById('registro-mensaje');

    // Limpiar mensajes previos
    mensajeError.innerText = "";
    mensajeExito.innerText = "";

    if (documento.trim() === "" || nombre.trim() === "" || password.trim() === "") {
        mensajeError.innerText = "Por favor, completa todos los campos.";
        return;
    }

    if (userDatabase[documento]) {
        mensajeError.innerText = "Este número de documento ya está registrado.";
        return;
    }

    // Guardar los datos del nuevo usuario
    userDatabase[documento] = { nombre, password };
    
    // Limpiar campos de registro
    document.getElementById('documento-register').value = '';
    document.getElementById('nombre-register').value = '';
    document.getElementById('password-register').value = '';

    // Mostrar mensaje de registro exitoso
    mensajeExito.innerText = "Registro exitoso. Ahora puedes iniciar sesión.";
}

// Función para validar el inicio de sesión
function validarUsuario() {
    const identificacion = document.getElementById('email').value;
    const password = document.getElementById('password').value;

    const mensajeError = document.getElementById('error-message');

    // Limpiar mensaje de error previo
    mensajeError.innerText = "";

    if (identificacion.trim() === "" || password.trim() === "") {
        mensajeError.innerText = "Por favor, completa ambos campos.";
        return;
    }

    // Verificar credenciales de inicio de sesión
    if (userDatabase[identificacion] && userDatabase[identificacion].password === password) {
        mostrarMenu(userDatabase[identificacion].nombre);
    } else {
        mensajeError.innerText = "Identificación o contraseña incorrectas.";
        
        // Limpiar los campos del login después de mostrar el error
        document.getElementById('email').value = '';
        document.getElementById('password').value = '';
    }
}

// Función para mostrar el menú
function mostrarMenu(nombreUsuario) {
    document.getElementById('login-box').style.display = "none";
    document.getElementById('register-box').style.display = "none";
    document.getElementById('menu-box').style.display = "block";
    document.getElementById('nombre-usuario').innerText = nombreUsuario;
    mostrarFechaHora();
    mostrarSaldo();
}

// Función para mostrar la fecha y hora actuales
function mostrarFechaHora() {
    const fechaHoraActual = new Date().toLocaleString();
    document.getElementById('fecha-hora').innerText = fechaHoraActual;
}

// Función para mostrar el saldo actual
function mostrarSaldo() {
    document.getElementById('saldo-actual').innerText = "Saldo actual: $" + saldo.toFixed(2); // Mostrar saldo con 2 decimales
}

// Función para mostrar el formulario según la opción seleccionada
function mostrarFormulario(operacion) {
    const formularioContainer = document.getElementById('formulario-container');
    formularioContainer.style.display = 'block';
    formularioContainer.innerHTML = ""; // Limpiar cualquier alerta previa

    if (operacion === 'saldo') {
        formularioContainer.innerHTML = `<p>Tu saldo actual es: $${saldo.toFixed(2)}</p>`; // Mostrar saldo con 2 decimales
    } else if (operacion === 'retiro') {
        formularioContainer.innerHTML = `
            <h3>Retirar dinero</h3>
            <label for="monto-retiro">Monto a retirar:</label>
            <input type="number" id="monto-retiro" step="0.01"> <!-- Permitir decimales -->
            <p id="alerta-retiro" class="error-message"></p>
            <button onclick="realizarRetiro()">Confirmar Retiro</button>
        `;
    } else if (operacion === 'consignar') {
        formularioContainer.innerHTML = `
            <h3>Consignar dinero</h3>
            <label for="monto-consignar">Monto a consignar:</label>
            <input type="number" id="monto-consignar" step="0.01"> <!-- Permitir decimales -->
            <button onclick="realizarConsignacion()">Confirmar Consignación</button>
        `;
    }
}

// Función para realizar el retiro
function realizarRetiro() {
    const monto = parseFloat(document.getElementById('monto-retiro').value);
    const alertaRetiro = document.getElementById('alerta-retiro');

    // Limpiar cualquier alerta anterior
    alertaRetiro.innerText = "";

    if (monto > saldo) {
        // Mostrar alerta de saldo insuficiente dentro de la página
        alertaRetiro.innerText = "Saldo insuficiente para realizar el retiro.";
    } else if (monto > 0) {
        saldo -= monto;
        document.getElementById('formulario-container').innerHTML = `
            <p>Has retirado $${monto.toFixed(2)}. Saldo actual: $${saldo.toFixed(2)}.</p>
        `;
        mostrarSaldo();
    } else {
        alertaRetiro.innerText = "Ingrese un monto válido.";
    }
}

// Función para realizar la consignación
function realizarConsignacion() {
    const monto = parseFloat(document.getElementById('monto-consignar').value);
    if (monto > 0) {
        saldo += monto;
        document.getElementById('formulario-container').innerHTML = `
            <p>Has consignado $${monto.toFixed(2)}. Saldo actual: $${saldo.toFixed(2)}.</p>
        `;
        mostrarSaldo();
    } else {
        alert("Ingrese un monto válido.");
    }
}

// Función para salir
function salir() {
    alert("Gracias por usar Bank Money Way. ¡Hasta luego!");
    
    // Limpiar los campos del login cuando se cierra sesión
    document.getElementById('email').value = '';
    document.getElementById('password').value = '';
    
    document.getElementById('menu-box').style.display = "none";
    document.getElementById('login-box').style.display = "block";
}

// Funciones para cambiar entre registro y login
function mostrarRegistro() {
    // Limpiar mensaje de registro exitoso
    document.getElementById('registro-mensaje').innerText = "";
    
    document.getElementById('login-box').style.display = "none";
    document.getElementById('register-box').style.display = "block";
}

function mostrarLogin() {
    // Limpiar mensaje de error en el login
    document.getElementById('error-message').innerText = "";

    document.getElementById('register-box').style.display = "none";
    document.getElementById('login-box').style.display = "block";
}
