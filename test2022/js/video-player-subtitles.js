var subtitles = {
    T_171370_kvalitative_test: {
		lang: "en",
		name: "English",
        tracks: [
			//from		To			Text
			T(0, 7, "Fehlings reagens 1 - Fehlings reagens 2 - 1 2 3 4"),
			T(52, 57, "Polarimeter - H2O - 1 2 3 4"),
			T(ATime(1,12,0), ATime(1,25,0), "Ved nul grader står de to polaroidpladers polatisationsretning vinkelret på hinanden")
        ]
    },
    T_160520_A4: {
		lang: "en",
		name: "English",
        tracks: [
			//from		To			Text
			T(6.5, 9.5, "Les risques d'une dépendance trop importante au sport "),
			T(10, 13, "sont liés à la pratique excessive du sport concerné"),
			T(13.1, 18, "Il existe des risques de déchirures musculaires, d'atteintes tendineuses"),
			T(18, 20.45, "de fractures osseuses, d'infarctus"),
			T(21, 94.4, "Et bien sûr, il y a un risque d’un épuisement généralEt bien sûr, il y a un risque d’un épuisement général<br />1<br />2<br />3"),
			// T(24.5, 26.5, "dû à une trop grande activité sportive "),
			// T(32.2,	34.9, "Les personnes présentant une bigorexie font preuve"),
			// T(35, 37.5, "pendant de longs mois d'un véritable déni"),
			// T(37.5, 40, "les poussant même davantage à augmenter la fréquence"),
			// T(40.5,	43.5, "de leurs activités sportives pour contredire leur entourage."),
			// T(49.5, 53.4, "Il est souvent nécessaire de consulter un psy ou un médecin addictologue"),
			// T(53.5, 55, "cette démarche n'est possible que "),
			// T(55, 58.8, "lorsque la personne accepte l'idée d'être dépendant"),
			// T(58.9, 61.5, "Il est conseillé de diversifier ses activités sportives "),
			// T(ATime(1,1,6), ATime(1,6,0), "et de pratiquer le sport moins isolément mais avec d'autres personnes. "),
			// T(TTime("00:01:07:00"), TTime("00:01:08:12"), "Et à arriver à pratique le sport par plaisir"),
			// T(_Time(0,69), _Time(12,70), "et non par contrainte")
        ]
    }
};

/**
 * Takes up to 4 values 
 * 4 values: [0]hours[1]minutes[2]seconds[3]frames
 * 3 values: [0]minutes[1]seconds[2]frames
 * 2 values: [0]seconds[1]frames
 * 1 value : [0]frames
 */
function ATime() {
	var frames = 0;
	var seconds = 0;
	var minutes = 0;
	var hours = 0;
	if(arguments.length == 1) {
		frames = (arguments[0]*1)/24;
	}
	else if(arguments.length == 2) {
		frames = (arguments[1]*1)/24;
		seconds = arguments[0]*1;
	}
	else if(arguments.length == 3) {
		frames = (arguments[2]*1)/24;
		seconds = arguments[1]*1;
		minutes = (arguments[0]*1)*60;
	}
	else if(arguments.length == 4) {
		frames = (arguments[3]*1)/24;
		seconds = arguments[2]*1;
		minutes = (arguments[1]*1)*60;
		hours = (arguments[0]*1)*3600;
	}
	else {
		return 0;
	}
	return hours + minutes + seconds + frames;
}

/**
 * If value is undefined returns 0
 * @param {*} value 
 */
function UndefinedToZero(value) {
	if(typeof value === "undefined") {
		return 0;
	}
	return value;
}

/**
 * Convert input to seconds
 * @param {numeric} frames Not Required
 * @param {numeric} seconds Not Required
 * @param {numeric} minutes Not Required
 * @param {numeric} hours Not Required
 */
function _Time(frames, seconds, minutes, hours) {
	frames = UndefinedToZero(frames) / 24;
	seconds = UndefinedToZero(seconds);
	minutes = UndefinedToZero(minutes) * 60;
	hours = UndefinedToZero(hours) * 3600;
	return hours + minutes + seconds + frames;
}

/**
 * Convert string input "00:00:00:00" to seconds
 * @param {string} value Required
 */
function TTime(value) {
	if(typeof value === "undefined") {
		value = "00:00:00:00";
	}
	var split = value.split(":");
	var frames = (split[3]*1)/24;
	var seconds = split[2]*1;
	var minutes = (split[1]*1)*60;
	var hours = (split[0]*1)*3600;
	var output = hours + minutes + seconds + frames;
	return output;
}

function T(start, end, text, direction) {
	if(typeof direction === "undefined") {
		direction = "ltr";
	}
	return {
		start: start,
		end: end,
		text: text,
		direction: direction
	};
}