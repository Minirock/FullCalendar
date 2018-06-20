 window.onload=function(){
    var mobile_device=0;
    var editing_mobile=1;
    var deleting=0;
    var duplicating_mobile=0;
    var edition_mode="Mode édition";
    var delete_mode="Mode suppression";
    var duplicate_mode="Mode duplication";

    if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
        mobile_device=1;
    }

    function editMode(){
        if(mobile_device==1){
            editing_mobile=1;
            deleting=0;
            duplicating_mobile=0;
            //On active les boutons pour dupliquer et supprimer des évents
            document.getElementById("mobile_device" ).innerHTML =
            '<button id="edit" type="button" class="btn btn-success">'+edition_mode+'</button>' +
            '<button id="duplicate" type="button" class="btn btn-danger">'+duplicate_mode+'</button>' +
            '<button id="delete" type="button" class="btn btn-danger">'+delete_mode+'</button>';
            var b_edit=document.getElementById('edit');
            var b_delete=document.getElementById('delete');
            b_edit.addEventListener('click' , editMode);
            b_delete.addEventListener('click' , deleteMode);
        }
    }

    function deleteMode(){
        if(mobile_device==1){
            deleting=1;
            editing_mobile=0;
            duplicating_mobile=0;
            //On active les boutons pour dupliquer et supprimer des évents
            document.getElementById("mobile_device" ).innerHTML =
            '<button id="edit" type="button" class="btn btn-danger">'+edition_mode+'</button>' +
            '<button id="duplicate" type="button" class="btn btn-danger">'+duplicate_mode+'</button>' +
            '<button id="delete" type="button" class="btn btn-success">'+delete_mode+'</button>';
            var b_edit=document.getElementById('edit');
            var b_delete=document.getElementById('delete');
            var b_duplicate=document.getElementById('duplicate');

            b_edit.addEventListener('click' , editMode);
            b_delete.addEventListener('click' , deleteMode);
            b_duplicate.addEventListener('click' , duplicateMode);
        }
    }

    function duplicateMode(){
        if(mobile_device==1){
            duplicating_mobile=1;
            editing_mobile=0;
            deleting=0;
            //On active les boutons pour dupliquer et supprimer des évents
            document.getElementById("mobile_device" ).innerHTML =
            '<button id="edit" type="button" class="btn btn-danger">'+edition_mode+'</button>' +
            '<button id="duplicate" type="button" class="btn btn-success">'+duplicate_mode+'</button>' +
            '<button id="delete" type="button" class="btn btn-danger">'+delete_mode+'</button>';
            var b_edit=document.getElementById('edit');
            var b_delete=document.getElementById('delete');
            var b_duplicate=document.getElementById('duplicate');

            b_edit.addEventListener('click' , editMode);
            b_delete.addEventListener('click' , deleteMode);
            b_duplicate.addEventListener('click' , duplicateMode);
        }
    }

