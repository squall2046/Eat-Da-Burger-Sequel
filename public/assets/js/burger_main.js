$(document).ready(function () {

  $(document).on("submit", ".newForm", newBurgerFn);
  $(document).on("click", ".state", newEaterFn);

  //////////////// create new burger from input form ////////////////
  function newBurgerFn(event) {
    event.preventDefault();

    const burgerInput = $("#burgerInput").val().trim();


    if (burgerInput.length < 1) {
      Swal.fire({
        text: 'What burger would you like to have?',
        title: "Before Submit...",
        animation: false,
        imageUrl: '/assets/img/burger-load.gif',
        imageWidth: 100,
        imageHeight: 100,
        customClass: 'animated fadeIn'
      })
    } else {
      $.ajax({
        type: "POST",
        url: "/api/burger/" + burgerInput,

      })
        .then(() => {
          location.reload();
        });
    }
  };

  //////////////// update burger condition from noDevour/devoured list to devoured/noDevour list ////////////////
  function newEaterFn() {
    Swal.fire({
      title: 'Please Initial Here',
      text: 'The order won\'t be placed without Initial 😊',
      imageUrl: '/assets/img/burger-load.gif',
      imageWidth: 100,
      imageHeight: 100,
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off'
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true
    }).then((eaterInit) => {
      let burgerId = $(this).data("id");
      console.log("init:", eaterInit);
      console.log("init:", eaterInit.value);
      console.log("burgerId:", burgerId);

      if (eaterInit.value.length > 0) {
        $.ajax({
          type: "POST",
          url: "/api/eater/" + eaterInit.value,
          data: { foreignKey: burgerId }
        }).then(
          function (posts) {
            console.log(posts);
          });

        $.ajax({
          type: "PUT",
          url: "/api/update/" + burgerId,
        }).then(
          function () {
            location.reload();
          });
      }
    });
  };
})