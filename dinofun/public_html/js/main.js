//creo l'svg dentro v_area
var svg = d3.select("#v_area")
    .append("svg")           
    .attr("width",525)
    .attr("height",525)
    .attr("id","main_svg")
    .attr("class","col-sm");
    
var x=d3.scale.linear()                                     //definisce una scala lineare per l'asse x
    .domain([0,99])                                         //con dominio dei dati da 0 a 99
    .range([0,500]);                                        //con lo spazio in pixel disponibile tra 0 e 575

var y=d3.scale.linear()                                     //definisce una scala lineare per l'asse y
    .domain([0,99])                                         //con un dominio dei dati da 0 a 99
    .range([500,0]);
    
draw_map(svg);

    
function draw_map(svg)
{
    
//creo il pannello che conterrà l'immagine della mappa
var map_layer=svg.append("g")
    .attr("id","map_layer");
    
//creo le varibiali di scala per gli assi cartesiani attorno alla mappa
/*var x=d3.scale.linear()                                     //definisce una scala lineare per l'asse x
    .domain([0,99])                                         //con dominio dei dati da 0 a 99
    .range([0,500]);                                        //con lo spazio in pixel disponibile tra 0 e 575

var y=d3.scale.linear()                                     //definisce una scala lineare per l'asse y
    .domain([0,99])                                         //con un dominio dei dati da 0 a 99
    .range([500,0]);*/                                        //con lo spazio in pixel disponibile tra 0 e 575 (al contrario perchè l'asse y ha orientamento opposto)

//creo gli assi veri e propri
var xAxis = d3.svg.axis()
    .scale(x)
    .orient("bottom")                                          //mi inserisce la leggenda sotto l'asse
    .ticks(4);

var yAxis = d3.svg.axis()
    .scale(y)        
    .orient("left")                                        //mi inserisce la leggenda a destra dell'asse
    .ticks(4);    
    
//creo il livello all'interno del quale disegnerò gli assi
var axis_panel=svg.append("g")
    .attr("id","axis_map_container");
    
//disegno gli assi
var axis_x=axis_panel.append("g")                                        //crea un elemento <g>
    .attr("class", "x axis")                            //aggiunge gli attributi class di css
    .attr("transform", "translate(25,500)")     
    .call(xAxis);                                        //rendering
 
//d3.select("#axis")
var axis_y=axis_panel.append("g")           
    .attr("class", "y axis")
    .attr("transform", "translate(25,0)")
    .call(yAxis);
    
    
//xAxis.tickSize(0);
//yAxis.tickSize(0);

//inserisco l'immagine    
map_layer.append("image")                               //inserisco l'immagine della mappa per tenerla di sfondo
    .attr("xlink:href","img/Park Map b-n.jpg")
    .attr("x","25")
    .attr("y","0")
    .attr("height",500)
    .attr("width",500);
    
//creo il livello sul quale disegnare quello che voglio (traiettorie, cerchi, ecc.)
svg.append("g")
    .attr("id","draw_layer")
    .attr("width","500px")
    .attr("height","500px");
    //.attr("transform", "translate(0,-25)");
    
}
    
    
function empty_map_panel()                              //ripulisce il pannello su cui disegno
{
    d3.select("#main_svg").select("#draw_layer")
        .remove();
    
    d3.select("#main_svg")
        .append("g")
        .attr("id","draw_layer")
        .attr("width",500)
        .attr("height",500);
}