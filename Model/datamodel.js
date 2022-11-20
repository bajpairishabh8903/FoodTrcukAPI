const connectdb=require('../utils/connectdb')

function create_json(querydata){
    var r=[]
    for (var i=0;i<querydata.length;i++){
        var data={}
        for(var k in querydata[i]){
            data[k]=querydata[i][k]
        }
        r.push(data)
    }
    return(r)
}

function generate_get_sql_query(table,type,column,value){
    var sql = `SELECT * FROM public."${table}" WHERE `
    if(type == 'exact'){
        sql += `"${column}" = '${value}'`
    }
    if(type == 'contains'){
        sql += `"${column}" Like '%' || '${value}' || '%'`
    }
    if(type == 'less_or_equal_to'){
        sql += `"${column}" <= '${value}'`
    }
    if(type == 'greater_or_equal_to'){
        
    }
    return sql
}

function generate_insert_sql_query(table,data){
    var cols = Object.keys(data)
    var col_str = '', val_str = ''
    cols.forEach((col,i)=>{
        col_str += `"${col}"`
        val_str += `'${data[col]}'`
        if(i!=cols.length-1){
            col_str += ','
            val_str += ','
        }
    })
    var sql =  `INSERT INTO public."${table}" (${col_str}) Values (${val_str})`
    return sql
}

async function execute_query(sql){
    console.log(sql)
    const connection =await connectdb.conn();
    const client=await connection.connect();
    try
    {
        const result= await client.query(sql)
        var pro=new Promise(resolve=>{resolve(create_json(result.rows))})
        return(pro)
    }
    catch(err){
        console.log(err);
        var pro=new Promise(resolve=>{resolve('Error in query execution')})
        return(pro)
    }finally{
        await client.end()
    }
}

function get_distance(x1,y1,x2,y2){
    var a = x1 - x2;
    var b = y1 - y2;
    var c = Math.sqrt( a*a + b*b );
    return c
}

function findClosestTruckIndex(data,long,lat){
    var closestTruckIndex = -1
    var temp = 2000
    var x1 = long;
    var y1 = lat;
    for (let i = 0; i < data.length; i++) {
        if(get_distance(x1,y1,data[i].Longitude,data[i].Latitude) < temp){
            temp = get_distance(x1,y1,data[i].Longitude,data[i].Latitude)
            closestTruckIndex = i
        }
    }
    return closestTruckIndex
}

exports.findApplicant = function(applicant_name){
    return execute_query(generate_get_sql_query('FoodTruckDetials','exact','Applicant',applicant_name))
}

exports.findExpiredPermits = function(date){
    return execute_query(generate_get_sql_query('FoodTruckDetials','less_or_equal_to','ExpirationDate',date))
}

exports.findByStreet = function(address){
    return execute_query(generate_get_sql_query('FoodTruckDetials','contains','Address',address))
}

exports.addNewEntry = async function(data){
    return execute_query(generate_insert_sql_query('FoodTruckDetials',data))
}

exports.getClosestTruck = async function(long,lat){
    var closestTruck = {}
    await execute_query(generate_get_sql_query('FoodTruckDetials','exact','FacilityType','Truck')).then(data=>{
        closestTruck = data[findClosestTruckIndex(data,long,lat)]
    })    
    return new Promise(resolve=>{resolve(closestTruck)})
}

