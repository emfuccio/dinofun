function print_check ()
{
    //console.log("print_check");
    empty_map_panel();                                                //ripulisco il pannello nel caso in cui avessi già inserito qualcosa
    
    d3.json("php/rides.json", function(error, data)                  //leggo il file json su cui sono inseriti i dati
    {

        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.n=  +d.n;
        });
        
        //console.log(data);
        
        min=d3.min(data, function(d) { return d.n; });              //determino il minimo del numero di check-in
        max=d3.max(data, function(d) { return d.n; });              //determino il massimo del numero di check-in
        
        //console.log(min+" - "+max);
        
        var radius = d3.scale.sqrt()                                //determino una scala per le dimensioni dei cerchi
            .domain([min,max])
            .range([0,20]);
    
        var tip = d3.tip()                                          //creo l'elemento tip
                .attr('class', 'd3-tip')
                .attr("id","tip")
                .html(function (d){ return "<strong>Number of check-in:</strong> <span style='color:steelblue'>" + d.n + "</span>"+"<br>"+
                                            "<strong>Coordinates of check-in:</strong> <span style='color:steelblue'>" + d.x +" - "+d.y+ "</span>";});
            svg.call(tip);
    
        d3.select("#draw_layer")                                    //seleziono il draw panel e ci appendo sopra i cerchi
            .selectAll("circle")                                
            .data(data)                                         
            .enter()                                            
            .append("circle")                                   
            .attr("cx", function(d){return 25+x(d.x)})          
            .attr("cy", function (d){return y(d.y)})            
            .attr("r", function (d){return radius(d.n)})
            .attr("fill","#982B4F")
            .attr("id","check-in")
            .on("mouseover",tip.show)                                  
            .on('mouseout', tip.hide);
                                               
    });      
}

function empty_bar_panel()                                          //ripulisce il grafico a barre
{
    d3.select("#bar_chart_svg")
        .remove();
}


function show_bar_chart()
{
    //console.log("bar");
    empty_bar_panel();
    
    // set the dimensions of the canvas
    var margin = {top: 0, right: 0, bottom: 45, left: 45},
        width = 580 - margin.left - margin.right,
        height = 560 - margin.top - margin.bottom;

    var color="steelblue";


    // set the ranges
    var x = d3.scale.ordinal().rangeRoundBands([0, width], .05);

    var y = d3.scale.linear().range([height, 0]);

    // define the axis
    var xAxis = d3.svg.axis()
        .scale(x)
        .orient("bottom")


    var yAxis = d3.svg.axis()
        .scale(y)
        .orient("left")
        .ticks(10);

    
        // add the SVG element
    var svg = d3.select("#v_area")
        .append("svg")
        .attr("width", width + margin.left + margin.right)
        .attr("height", height + margin.top + margin.bottom)
        .attr("transform","translate(40,20)")
        .attr("class","col-sm")
        .attr("id","bar_chart_svg")
        .append("g")
        .attr("id","bar_chart_panel")
        .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
  

     // load the data
    d3.json("php/rides.json", function(error, data) 
    {

        data.forEach(function(d) {
            d.x = +d.x;
            d.y = +d.y;
            d.n=  +d.n;
        });
        
        // scale the range of the data
        x.domain(data.map(function(d) { return d.x.toString()+d.y.toString() }));
        y.domain([0, d3.max(data, function(d) { return d.n; })]);
        
        var min=d3.min(data, function(d) { return d.n; });
        var max=d3.max(data, function(d) { return d.n; });

        //console.log(min+" - "+max);
        
        var color_scale = d3.scale.linear()
            .domain([min, max])
            .range([d3.rgb(color).brighter(), d3.rgb(color).darker()]);

        // add axis
        svg.append("g")
            .attr("class", "x axis")
            .attr("transform", "translate(0," + height + ")")
            .call(xAxis)
            .selectAll("text")
            .style("text-anchor", "end")
            .attr("dx", "-.8em")
            .attr("dy", "-.55em")
            .attr("transform", "rotate(-90)" );

        svg.append("g")
            .attr("class", "y axis")
            .call(yAxis)
            .append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 5)
            .attr("dy", ".71em")
            .style("text-anchor", "end")
            .text("Number of check-ins");

        var tip = d3.tip()
            .attr('class', 'd3-tip')
            .attr("id","tip")
            .html(function (d){ return "<strong>Number of check-in:</strong> <span style='color:steelblue'>" + d.n + "</span>"+"<br>"+
                                    "<strong>Coordinates of check-in:</strong> <span style='color:steelblue'>" + d.x +" - "+d.y+ "</span>"});
        svg.call(tip);
        
        // Add bar chart
        svg.selectAll("bar")
            .data(data)
            .enter().append("rect")
            .attr("class", "bar")
            .attr("x", function(d) { return x(d.x.toString()+d.y.toString()); })
            .attr("width", x.rangeBand())
            .attr("y", function(d) { return y(d.n); })
            .attr("height", function(d) { return height - y(d.n); })
            .attr("fill", function(d) { return color_scale (d.n); })
            .on("mouseover",tip.show)                                  
            .on('mouseout', tip.hide);
            
    });
}