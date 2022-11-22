// Encapsulamos todo en una función auto ejecutable de con jQuery.
$(function() {
    // Creamos un objeto.
    const Bienes = {

        formulario: $("#formulario"),
        btnMostrarTodos: $('#mostrarTodos'),
        mostrarBienes: $('#bienes'),

        // Función para inicializar las demas funciones.
        Init: function() {
            let self = this;
            self.cargarSelect();
            self.BuscarTodo();
            self.formulario.submit( (event) => {
                event.preventDefault();
                self.buscarBienes();
            });
        },

        // Cragar campos select.
        cargarSelect: function() {
            $('select').formSelect();
        },



        BuscarTodo: function() {
            let self = this;
            self.btnMostrarTodos.on('click', (e) => {
                let datos = {todos: ""};
                self.dataAjax(datos);
                e.preventDefault();
            });
        },

        // Envio de datos.
        buscarBienes: function() {
            let self = this;
            let ciudad = $('form').find('select[id="selectCiudad"]').val();
            let tipo = $('form').find('select[id="selectTipo"]').val();
            var from = self.toPrecio($('.irs-from').text())
            var to = self.toPrecio($('.irs-to').text())

            let datos = {ciudad: ciudad, tipo: tipo, from: from, to: to}
            // callback de AJAX y le pasamos el parametro.
            self.dataAjax(datos);
        },

        // Obtener datos con AJAX.
        dataAjax: function(datos) {
            let self = this;
            $.ajax({
                url: 'buscador.php',
                type: 'POST',
                data: datos,
            }).done(function(data) {
                // Le pasamos la función JSON_parse a "data" para convertirlo a un array.
                let newData = JSON.parse(data);
                self.bienesContainer(newData);
                console.log(newData);
            });
        },

        toPrecio: function(valor){
            var precio = valor
            var nuevoPrecio = Number(precio.replace('$', '').replace(',', '').replace(' ', ''))
            return nuevoPrecio
        },

        // Ingresar codigo html (cards), para mostrar los resultados de la busqueda.
        bienesContainer: function(inmuebles) {
            let self = this;
            let bienes = inmuebles;
            self.mostrarBienes.html('');

            bienes.map( (bienes) => {
                let cardTemplate ='<div class="col s12 m7">'+
                    '<div class="card horizontal">'+
                    '<div class="card-image">'+
                    '<img src="img/home.jpg">'+
                    '</div>'+
                    '<div class="card-stacked">'+
                    '<div class="card-content">'+
                    '<div><b>Código Postal:</b> :Codigo_Postal:<p></p></div>'+
                    '<div><b>Ciudad:</b> :Ciudad:<p></p></div>'+
                    '<div><b>Dirección:</b> :Direccion:<p></p></div>'+
                    '<div><b>Telefono:</b> :Telefono:<p></p></div>'+
                    '<div><b>Tipo:</b> :Tipo:<p></p></div>'+
                    '<div><b>Precio:</b> :Precio:<p></p></div>'+
                    '</div>'+
                    '<div class="card-action">'+
                    '<a href="#">más información</a>'+
                    '</div>'+
                    '</div>'+
                    '</div>';
                let newCard = cardTemplate.replace(':Direccion:', bienes.Direccion)
                    .replace(':Ciudad:', bienes.Ciudad)
                    .replace(':Telefono:', bienes.Telefono)
                    .replace(':Codigo_Postal:', bienes.Codigo_Postal)
                    .replace(':Tipo:', bienes.Tipo)
                    .replace(':Precio:', bienes.Precio)

                self.mostrarBienes.append(newCard);
            });
        },

    };
    // Realizamos el llamado del Init del objeto Bienes.
    Bienes.Init();
});