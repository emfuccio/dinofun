
var mov=0;                      //1 se attiva la visualizzazione delle traiettorie, 0 altrimenti
var ch_vis=0;                   //1 se attiva la visualizzazione dei check-in, 0 altrimenti
var group_vis=0;                //1 se attiva la visualizzazione dei gruppi 0, altrimenti
var flag=0;                     //controlla che non sia già stato creato il secondo svg affianco a quello principale
//var first_run_ch=0;             //se 0 non è mai stato cliccato il pulsante check-in (prima esecuzione della stampa) 1 altrimenti
var bar=0;                      //1 se attiva la visualizzazione del bar chart 0, altrimenti

function check()
{
    //console.log("check");
    
    var table="";
    ch_vis=1;
    type_req=1;
    
    //rendo active il pulsate check-in
    //document.getElementById("all").className="btn btn-default";
    document.getElementById("movement").className="btn btn-default";
    document.getElementById("check-in").className="btn btn-default active";
    
    document.getElementById("bar_chart").className="btn btn-default"; //rendo attivo il pulsante bar chart
    
    //seleziono la tabella su cui effettuare la query
    if(day==1)
        table="ven_mc1_check";
    
    if(day==2)
        table="sab_mc1_check";
    
    if(day==3)
        table="dom_mc1_check";
    
    //invoco la funzione che effettui la richiesta ajax al db
    ajax_req_php("Select x, y, COUNT (*)as n "+
                    "from "+table+" "+
                    "where timestamp>='"+time_window_from+"'"+ "and timestamp<='"+time_window_to+"'"+
                    " group by x,y");
}
function bar_chart()
{
    document.getElementById("bar_chart").className="btn btn-default active";
    bar=1;
    
    show_bar_chart();
    
}

function movement()
{
    var table="";
    mov=1;
    type_req=2;
    var query="";
    
    //rendo active il pulsante movement
    //document.getElementById("all").className="btn btn-default byn-md";
    document.getElementById("check-in").className="btn btn-default byn-md";
    document.getElementById("movement").className="btn btn-default active byn-md";
    
    //seleziono la tabella su cui effettuare la query
    if(day==1)
        table="ven_mc1";
    
    if(day==2)
        table="sab_mc1";
    
    if(day==3)
        table="dom_mc1";
    
    //invoco la funzione che effettui la richiesta ajax al db
    /*ajax_req_php("select * "+
                 "from dom_mc1 "+
                 "where type='movement' "+"and timestamp>='2014-06-08 10:00:00' and timestamp<='2014-06-08 12:00:00' and id=436 "+
                 "order by id,timestamp");*/
    query="select * "+
            "from "+table+" "+
            "where type='movement' and timestamp>='"+time_window_from+"' and timestamp<='"+time_window_to+"' and id in "+
            "( "+
            "select distinct id "+
            "from "+table+" "+
            "limit 1000 "+
            ") "+
            "order by id,timestamp";
    
    //console.log(query);
    
    ajax_req_php(query);

    
    //draw_line();
    
}

function group()
{
    //console.log("group");
    var table_1="";
    var table_2="";
    var table_3="";
    
    group_vis=1;
    //kind_visualizzation=3;
    type_req=3;
    
    //seleziono la tabella su cui effettuare la query
    if(day==1)
    {
        table_1="ven_mc1";
        table_2="ven_map_id_group";
        table_3="ven_group_component";
    }
    
    if(day==2)
    {
        table_1="sab_mc1";
        table_2="sab_map_id_group";
        table_3="sab_group_component";
    }
    
    if(day==3)
    {
        table_1="dom_mc1";
        table_2="dom_map_id_group";
        table_3="dom_group_component";
    }
    
    //scrivo la query da effettuare
    query="with v as "+
          "( "+
                "select "+table_1+".id, avg(x) as avg_x, avg(y) as avg_y "+
                "from "+table_1+", "+table_2+" "+
                "where timestamp >='"+time_window_from+"' and timestamp <='"+time_window_to+"' and group_name!='0' and type='movement' and "+table_1+".id="+table_2+".id "+
                "group by "+table_1+".id "+
            ") "+
            "select v.id, avg_x, avg_y, group_name "+
            "from v,"+table_2+" "+
            "where v.id="+table_2+".id and group_name in "+
            "( "+
                "select group_name "+
                "from "+table_3+" "+
                "where n_component>="+n_component_from+" and n_component<="+n_component_to+
            ") "+
            "order by group_name";
    
    //console.log(query);
    ajax_req_php(query);                                      //invoco la funzione che effettui la richiesta ajax al db
    //prova()

}