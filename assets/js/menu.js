$.widget("custom.menu", {
  _create: function () {
    const _this_global = this;
    const elementMenu = $(this.element);

    elementMenu.append("<div id='containerButtonMenu'></div>");

    this.createDraggable("fa fa-text-width", "Text", "btnMenuText");
    this.createDraggable("fa fa-camera", "Image", "btnMenuImages");
    this.createDraggable("fa fa-square-o", "Button", "btnMenuButtons");

    elementMenu.append(
      "<div class='col-sm-12 p-2' id='menu-option-elements'>" +
        "<div class='row'>" +
        "<div class='header-sub-menu col-sm-12'>" +
        "<button type='button' id='btnCloseMenu' class='btn btn-danger'> cancelar </button>" +
        "</div>" +
        "</div>" +
        "<div class='row'>" +
        "<div class='col-sm-12' id='sub-menu-options'> dddd" +
        "</div>" +
        "</div>" +
        "</div>"
    );

    $("#btnCloseMenu").click(function () {
      _this_global.hiddenMenuOptions();
    });

    radio(hiddenMenu).subscribe([
      function () {
        this.hiddenMenuOptions();
      },
      this,
    ]);

    radio(showMenu).subscribe([
      function () {
        this.showMenuOptions();
      },
      this,
    ]);

    radio(createOptionsElementButton).subscribe([
      function (element) {
        this.createOptionsWidhtAndHeigth(element);
        this.createOptionsChangeTextButton(element);
      },
      this,
    ]);

    radio(createOptionsElementImage).subscribe([
      function (element) {
        this.createOptionsWidhtAndHeigth(element);
      },
      this,
    ]);

    radio(createOptionsElementText).subscribe([
      function (element) {
        this.createOptionsElementText(element);
      },
      this,
    ]);
  },
  createDraggable: function (icon, text, id) {
    const containerButtonMenu = $("#containerButtonMenu");
    containerButtonMenu.append(
      "<div class='shadow-sm m-1 p-3 btn-menu' id='" +
        id +
        "'>" +
        "<i class='iconButton " +
        icon +
        "'></i>" +
        "<span> " +
        text +
        "</span>" +
        "<div>"
    );
    $("#" + id + "").draggable({
      containment: "document",
      helper: "clone",
      cursor: "move",
    });
  },
  showMenuOptions: function () {
    $("#menu-option-elements").animate(
      {
        left: 0,
        right: 0,
      },
      300
    );
  },
  hiddenMenuOptions: function () {
    $("#menu-option-elements").animate(
      {
        left: "100%",
      },
      300
    );
  },
  createOptionsWidhtAndHeigth: function (element) {
    const _this_global = this;

    const parentBoxWidth = element[0].parentElement.clientWidth;
    const parentBoxHeight = element[0].parentElement.clientHeight;
    const initialWidth = (element[0].clientWidth * 100) / parentBoxWidth;
    const initialHeight = (element[0].clientHeight * 100) / parentBoxHeight;
    
    $("#sub-menu-options").html(
      "<div class='form-group'>" +
        "<label for='inputWidthButton'>Width: </label>" +
        "<input type='range'value='" +
        initialWidth +
        "' min='" +
        initialWidth +
        "' max='100'  class='form-control-range' id='inputWidthButton'>" +
        "</div>" +
        "<div class='form-group'>" +
        "<label for='inputHeightButton'>Height: </label>" +
        "<input type='range' min='" +
        initialHeight +
        "' max='100' value='" +
        initialHeight +
        "' class='form-control-range' id='inputHeightButton'>" +
        "</div>"
    );

    $("#inputWidthButton").change(function (e) {
      //TODO mas grande
    });

    $("#inputHeightButton").change(function (e) {
      //TODO  mas alto
    });
  },
  createOptionsChangeTextButton: function (element) {
    console.log(element);
    $("#sub-menu-options").append(
      "<div class='form-group'>" +
        "<label for='inputTextButton'>Text button: </label>" +
        "<input type='text' class='form-control' value='" +
        element[0].innerHTML +
        "' id='inputTextButton'>" +
        "</div>"
    );

    $("#inputTextButton").keyup(function (e) {
      const value = $(this).val();
      element[0].innerText = value;
    });
  },
  createOptionsElementText: function (elementTextaera) {
    $("#sub-menu-options").html(
      "<div class='row p-2'>" +
        "<div class='col-sm-4'>" +
        "<button class='btnAlignText' type='button' id='btnLeft' title='align left'>" +
        "<i class='fa fa-align-left' aria-hidden='true'></i>" +
        "</button>" +
        "</div>" +
        "<div class='col-sm-4'>" +
        "<button class='btnAlignText' type='button' id='btnCenter' title='align center'>" +
        "<i class='fa fa-align-center' aria-hidden='true'></i>" +
        "</button>" +
        "</div>" +
        "<div class='col-sm-4'>" +
        "<button class='btnAlignText' type='button' id='btnRight' title='align right'>" +
        "<i class='fa fa-align-right' aria-hidden='true'></i>" +
        "</button>" +
        "</div>" +
        "</div>"
    );

    $("#btnLeft").click(function () {
      //TODO alinear a la izquierda
    });

    $("#btnCenter").click(function () {
      //TODO alinear centrar
    });

    $("#btnRight").click(function () {
      //TODO alinear a la derecha
    });
  },
  animateWidthElement: function (element, width) {
    element.animate(
      {
        width: width + "%",
      },
      300
    );
  },
  animateHeightElement: function (element, height) {
    element.animate(
      {
        height: height + "%",
      },
      300
    );
  },
});
