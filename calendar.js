 window.onload=function(){
    var hoverTask;
    var copie;
    var savedEvent;
    var deleting;
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

    function getMonth(index){
        switch(index){
            case 0:
                return "01";
                break;
            case 1:
                return "02";
                break;
            case 2:
                return "03";
                break;
            case 3:
                return "04";
                break;
            case 4:
                return "05";
                break;
            case 5:
                return "06";
                break;
            case 6:
                return "07";
                break;
            case 7:
                return "08";
                break;
            case 8:
                return "09";
                break;
            case 9:
                return "10";
                break;
            case 10:
                return "11";
                break;
            case 11:
                return "12";
                break;
            default:
                    return -1;
        }
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
        deleting=0;
        $('#calendar').fullCalendar({
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
                if(copie!=1){
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
                    if(copie==1){
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
                var title_modified = prompt('Event Title:');
                var desc_modified = prompt('Event Description:');
                var eventData;
                if (title_modified) {
                    event.title=title_modified;
                    event.description=desc_modified;
                    $('#calendar').fullCalendar('updateEvent', event); // stick? = true
                }
            }else{
                //suppression de l'event
                var id_event=event['_id'];
                $('#calendar').fullCalendar('removeEvents', id_event);
                deleting=0;
            }
        },

            //cette fonction ne se déclenchera grace à adding que sur des non taches
       /* dayClick: function(date, jsEvent, view) {


                }
        },*/

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
                var deleted=document.getElementsByClassName('fc-task-delete');
                for (var i = 0; i < deleted.length; i++) {
                    deleted[i].addEventListener('click',  (event) => {
                        deleting=1;
                    },false);
                }

        },

        eventDragStart: function( event, jsEvent, ui, view ) {
                //console.log(jsEvent);
        },

        eventDragStop: function( event, jsEvent, ui, view ) {
                //console.log(jsEvent);
        }
    }


        );
    });
}
