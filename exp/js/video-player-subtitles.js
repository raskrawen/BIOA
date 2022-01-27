var subtitles = {
    T_173604_video_opgave3_2: {
		lang: "en",
		name: "English",
        tracks: [
			//from		To			Text
			T(TTime("00:00:00:01"), TTime("00:00:04:00"), "For at spore dannelsen af nye amplikoner i realtid,"),
			T(TTime("00:00:04:00"), TTime("00:00:08:00"), "har PCR-reaktionen brug for noget yderligere -"),
			T(TTime("00:00:08:00"), TTime("00:00:15:00"), "en enkeltstrenget DNA-probe, designet til at binde sig til en del af den"),
			T(TTime("00:00:15:00"), TTime("00:00:18:15"), "DNA-sekvens, der bliver syntetiseret mellem de to primere."),
			T(TTime("00:00:18:15"), TTime("00:00:26:00"), "Men i modsætning til primerene, er denne probe mærket mere specifikt."),
			T(TTime("00:00:26:00"), TTime("00:00:36:15"), "En af dens nukleotider er mærket med et fluorescerende molekyle og et andet nucleotid er mærket"),
			T(TTime("00:00:36:15"), TTime("00:00:40:15"), "med et fluorescerende quencher-molekyle. (to quench betyder \"at slukke\")"),
			T(TTime("00:00:40:15"), TTime("00:00:47:00"), "Quencheren absorberer hurtigt al lysenergi, der udsendes af det fluorescerende molekyle,"),
			T(TTime("00:00:47:00"), TTime("00:00:52:00"), "så længe molekylet forbliver meget tæt på quencheren."),
			T(TTime("00:00:53:30"), TTime("00:01:03:00"), "Lad os nu se, hvad der sker, når denne ekstra ingrediens er tilstede under en enkelt cyklus af PCR."),
			T(TTime("00:01:03:00"), TTime("00:01:08:00"), "Andre primere binder til de separate strenge af DNA."),
			T(TTime("00:01:08:00"), TTime("00:01:13:00"), "Proben finder også sin komplimentære sekvens imellem dem."),
			T(TTime("00:01:13:00"), TTime("00:01:21:30"), "Enzymet syntetiserer nyt DNA fra enderne af primerne, men har også en anden aktivitet:"),
			T(TTime("00:01:21:30"), TTime("00:01:25:15"), "en exonucleaseaktivitet (dvs. enzymet spalter fejlplacerede nucleotider fra DNA-strengen)"),
			T(TTime("00:01:25:15"), TTime("00:01:32:15"), "Så når enzymet støder på dobbeltstrenget DNA, vil det skille strengen,"),
			T(TTime("00:01:32:15"), TTime("00:01:36:30"), "som er i vejen ad, og erstatte alle nukleotiderne."),
			T(TTime("00:01:36:30"), TTime("00:01:42:00"), "Bemærk at mens polymerasen passere gennem proben, bliver nukleotidet,"),
			T(TTime("00:01:42:00"), TTime("00:01:44:00"), "som bærer den fluorescerende markør"),
			T(TTime("00:01:44:00"), TTime("00:01:49:00"), "og nukleotidet der bærer quencheren adskilt fra hinanden."),
			T(TTime("00:01:49:00"), TTime("00:01:56:30"), "I mangel af en nærliggende quencher, kan det fluorescerende molekyle nu udsende målbart lys,"),
			T(TTime("00:01:56:30"), TTime("00:01:59:00"), "når det bliver stimuleret.")
		
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

function T(start, end, text) {
	return {
		start: start,
		end: end,
		text: text
	};
}