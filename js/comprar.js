var nuevoId;
var db=openDatabase("itemDB","1.0","itemDB",655535)
function limpiar() {
    document.getElementById("cantidad").value="";
    
}

    $("#crear").click(function(){
        db.transaction(function(transaction){
                var sql="CREATE TABLE productos2"+
                "(id INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,"+
                "producto varchar(100) NOT NULL,"+
                "cantidad int(10) NOT NULL,"+
                "precio decimal(5,2) NOT NULL,"+
                "total decimal(5,2) NOT NULL)";
                transaction.executeSql(sql,undefined,function(){
                    alert("tabla creada");
                
                },function(transaction,err){
                    alert(err.message);

                })
        });
    });
    $("#listar").click(function(){
         cargarDatos();
    })

    function cargarDatos(){
        $("#listaProductos").children().remove();
        db.transaction(function(transaction){
            var sql="SELECT *FROM productos2 ORDER BY id ASC";
            transaction.executeSql(sql,undefined,function(transaction,result){
                if(result.rows.length){
                    $("#listaProductos").append('<tr style="border-radius: 100%;" style= "background: #009dd1; "><th>Compra Nº</th><th>Producto</th><th>Cantidad</th><th>Precio</th><th>Total</th>');
                    for(var i=0;i<result.rows.length;i++){
                        var row=result.rows.item(i);
                        var id=row.id;
                        var producto=row.producto;
                        var cantidad=row.cantidad;
                        var precio=row.precio;
                        var total=row.total;
                        $("#listaProductos").append('<tr style= "background: #f6f3ff;  id="fila'+id+'"class="Reg_A'+id+'"><td><span class="mid">000'+
                        id+'</span></td><td><span>'+producto+'</span></td><td><span>'+cantidad+'</span></td><td><span>'+precio+'</span></td> <td><span>'+total+'</span></td> ');

                    }
                }else{
                    $("#listaProductos").append('<tr><td colspan="5" align="center">No existen Compras de productos</td></tr>');

                }
            },function(transaction,err){
                alert(err.message);

            }   )
        })
    }
    $("#insertar").click(function(){
        var nombre="Pantalón";
        var cantidad=$("#cantidad").val();
        var precio=25;
        var total=precio*cantidad;
        if(cantidad.length!=0&&cantidad>0){
        db.transaction(function(transaction){
            var sql="INSERT INTO productos2(producto,cantidad,precio,total)VALUES(?,?,?,?)"
            transaction.executeSql(sql,[nombre,cantidad,precio,total],function(){

            })
        },function(transaction,err){
                alert(err.message);

            } )
            limpiar();
            cargarDatos();
        }else{
            alert("Ingrese una cantidad");
            limpiar();
        }
    })


document.addEventListener('DOMContentLoaded', cargarDatos,false);