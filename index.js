const { send } = require('micro')
const SlackBot = require('slackbots');

// create a bot
const bot = new SlackBot({
	// Add a bot https://my.slack.com/services/new/bot and put the token 
    token: process.env.SLACK_BOT_TOKEN,
    name:  'gomez_the_cat'
});

const params = {
    icon_emoji: ':cat:',
    link_names: true
};

bot.on('start', function() {
	// more information about additional params https://api.slack.com/methods/chat.postMessage
	// define channel, where bot exist. You can adjust it there https://my.slack.com/services 
	bot.postMessageToChannel('general', 'meow!', params);
});


function botTalk() {
	bot.postMessageToChannel('general', 'mew!', params);
}

// Add in a username to DM
function botTalkPersonal() {
	bot.postMessageToUser('username', 'meow!', { 'slackbot': true, icon_emoji: ':cat:' });
}

bot.on('message', function(data) {
    // all ingoing events https://api.slack.com/rtm
    if (data.type === 'user_typing') {
    	// Add in a user id to ping on type
    	if (data.user !== 'USER_ID') {
    		botTalk();
    	}
    }
});

module.exports = (req, res) => {
	const talkytalk = botTalkPersonal();

	send(res, 200, {
		status: 'success',
		message: 'talkytalk'
	});
}