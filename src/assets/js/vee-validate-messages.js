function getMessages() {
  const dictionary = {
    en: {
      messages: {
        confirmed: function () {
          return "Tu contraseña no esta confirmada"
        },
        required: function () {
          return "Campo no puede estar vacio"
        },
        min: function () {
          return "Faltan caracteres"
        },
        max: function () {
          return "Escribe un poco menos por favor"
        },
        email: function () {
          return "Tu email es incorrecto"
        },
        numeric: function () {
          return "Ingresa solo numeros por favor"
        },
        alpha: function () {
          return 'Ingresa solo letras por favor'
        }
      }
    }
  };
  return dictionary
}

export default getMessages();
