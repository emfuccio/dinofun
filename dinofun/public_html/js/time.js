
var day=1;                                                                      //vale 1 se è selezionato Venerdì, 2 se è selezionato Sabato 3 per la Domenica
var time_window_from="2014/06/06 08:00:00";
var time_window_to="2014/06/06 23:40:00";                                       //la chiusura più tardiva si verifica il sabato alle 23:35
//var tmp;

function friday()
{
    day=1;
    document.getElementById("saturday").className="btn btn-primary byn-md";
    document.getElementById("sunday").className="btn btn-primary byn-md";
    document.getElementById("friday").className="btn btn-primary active byn-md";
    
    time_window_from="2014/06/06 08:00:00";
    time_window_to="2014/06/06 23:40:00";
    
    document.getElementById("time").innerHTML="Time";
    
    //ripulisco i grafici eventualmente già creati
    empty_map_panel();
    empty_bar_panel();
    empty_scatter();
    //console.log(day);
    //tmp=console.toString();
    //console.log(tmp);
    
}

function saturday()
{
    day=2;
    document.getElementById("friday").className="btn btn-primary byn-md";
    document.getElementById("sunday").className="btn btn-primary byn-md";
    document.getElementById("saturday").className="btn btn-primary active byn-md";
    
    time_window_from="2014/06/07 08:00:00";
    time_window_to="2014/06/07 23:40:00";
    
    document.getElementById("time").innerHTML="Time";
    
    //ripulisco i grafici eventualmente già creati
    empty_map_panel();
    empty_bar_panel();
    empty_scatter();
    //console.log(day);
    
}

function sunday()
{
    day=3;
    document.getElementById("friday").className="btn btn-primary byn-md";
    document.getElementById("saturday").className="btn btn-primary byn-md";
    document.getElementById("sunday").className="btn btn-primary active byn-md";
    
    time_window_from="2014/06/08 08:00:00";
    time_window_to="2014/06/08 23:40:00";
    
    document.getElementById("time").innerHTML="Time";
    
    //ripulisco i grafici eventualmente già creati
    empty_map_panel();
    empty_bar_panel();
    empty_scatter();
    //console.log(day);
    
}

//seleziona l'intervallo orario scelto e verifica la correttezza
function get_time()
{
    //console.log ("get time");
    var h_from=parseInt(document.getElementById("hour_from").innerHTML);
    var m_from=parseInt(document.getElementById("min_from").innerHTML);
    var h_to=parseInt(document.getElementById("hour_to").innerHTML);
    var m_to=parseInt(document.getElementById("min_to").innerHTML);
    
 
    //controlla se l'utente ha inserito un intervallo di tempo lecito
    if((h_from>h_to) || (h_from===h_to && m_from>m_to) || (isNaN(h_from)) || (isNaN(m_from)) || (isNaN(h_to)) || (isNaN(m_to)))
        document.getElementById("time").innerHTML="Insert a correct time interval";
    else
    {
        document.getElementById("time").innerHTML = document.getElementById("hour_from").innerHTML+" : "+document.getElementById("min_from").innerHTML+" - "+document.getElementById("hour_to").innerHTML+" : "+document.getElementById("min_to").innerHTML;
        
        if(day===1)//Venerdì
        {
            time_window_from="2014/06/06 "+document.getElementById("hour_from").innerHTML+":"+document.getElementById("min_from").innerHTML+":00";
            time_window_to="2014/06/06 "+document.getElementById("hour_to").innerHTML+":"+document.getElementById("min_to").innerHTML+":00";
            //console.log(time_window_from);
            //console.log(time_window_to);
        }
        if(day===2)//Sabato
        {
            time_window_from="2014/06/07 "+document.getElementById("hour_from").innerHTML+":"+document.getElementById("min_from").innerHTML+":00";
            time_window_to="2014/06/07 "+document.getElementById("hour_to").innerHTML+":"+document.getElementById("min_to").innerHTML+":00";
            //console.log(time_window_from);
            //console.log(time_window_to);
        }
        if(day===3)//Domenica
        {
            time_window_from="2014/06/08 "+document.getElementById("hour_from").innerHTML+":"+document.getElementById("min_from").innerHTML+":00";
            time_window_to="2014/06/08 "+document.getElementById("hour_to").innerHTML+":"+document.getElementById("min_to").innerHTML+":00";
            //console.log(time_window_from);
            //console.log(time_window_to);
        }
        
        //abilito i pulsanti per le visualizzazioni
        document.getElementById("movement").className="btn btn-default";                
        document.getElementById("check-in").className="btn btn-default";
        document.getElementById("validator").className="btn btn-primary";
        
        if (ch_vis==1)         //fa si che si aggiorni la visualizzazione dei check-in senza dover ricliccare sul pulsante
            check();
        
        if (group_vis==1)         //fa si che si aggiorni la visualizzazione dello scatter plot senza dover ricliccare sul pulsante
            group();
        
        if (mov==1)
            movement();
          
    }
}