 function draw_lines()
 {
    empty_map_panel();                                              //ripulisco il draw panel nel caso in cui ci avessi già inserito qualcosa
     
    var line_data=new Array(new Object());
    
    d3.json("php/mov.json", function(error, data)                  //leggo il file json su cui sono inseriti i dati
    {

        data.forEach(function(d) 
        {
            d.timestamp= +d.timestamp;
            d.id=  +d.id;
            d.type= +d.type;
            d.x = +d.x;
            d.y = +d.y;
        });
        
        var line_data=new Array(new Object());          //conterrà il blocco di dati riferito ad un solo id
        var i=0;
        var down=0;                                     //punta alla posizione dell'array in cui inizia il blocco dati riferito ad un id 
        
        while(i<data.length)
        {
            if(i!=0)
                if(data[i].id != data[i-1].id)           //sono al termine del blocco riferito agli spostamenti di un id
                {
                    line_data=data.slice(down,i);       //ritaglio il blocco di punti riferiti allo stesso id e li mando in stampa
                    down=i;                             //la posizione i adesso è la base del nuovo blocco
                    i++;
                    draw_single_trajectory(line_data);                   //stampo le traiettorie del blocco appena concluso
                    line_data=new Array(new Object());          //ripulisco l'array
                }
                else
                    i++;
            else
                i++;
        }
    
        
        /*var lineFunction = d3.svg.line()
            .x(function(d) { return 25+x(d.x); })
            .y(function(d) { return y(d.y); })
            .interpolate("linear");

        d3.select("#draw_layer")
            .append("path")
            .attr("d", lineFunction(data))
            .attr("stroke", "steelblue")
            .attr("stroke-width", 2)
            .attr("fill", "none");*/
    });

 }
 
function draw_single_trajectory(data_line)
{
     
    //console.log(data_line[0].id); 
    
    var lineFunction = d3.svg.line()
        .x(function(d) { return 25+x(d.x); })
        .y(function(d) { return y(d.y); })
        .interpolate("cardinal");

    d3.select("#draw_layer")
        .append("path")
        .attr("d", lineFunction(data_line))
        .attr("stroke", "steelblue")
        .attr("stroke-width", 2)
        .attr("fill", "none");
     
}