let randomCharacter = Math.floor(Math.random() * 86) + 1;

let inputTxt = $('#guessInput');
let backgroundTxt = $('#backgroundTxt');
let mainTxt = $('#mainTxt');
let hintBox = $('.hints');
let submitBtn = $('#submitTest');

let guessCounter = 3;

submitBtn.hide();
hintBox.hide();
backgroundTxt.hide();
inputTxt.hide();
$('#loading').hide()

$(document).ajaxStart(function(){
	mainTxt.hide();
	$('#startTest').hide()
    $('#loading').show();
 }).ajaxStop(function(){
 	mainTxt.show()
    $('#loading').hide();
 });

function initTest(){
	$('#startTest').click(function(e) {
	$.getJSON('https://swapi.co/api/people/' + randomCharacter + '/', function(data) {
			//GUESS CHECKING
			$(submitBtn).click(function(){
				if(guessCounter == 0){
	 				mainTxt.text('lost');

	 				$(backgroundTxt).hide();
	 				$(hintBox).hide();
	 				$('#secondTxt').hide();
	 				$(inputTxt).hide();
	 			} else{
	 				guessCounter--;
	 				const chanceTxt = 'Chances Left: ' + guessCounter;
	 				$('#guessNum').text(chanceTxt);
	 				
	 			};
			});

			let charName = data.name;
			mainTxt.text('okay I am ready');
			inputTxt.show();
			$('#startTest').hide();
			submitBtn.show();
			//Load in characteristics into an h2
			backgroundTxt.show();
			//form the basic sentence
			let backgroundInfo = 'My eyes are ' + data.eye_color + ', and I am a '
			+ data.gender + '. My birthyear is ' + data.birth_year;
			//setting sentence to replace the h2
			$('#secondTxt').text(backgroundInfo);
			hintBox.show();

			//HINT 1 RECIEVES HOMEWORLD INFORMATION
			$('#hint1').click(function(e) {
				$('#hint1').prop('disabled', true);
				$.get(data.homeworld, function(home){
					const hint1Msg = 'I am from the planet '+ home.name;
					$('#hint1Txt').text(hint1Msg);
				});
			});

			$('#hint2').click(function(e) {
				$.get(data.films[0], function(films){
					$('#hint2').prop('disabled', true);
					const hint2Msg = 'I am most popularlly known for my work in ' + films.title + '.';
					$('#hint2Txt').text(hint2Msg);
				});
			});

			$('#hint3').click(function(e) {
				$.get(data.species[0], function(species){
					$('#hint3').prop('disabled', true);
					const hint3Msg = 'I am part ' + species.name;
					$('#hint3Txt').text(hint3Msg);
				});
			});

			console.log(data);
		}).fail(function(jqXHR) {
			mainTxt.text('There has been a ' + jqXHR.status + ' please refresh and retry');
		});
	});
};

initTest();