//edit par défaut au clic
function device_button(){
        if(mobile_device==1){
            //On active les boutons pour dupliquer et supprimer des évents
            document.getElementById("mobile_device" ).innerHTML =
            '<button id="edit" type="button" class="btn btn-success">'+edition_mode+'</button>' +
            '<button id="duplicate" type="button" class="btn btn-danger">'+duplicate_mode+'</button>' +
            '<button id="delete" type="button" class="btn btn-danger">'+delete_mode+'</button>';
            var b_edit=document.getElementById('edit');
            var b_delete=document.getElementById('delete');
            var b_duplicate=document.getElementById('duplicate');

            b_edit.addEventListener('click' , editMode);
            b_delete.addEventListener('click' , deleteMode);
            b_duplicate.addEventListener('click' , duplicateMode);
    }
}

    //on attends 100 ms pour laisser le temps au calendar d'être créé et de connaitre la div en question
    setTimeout(device_button,100);

    var hoverTask;
    var copie;
    var savedEvent;

    function getEvents(){
      var ev=[
        {
          title: 'Un event test',
          start: '2018-06-18T10:00:00',
          end: '2018-06-18T12:00:00',
          description: 'Cet event aurait pu etre en BDD'
        },
        {
          title: 'Un event test 2',
          start: '2018-06-18T15:00:00',
          end: '2018-06-18T16:00:00',
          description: 'Cet event aurait pu etre en BDD aussi'
        }
      ];
      return ev;

    //pas de controle sur le mousehover des éléments n'étant pas des taches on se servira donc de la variable pour détecter le cas
    }

    function makeid() {
      var text = "";
      var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

      for (var i = 0; i < 7; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

      return text;
    }


document.addEventListener('keydown', (event) => {
  const nomTouche = event.key;

  if (nomTouche === 'Control') {
    // Pas d'alerte si seule la touche Control est pressée.
    return;
  }

    if(hoverTask==1){
        if (event.ctrlKey) {
            if(nomTouche=='c'){
                    //Copie d'une tache existante
                    copie=1;
            }
        }
    }

}, false);


 $(document).ready(function() {
        var adding=0;
        var unique=0;
        hoverTask=0;
        copie=0;

        $('#calendar').fullCalendar({

            allDaySlot: false,
            minTime: "07:00:00",
            maxTime: "21:00:00",
            weekends: false,
            locale: "fr",
          header: {
            left: 'prev,next today',
            center: 'title',
            right: 'month,agendaWeek,agendaDay'
          },
          defaultDate: '2018-06-18',
          navLinks: true, // can click day/week names to navigate views
          selectable: true,
          selectHelper: true,

          select: function(start, end,jsEvent) {
                if(copie!=1 && duplicating_mobile!=1){
                    //insertion date
                    adding=1;
                    var title = prompt('Event Title:');
                    var desc = prompt('Event Description:');
                    var eventData;
                    if (title) {
                      eventData = {
                        title: title,
                        start: start,
                        end: end,
                        description: desc
                      };
                      $('#calendar').fullCalendar('renderEvent', eventData, true); // stick? = true
                    }
                    $('#calendar').fullCalendar('unselect');
                }else{
                    //on copie savedEvent au nouvelle date
                    if(copie==1 || duplicating_mobile==1){
                        savedEvent['start']=start;
                        savedEvent['end']=end;
                        //on doit également changer l'id de l'event pour la suppression
                        savedEvent['_id']='_fc'+makeid();
                        $('#calendar').fullCalendar('renderEvent', savedEvent, true);
                        $('#calendar').fullCalendar('unselect');
                        unique=0
                        copie=0;
                    }
                }

                },
                editable: true,
                eventLimit: true, // allow 'more' link when too many events
                events: getEvents(),

        //nouvelle date
        eventClick: function(event, element) {
            if(deleting==0){
                //sur mobile on copie et édite au clic; et non sur pc
                if(mobile_device==1){
                    if(duplicating_mobile==1){
                        savedEvent=event;
                        alert("Event enregistré");
                    }else{
                        //edition mobile
                        var title_modified = prompt('Event Title:');
                        var desc_modified = prompt('Event Description:');
                        var eventData;
                        if (title_modified) {
                            event.title=title_modified;
                            event.description=desc_modified;
                            $('#calendar').fullCalendar('updateEvent', event); // stick? = true
                        }
                    }
                }else{
                    //gestion pc
                    var title_modified = prompt('Event Title:');
                    var desc_modified = prompt('Event Description:');
                    var eventData;
                    if (title_modified) {
                        event.title=title_modified;
                        event.description=desc_modified;
                        $('#calendar').fullCalendar('updateEvent', event); // stick? = true
                    }
                }
            }else{
                //suppression de l'event
                var id_event=event['_id'];
                $('#calendar').fullCalendar('removeEvents', id_event);
                //sur mobile on supprime à la chaine et non sur pc
                if(mobile_device!=1){
                    deleting=0;
                }
            }
        },

        eventMouseout : function( event, jsEvent, view ) {
                adding=0;
                hoverTask=0;
                //unique sert à ne pas récupérer les events survolé après la copie
                if(copie==1 && unique == 0){
                    savedEvent=event;
                    unique=1;
                }
        },

        eventMouseover : function ( event, jsEvent, view ) {
                hoverTask=1;
                var deleted=document.getElementsByClassName('fc-task-delete-button');
                for (var i = 0; i < deleted.length; i++) {
                    deleted[i].addEventListener('click',  (event) => {
                        deleting=1;
                    },false);
                }
        },
    }


        );
    });
}
