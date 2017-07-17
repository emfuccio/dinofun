<?php

    $param="host=localhost port=5432 dbname=Visual user=postgres password=sz61mn";
    $connect= pg_connect($param);                                                   //si connette a postgresSQL con i parametri passatigli
    
    /*$query = "Select x, y, COUNT (*)as n "
            .'from public."Ven_mc1" '
            ."where type='check-in' and timestamp>='2014-06-06 08:00:00' and timestamp<='2014-06-06 09:00:00' "
            ."group by x,y";*/
    
    $req=$_REQUEST["q"];                                                       //recupera la query da eseguire passatagli come richiesta GET
    
    $type=substr($_REQUEST["q"],strlen($_REQUEST["q"])-1,strlen($_REQUEST["q"]));       //cattura il numero posizionato in fondo alla richiesta get che rappresenta la provenienza della query
    $query=substr($req,0,strlen($req)-1);                                               //cattura la query vera e propria
    

    $result = pg_query($query);                                                     //effettua la query

    $data= array ();
    
    if($type==1)                                               //la richiesta proviene dall'aver cliccato sui check-in
    {
        while($row=pg_fetch_array($result,null,PGSQL_ASSOC))
        {
            $data[]=array(
                'x' => $row["x"],
                'y' => $row["y"],
                'n' => $row["n"]
            );
        }
    $file_name='rides.json';    
    }
        
    if($type==2)                                               //la richiesta proviene dall'aver cliccato su movement
    {
        while($row=pg_fetch_array($result,null,PGSQL_ASSOC))
        {
            $data[]=array(
                'timestamp'=> $row["timestamp"],
                'id'=> $row["id"],
                'type'=> $row["type"],
                'x' => $row["x"],
                'y' => $row["y"]
            );
        }
        $file_name='mov.json';
    }
        
    if($type==3)                                            //la richiesta proviene dall'aver cliccato su groups
    {
        while($row=pg_fetch_array($result,null,PGSQL_ASSOC))
        {
            $data[]=array(
                'id'=> $row["id"],
                'avg_x' => $row["avg_x"],
                'avg_y' => $row["avg_y"],
                'group_name' => $row["group_name"]
            );
        }
        $file_name='group.json';
    }
    
    
    pg_close($connect);                                           //chiude la connessione a postgres stabilita  
    $out=json_encode($data);                                      //codifica in json il risultato ottenuto 
    file_put_contents($file_name,$out);                          //scrive nel file data.json, se non esiste lo crea se no lo sovrascrive                                                     

?>