type_req=0;    //identifica il tipo di richiesta da passare insieme alla query da far eseguire a php

function ajax_req_php (str)        //effettua una richiesta asincrona in ajax
{
    //console.log("ajax"+type_req);
    var xhttp;
    //console.log(str);
    if(window.XMLHttpRequest)
    {
        xhttp = new XMLHttpRequest();
    }
    else
    {
        xhttp = new ActiveXObject("Microsoft.XMLHTTP");         //solo per le versioni 5 e 6 di internet explorer
    }
            
    //var query=JSON.stringify(str);

    xhttp.onreadystatechange = function() {
        //console.log("php "+this.readyState+" "+this.status);
    if (this.readyState == 4 && this.status == 200)         //controllo che il resposo sia arrivato correttamente
    {
        if(type_req==1)
            print_check();
        
        if(type_req==2)
            draw_lines();
        
        if(type_req==3)
            show_groups();
        
        if(bar==1 && type_req==1)
            show_bar_chart();
    }
};
//console.log(str+type_req);
xhttp.open("GET", "php/pgs_connector.php?q="+str+type_req, true);    //invio la richiesta con il metodo get appendendo all'URL la stringa contenente la query da eseguire
xhttp.send();
//xmlhttp.send("x="+query);
}