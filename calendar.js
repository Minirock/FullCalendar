 window.onload=function(){
    var mobile_device=0;
    var editing_mobile=1;
    var deleting=0;
    var duplicating_mobile=0;
    var edition_mode="Mode édition";
    var delete_mode="Mode suppression";
    var duplicate_mode="Mode duplication";
    var event_save;
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

    //pas de controle sur le mousehover des éléments n'étant pas des Tâches on se servira donc de la variable pour détecter le cas
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
                    //Copie d'une Tâche existante
                    copie=1;
            }
        }
    }

}, false);

    var form_infos = document.getElementById('form_infos');

    form_infos.addEventListener('submit', function(e) {
        var title_input = document.getElementById('title_input');
        var result=(title_input.value!='');
        var description_input= document.getElementById('eventInfos').value;
        if (result) {
            event_save.title=title_input.value;
            event_save.description=description_input;
            $("#eventContent").dialog('close');
            var id_event=event_save['_id'];
            if(id_event!=undefined){
                console.log("delete");
                $('#calendar').fullCalendar('removeEvents', id_event);
            }
            $('#calendar').fullCalendar('updateEvent', event_save);
            $('#calendar').fullCalendar('renderEvent', event_save, true);
            $('#calendar').fullCalendar('unselect');
            $("#alerte").attr({class: "alert alert-success"});
            $("#alerte").html("Modifications enregistrées");
        }else{
            $("#alerte").attr({class: "alert alert-danger"});
            $("#alerte").html("Le titre doit être renseigné !");
        }

        e.preventDefault();

    });

    form_infos.addEventListener('reset', function(e) {
        var id_event=event_save['_id'];
        $("#eventContent").dialog('close');
        $('#calendar').fullCalendar('removeEvents', id_event);
        $("#alerte").attr({class: "alert alert-success"});
        $("#alerte").html("Tâche supprimée");
        e.preventDefault();
    });

    var copy = document.getElementById('copier');
    copy.addEventListener('click', function(e) {
        copie=1;
        $("#eventContent").dialog('close');
        $("#alerte").attr({class: "alert alert-success"});
        $("#alerte").html("Tâche copiée");
        e.preventDefault();
    });



var form_infos_create = document.getElementById('form_infos_create');

form_infos_create.addEventListener('submit', function(e) {
    var title_input = document.getElementById('title_input_create');
    var result=(title_input.value!='');
    var description_input= document.getElementById('eventInfos_create').value;
    if (result) {
        event_save.title=title_input.value;
        event_save.description=description_input;
        $("#eventContent_create").dialog('close');
        var id_event=event_save['_id'];
        if(id_event!=undefined){
            console.log("delete");
            $('#calendar').fullCalendar('removeEvents', id_event);
        }
        $('#calendar').fullCalendar('updateEvent', event_save);
        $('#calendar').fullCalendar('renderEvent', event_save, true);
        $('#calendar').fullCalendar('unselect');
        $("#alerte").attr({class: "alert alert-success"});
        $("#alerte").html("Modifications enregistrées");
    }else{
        $("#alerte").attr({class: "alert alert-danger"});
        $("#alerte").html("Le titre doit être renseigné !");
    }

    e.preventDefault();

});

 $(document).ready(function() {
        $( "#eventContent" ).dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        $( "#eventContent_create" ).dialog({
            autoOpen: false,
            width: 350,
            modal: true
        });
        var adding=0;
        var unique=0;
        hoverTask=0;
        copie=0;

        var today=new Date();
        var t_jour=today.getDate();
        if(t_jour<10){
            t_jour="0"+t_jour;
        }
        var t_mois=today.getMonth()+1;
        if(t_mois<10){
            t_mois="0"+t_mois;
        }
        var t_annee=today.getFullYear();

        var today_formated=t_annee+"-"+t_mois+"-"+t_jour;

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
          defaultDate: today_formated,
          navLinks: true, // can click day/week names to navigate views
          selectable: true,
          selectHelper: true,

        //nouvelle date
        eventClick: function(event, element) {
            event_save=event;
        },

            eventRender: function (event, element) {
                //console.log(element);
                if(event_save!=undefined){
                    event=event_save;
                }
                element.attr('href', 'javascript:void(0);');

                element.click(function() {
                    console.log("ouvre modal render");
                    $("#title_input").attr({value :event.title});
                    $("#title").html(event.title);
                    $("#startTime").html(moment(event.start).format('MMM Do h:mm A'));
                    $("#endTime").html(moment(event.end).format('MMM Do h:mm A'));
                    $("#eventInfos").html(event.description);
                    $("#eventContent").dialog('open');
                });

            },


          select: function(start, end,jsEvent) {
                if(copie!=1){
                    var eventData = {
                        title: "",
                        start: start,
                        end: end,
                        description: ""
                      };
                    $("#startTime_create").html(moment(start).format('MMM Do h:mm A'));
                    $("#endTime_create").html(moment(end).format('MMM Do h:mm A'));
                    //$("#title_input").removeAttr("value");
                    $("#title_input_create").attr({value: " "});
                    $("#eventInfos_create").html(" ");
                    event_save=eventData;
                    console.log("create");
                    $("#eventContent_create").dialog('open');
                }else{
                    //on copie savedEvent au nouvelle date
                        event_save['start']=start;
                        event_save['end']=end;
                        //on doit également changer l'id de l'event pour la suppression
                        event_save['_id']='_fc'+makeid();
                        $('#calendar').fullCalendar('renderEvent', event_save, true);
                        $('#calendar').fullCalendar('unselect');
                        unique=0
                        copie=0;
                }

                },
                editable: true,
                eventLimit: true, // allow 'more' link when too many events
                events: getEvents(),


        eventMouseout : function( event, jsEvent, view ) {
                hoverTask=0;
                //unique sert à ne pas récupérer les events survolé après la copie
                if(copie==1 && unique == 0){
                    event_save=event;
                    unique=1;
                }
        },

        eventMouseover : function ( event, jsEvent, view ) {
                hoverTask=1;
        },
    }


        );
    });
}
