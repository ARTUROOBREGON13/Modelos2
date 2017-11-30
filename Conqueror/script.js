var pregunta, respuesta, opciones;
var continentes=['Asia','Africa','Antartida','Europa','Norteamerica','Oceania','Suramerica'];
var banderas=[false,false,false,false,false,false,false];
var vidas;
//posiciones donde deben colocarse las banderas
var posCont=[[650,100],[450,180],[450,460],[460,70],[180,100],[750,310],[280,260]];
var continente;
var canvas;
var aux;
var flagD;

$(document).ready(inicio);

function inicio(){
	//Asignacion de funciones onClick al boton Historia, el boton de Nuevo Juego
	//y el icono de cerrado de la pantalla emergente
	$('#Historia').click(function(){
			$('#popup').fadeIn('slow');
			$('.popup-overlay').fadeIn('slow');
			$('.popup-overlay').height($(window).height());
			return false;
		}
	 );
	 
    $('#close').click(function(){
        $('#popup').fadeOut('slow');
        $('.popup-overlay').fadeOut('slow');
        return false;
    });
	
	$('#NJuego').click(function(){
		$('#contenido').css("display","inline");
		//inicio de la rutina
		run();
	});
}

function run(){
	vidas = 3;					//el jugador tiene 3 vidas
	banderas=[false,false,false,false,false,false,false];	//el jugador no ha conquistado ningun continente al inicio del juego
	$('#vidas').css("display","inline");
	reset();
	continente = 0;
	respuesta = 0;
	canvas = document.getElementById("lienzo");
	flagD = document.getElementById("flag");
	//asignacion de funciones a los botones laterales
	$('#opc1').click(function(){
		revisar(0);
	});
	$('#opc2').click(function(){
		revisar(1);
	});
	$('#opc3').click(function(){
		revisar(2);
	});
	$('#opc4').click(function(){
		revisar(3);
	});
	$('#opc5').click(function(){
		revisar(4);
	});
	$('#opc6').click(function(){
		revisar(5);
	});
	$('#opc7').click(function(){
		revisar(6);
	});
}

function asignar(){
	//seleccion aleatoria de la pregunta de la tabla oculta, con sus opciones y respuesta respectiva
	var n = Math.floor((Math.random() * 100) + 1);
	//alert(document.getElementById("preguntas").rows.length);
	
	var linea = document.getElementById("preguntas").rows;
	pregunta = linea[n].cells[0].innerHTML;
	
	//asignacion de las opciones y la respuesta
	opciones = [];
	opciones[0] = linea[n].cells[1].innerHTML;
	opciones[1] = linea[n].cells[2].innerHTML;
	opciones[2] = linea[n].cells[3].innerHTML;
	opciones[3] = linea[n].cells[4].innerHTML;
	respuesta = linea[n].cells[5].innerHTML;
	
	//asignacion al div y a los 4 botones utilizables
	document.getElementById("pregunta").innerHTML = pregunta;

	document.getElementById("opc1").innerHTML = opciones[0];
	$('#opc1').css("display","inline");
	
	document.getElementById("opc2").innerHTML = opciones[1];
	$('#opc2').css("display","inline");
	
	document.getElementById("opc3").innerHTML = opciones[2];
	$('#opc3').css("display","inline");
	
	document.getElementById("opc4").innerHTML = opciones[3];
	$('#opc4').css("display","inline");
	
	//se ocultan los otros 3 botones
	$('#opc5').css("display","none");
	$('#opc6').css("display","none");
	$('#opc7').css("display","none");
}

//funcion que verifica la respuesta y lleva el manejo de la disminucion de vidas del usuario
function revisar(x){
	if(document.getElementById("pregunta").innerHTML=="¿Cual sera el siguiente continente a conquistar?")
	{
		continente = x;
		asignar();
	}
	else{
		if(respuesta == x+1){
			//banderas para reconocer si el usuario ya conquisto algun continente.
			banderas[continente] = true;
			//coloca una bandera en el continente
			aux = canvas.getContext("2d");
			//dibuja la bandera en (dibujo, x,y, ancho, alto)
			aux.drawImage(flagD,posCont[continente][0],posCont[continente][1],40,40);
		}else{
			vidas--;
		}	
		reset();
	}
}

function reset(){
	var i=0;
	document.getElementById("vidas").innerHTML="Vidas "+vidas;
	//revision de que el jugador no haya perdido
	if(vidas == 0){
		alert("Has perdido!");
		$('#contenido').css("display","none");
		//recarga la pagina para evitar errores logicos
		location.reload(true);
	}else{
		//asignacion de valores iniciales.
		document.getElementById("pregunta").innerHTML="¿Cual sera el siguiente continente a conquistar?";

		document.getElementById("opc1").innerHTML = continentes[0];
		//si ya se conquisto el respectivo continente, no es necesario mostrar el boton de nuevo
		if(banderas[0])
			$('#opc1').css("display","none");
		else
			$('#opc1').css("display","inline");
		
		document.getElementById("opc2").innerHTML = continentes[1];
		if(banderas[1])
			$('#opc2').css("display","none");
		else
			$('#opc2').css("display","inline");
		
		document.getElementById("opc3").innerHTML = continentes[2];
		if(banderas[2])
			$('#opc3').css("display","none");
		else
			$('#opc3').css("display","inline");
		
		document.getElementById("opc4").innerHTML = continentes[3];
		if(banderas[3])
			$('#opc4').css("display","none");
		else
			$('#opc4').css("display","inline");
		
		document.getElementById("opc5").innerHTML = continentes[4];
		if(banderas[4])
			$('#opc5').css("display","none");
		else
			$('#opc5').css("display","inline");

		document.getElementById("opc6").innerHTML = continentes[5];
		if(banderas[5])
			$('#opc6').css("display","none");
		else
			$('#opc6').css("display","inline");
		
		document.getElementById("opc7").innerHTML = continentes[6];
		if(banderas[6])
			$('#opc7').css("display","none");
		else
			$('#opc7').css("display","inline");

		var win=true;
		//condicion de victoria, tener 7 banderas, una en cada continente
		for(i=0; i<7;i++)
			if(!banderas[i]){
				win = false;	//si un continente no ha sido conquistado, se le niega la condicion de victoria
				break;			//sale del ciclo.
			}
		
		if(win){
			alert("Has conquistado el mundo! Enhorabuena!");
			$('#contenido').css("display","none");
			//recarga la pagina para evitar errores logicos
			location.reload(true);
		}
	}
}