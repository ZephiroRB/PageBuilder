$.widget( "custom.page", {
    _create: function() {
        const _this_global = this;
        const elementPage = $(this.element);

        // creación de header
        elementPage.append("<div class='col-sm-12 page-header'>"+
                                "<div class='row pt-2 pb-2'>"+
                                    "<div class='col-sm-9'>Fecha: "+getCurrentDate()+"</div>"+
                                    "<div class='col-sm-3'>"+
                                        "<button type='button' class='btn btn-danger' id='btnRemoveElements'>Remove Elements</button>"+
                                    "</div>"+
                                "</div>"+
                           "</div>");

        $("#btnRemoveElements").click( function () {
            // TODO ELIMINAR ELEMENTOS PARA PODER EMPEZAR A CONSTRUIR DENUEVO
        })

        // Creando zona donde se arrastraran los elementos
        this._createPageBuilder();

    },
    _createPageBuilder: function () {
        const _this_global = this;
        const elementPage = $(this.element);
        elementPage.append("<div class='pageBuilder' id='pageBuilder'><span class='text-drop'>Drag and Drop</span></div>");

        $( "#pageBuilder" ).droppable({
            accept: ".btn-menu",
            classes: {
            "ui-droppable-active": "ui-state-highlight"
            },
            drop: function( event, ui ) {
                const elementDragId = ui.draggable[0].id;
                _this_global.createBox(ui.draggable);
                
                if ( elementDragId.toUpperCase() === 'BTNMENUTEXT') {
                    _this_global.addTextElement();
                    radio(createOptionsElementText).broadcast( $(".box:last textarea") );
                    radio(showMenu).broadcast();
                }

                if ( elementDragId.toUpperCase() === 'BTNMENUIMAGES') {
                    _this_global.addImageElement();
                    radio(createOptionsElementImage).broadcast($(".box:last img"));
                    radio(showMenu).broadcast();
                }

                if ( elementDragId.toUpperCase() === 'BTNMENUBUTTONS') {
                    _this_global.addButtonElement();
                    radio(createOptionsElementButton).broadcast($(".box:last button"));
                    radio(showMenu).broadcast();
                }
                
            }
        });
    },
    createBox: function ($item) {
        const pageBuilder = $("#pageBuilder");
        pageBuilder.css('border', 'none');
        $(".text-drop").remove();
        pageBuilder.append("<div class='mb-2 box'></div>");
        $( "#pageBuilder" ).sortable({
            axis: "y"
        });
    },
    keepScrollAtTheEnd: function () {
        $("#pageBuilder").scrollTop( $("#pageBuilder").prop('scrollHeight') );
    },
    addButtonElement: function () {
        $(".box:last").append("<button class='btn btn-primary'> Text </button><input class='inputTextButtonElement' value='Text' type='text'/>");

        $(".box:last button").click( function (e) {
            const textButton = $(this).text();
            const inputHidden = $(this).next('input');
            
            inputHidden.css('display','inline-block');
            inputHidden.val( textButton);
            $("#inputTextButton").val(textButton);
            
            $(this).text('')
        });

        $(".box:last .inputTextButtonElement").keyup( function (e) {
            const value = e.target.value;
            $("#inputTextButton").val(value);
        });

        $(".box:last .inputTextButtonElement").blur( function (e) {
            $(this).css('display','none');
            $(this).prev('button').text(e.target.value)
        });

        $(".box:last").click( function (e) {
            radio(createOptionsElementButton).broadcast($(this).find('button'));
            radio(showMenu).broadcast();
        });
        this.keepScrollAtTheEnd();
    },
    addTextElement: function () {
        $(".box:last").append("<textarea class='inputTextElement' autofocus placeholder='Start writing here...'></textarea>");

        $(".box:last").click( function (e) {
            radio(createOptionsElementText).broadcast( $(this).find('textarea'));
            radio(showMenu).broadcast();
        });

        this.keepScrollAtTheEnd();
    },
    addImageElement: function () {
        const _this_global = this;
        const id = "boxInputFileImage"+$("#pageBuilder .box").length;
        $(".box:last").append("<span class='fa fa-columns btnColumnsOption'></span>");
        $(".box:last").append("<div class='containerBox'>"+
                                "<div class='column'>"+
                                    "<label class='boxImage' for='"+id+"'>"+
                                        "<img src='./assets/images/imageCamara.png' alt='img default'/>"+
                                    "</label>"+
                                    "<input type='file' id='"+id+"' class='inputFileImage' />"+
                                "</div>"+
                            "</div>");

        $("#"+id+"").change( function () {
            _this_global.filePreview(this);
        });

        $(".box:last .column:first").click( function (e) {
            radio(createOptionsElementImage).broadcast($(this).find('img'));
            radio(showMenu).broadcast();
        });

        $(".box:last .btnColumnsOption").click( function (e) {
           /**
            *  CREAR EVENTO AÑADIR 2 COLUMNAS
            * **/

        });

        this.keepScrollAtTheEnd();
    },
    filePreview: function (input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            reader.onload = function (e) {  
                const labelContainerImage = $("#"+input.id+"").prev();
                labelContainerImage.find('img').attr('src', e.target.result);
            }
            reader.readAsDataURL(input.files[0]);
        }
    }
});