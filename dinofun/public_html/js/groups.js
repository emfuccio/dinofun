var n_component_from;
var n_component_to;

function show_groups ()
{
    //console.log("show_groups");
    
    empty_scatter();                                            // ripulisco lo scatter plot ne caso in cui sia stato aggiornato
       
    var margin = {top: 5, right: 5, bottom: 5, left: 5},
    width = 1000 - margin.left - margin.right,
    height = 700 - margin.top - margin.bottom;

    var zoom = d3.behavior.zoom()                               //varaibile per lo zoom
        .scaleExtent([1, 10])
        .on("zoom", zoomed);

    var drag = d3.behavior.drag()                               //variabile per il drag
        .origin(function(d) { return d; })
        .on("dragstart", dragstarted)
        .on("drag", dragged)
        .on("dragend", dragended);

    var x=d3.scale.linear()                                     //definisce una scala lineare per l'asse x
        .domain([0,99])                                         //con dominio dei dati da 0 a 99
        .range([0,700]);                                        //con lo spazio in pixel disponibile tra 0 e 700

    var y=d3.scale.linear()                                     //definisce una scala lineare per l'asse y
        .domain([0,99])                                         //con un dominio dei dati da 0 a 99
        .range([695,0]);

    //var color = d3.scale.category20c();

    var svg = d3.select("#scatter_area")                        //creo l'svg che conterrà lo scatter plot
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform","translate(25,25)")
        .attr("id","scatter_svg")
        .append("g")
        .attr("id","1")
        .attr("transform", "translate(" + margin.left + "," + margin.right + ")")
        .call(zoom);

    var rect = svg.append("g")
        .attr("width", width)
        .attr("height", height)   
        .style("fill", "none")
        .style("pointer-events", "all");

    var container = svg.append("g")
        .attr("id","zoomer");


    container.append("g")                                   //aggiungo il pannello con l'immagine della mappa
        .attr("id","map_layer")
        .attr("width",700)
        .attr("height",695)
        .append("image")
        .attr("xlink:href","img/Park Map b-n.jpg")
        //.attr("x","25")
        //.attr("y","0")
        .attr("width",700)
        .attr("height",695);
      
    
    d3.json("php/group.json", function(error, data)                  //leggo il file json su cui sono inseriti i dati
        {

        data.forEach(function(d) {
            d.id    = d.id;
            d.avg_x = d.avg_x;
            d.avg_y = d.avg_y;
            d.group_name=  d.group_name;
        });
        
        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr("id","tip")
            .html(function (d){ return "<strong>ID number:</strong> <span style='color:steelblue'>" + d.id + "</span>"+"<br>"+
                                    "<strong>Group name:</strong> <span style='color:steelblue'>" + d.group_name + "</span>"})
        svg.call(tip);
        
        //console.log(data);
        
        //console.log(min_name+" - "+max_name);
        
        d3.select("#scatter_svg").select("#zoomer")
            .selectAll("g")                                
            .data(data)                                         
            .enter()                                            
            .append("g")                                   
            .attr("class", "dot")
            .attr("id","4")
            .append("circle")
            .attr("r", 4)
            .attr("cx", function(d){return  x(d.avg_x)})
            .attr("cy", function (d){return y(d.avg_y)})
            .attr("fill","steelblue")//function (d){return color(d.group_name)})
            .on("mouseover",tip.show)
            .on('mouseout', tip.hide)
            .call(drag);
        });

    function zoomed() 
    {
        container.attr("transform", "translate(" + d3.event.translate + ")scale(" + d3.event.scale + ")");
    }

    function dragstarted(d) 
    {
        d3.event.sourceEvent.stopPropagation();
        d3.select(this).classed("dragging", true);
    }

    function dragged(d) 
    {
        d3.select(this).attr("cx", d.x = d3.event.x).attr("cy", d.y = d3.event.y);
    }

    function dragended(d)
    {
        d3.select(this).classed("dragging", false);
    }
}

function get_components()
{
    n_component_from=document.form_component.n_comp_from.value;
    n_component_to=document.form_component.n_comp_to.value;
    
    if(n_component_from > n_component_to)
    {
        //document.getElementById("groups").className="btn btn-default disabled";
        document.form_component.n_comp_from.focus();
        document.form_component.n_comp_from.focus();
        alert('"Number of components from" must be smaller or egual to "Number of components to"');
    }
    
    else if(n_component_from=="" || n_component_to=="")
    {
        //document.getElementById("groups").className="btn btn-default disabled";
        document.form_component.n_comp_from.focus();
        document.form_component.n_comp_from.focus();
        alert('"Number of components from" and "Number of components to"'+" mustn't"+' be null');
    }
    else
       document.getElementById("groups").className="btn btn-default"; 
    
    //console.log(n_component_to+" - "+n_component_from);
    
}

function empty_scatter()
{
    d3.select("#scatter_svg")
        .remove();
}