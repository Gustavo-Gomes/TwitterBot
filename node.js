var ntwitter = twitter('ntwitter');
var auth = require('./auth');

var bot = new ntwitter(auth);

var callback = function handleError(error){
	if (error){
		console.error('response status:', error.statusCode);
		console.error('data:', error.data);
	}
};

//Array to store streamed tweets
var queue = [];

//lista com os seguidores da Mel...
var lista = ["lecondimento", "AnaPatrciaNobre", "pizzaloira", "Stcfy", "karyneamaisfofa", "joaomftorres", "Knopftler", "tombalobos95", "FantasticoFonte", "JulianaaGerardo", "missmelfe"];
var i;

//Get a stream of tweets
function startStreaming(){
	bot.stream('statuses/filter', { track: 'Mel, mel, Mélanie, Melanie, mélanie, melanie'}, function(stream){

	console.log('Listening for Tweets...');

	stream.on('data', function(tweet){

	//Check Tweet for specific matching phrases as Twitter's Streaming API doesn't allow this
	if(tweet.text.match(/mel|Mel|Mélanie|Melanie|mélanie|melanie/)){
		for(i=0; i<lista.lenght; i++)
				if(tweet.user.screen_name == lista[i]){
					var melParams = {
						status: '@' + tweet.user.screen_name + 'estás a pensar na @melaniemarinha?', in_reply_to_status_id: tweet.id
					};
			}
			queue.push(melParams);

	setInterval(function() {
		console.log(queue);

		//loop through queue to randomly select 10 tweets
		for(var i=0; i<10; i++){
			var index = getRandomIndex(queue);
			var sampleTweet = queue.splice(index, 1);
			console.log(i+1);
			console.log(sampleTweet[0], sampleTweet[0], callback);

			//send the tweets
			bot.updateStatus(sampleTweet[0], sampleTweet[0], callback);
		}

		//Reset queue
		queue=[];
	}, 1000*60*15);

// Start streaming Tweets
startStreaming();
