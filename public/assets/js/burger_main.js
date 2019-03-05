$(document).ready(function () {

  $(document).on("submit", ".newForm", newBurgerFn);
  $(document).on("click", ".state", newEaterFn);

  //////////////// create new burger from input form ////////////////
  function newBurgerFn(event) {
    event.preventDefault();

    const burgerInput = $("#burgerInput").val().trim();
    // burger_name 写在Ajax POST 的 api 地址栏里了.
    // devoured 写在 models>dbBurger 的defaultValue里了.
    // 所以以下 newBurger 部分不要了.
    // let newBurger = {
    //   burger_name: burgerInput,
    //   devoured: 0
    //   // in DB, devoured is boolean: 0 is false; 1 is true
    // };

    if (burgerInput.length < 1) {
      Swal.fire({
        // background: '#fff url("/assets/img/burger-load.gif")',
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
        // data 就是 ajax 地址栏里的 burgerInput
        // data: newBurger
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
      text: 'Confirm your order before signature.',
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

      $.ajax({
        type: "POST",
        url: "/api/eater/" + eaterInit.value,
        data: {foreignKey: burgerId}
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
    });
  };

  //////////////// another way to POST new eater, if there are many column not only Name ////////////////
  // function anotherNewEaterFunctionWay() {
  //   let id = $(this).data("id");
  //   console.log("id is: ", id);

  //   let eaterInput = $("#eaterInput").val().trim();
  //   let newEater = {
  //     eater_name: eaterInput
  //   }
  //   console.log(newEater);

  //   $.ajax("/api/eater/" + id, {
  //     type: "POST",
  //     data: newEater
  //   })
  //     .then(() => {
  //       location.reload();
  //     });
  // };

  //   let id = $(this).data("id");
  //   console.log($(this).data);

  //   let newState = {
  //     devoured: true
  //   };

  //////////////// another way to PUT ////////////////
  //   $.ajax("/api/state/" + id, {
  //     type: "PUT",
  //     data: newState
  //   })
  //     .then(() => {
  //       location.reload();
  //     });
})