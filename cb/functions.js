class Model {
	constructor(name, priority, scoring, pvt) {
		this.name = name;
		this.priority = priority; // number, sort ascending (lower is better)
		this.scoring = scoring; // optional
		this.pvt = pvt; // optional
	}
}

class Scoring {
	constructor(beauty, dtf, levels, sensitivity, authenticity, exhibition, shape, mangos, peach, bird, greek, broadcast, availability) {
		// number, sort descending (higher is better)
		this.beauty = beauty; // {10..1}
		this.levels = levels; // {5..0}
		this.sensitivity = sensitivity; // {5..0}
		this.authenticity = authenticity; // {5..0}
		this.dtf = dtf; // {5..0}
		this.exhibition = exhibition; // {5..0}
		this.shape = shape; // {5..0}
		this.mangos = mangos; // {5..0}
		this.peach = peach; // {5..0}
		this.bird = bird; // {5..0}
		this.greek = greek; // {5..0}
		this.broadcast = broadcast; // {5..0}
		this.availability = availability; // {5..0}
	}
}

class Pvt { 
	constructor(allows, rate, recording) {
		this.allows = allows; // boolean
		this.rate = rate; // number
		this.recording = recording; // "yes", "no", "sometimes"
	}
}

const $$__Models = new Map();
const $$__Params = new URLSearchParams(window.location.search);

function channelId(modelName) {
	return "channel$" + modelName;
}

function channelImgId(modelName) {
	return "img$" + modelName;
}

function channelImgUrl(modelName) {
	return "https://thumb.live.mmcdn.com/riw/" + modelName + ".jpg";
}

function channelActiveUrl(modelName) {
	return "https://thumb.live.mmcdn.com/minifwap/" + modelName + ".jpg?f=" + Date.now();
}

function chaturbateUrl(modelName) {
	return "https://m.chaturbate.com/" + modelName + "/";
}

function createChannelBox(model, priorityOverride) {
	const channelBox = document.createElement('div');
	channelBox.id = channelId(model.name);
	channelBox.className = "model";
	
	let priority;
	if (priorityOverride === undefined) {
		priority = model.priority;
	} else {
		console.log(model.name + " -> " + priorityOverride);
		priority = priorityOverride;
	}
	channelBox.style.order = priority;

	channelBox.style.display = 'none';
	
	return channelBox;
}

function createAnchor(modelName) {
	const anchor = document.createElement('a');
	anchor.href = chaturbateUrl(modelName);
	anchor.target = "_blank";
	
	return anchor;
}

function createImg(modelName) {
	const img = new Image();
	img.id = channelImgId(modelName);
	img.src = channelActiveUrl(modelName);
	
	return img;
}

function turnOn(modelName, channelBox) {
	channelBox.style.display = 'inline';
}

function turnOff(channelBox) {
	channelBox.style.display = 'none';
}

function isOfflineImage(imgSize) {
	return (imgSize == 0 || imgSize == 4456 || imgSize == 7442 || imgSize == 21971 || imgSize == 4824 || imgSize == 6778 || imgSize == 6734 || imgSize == 9505);
}

function addModel(modelName, priority) {
	if (! $$__Models.has(modelName)) {
		let newModel = new Model(modelName, priority); 
		$$__Models.set(modelName, newModel);
	}
}

function makeAddendums() {
	let modelKeys = ['model','m'];
	for (k of modelKeys) {
		let moar = $$__Params.getAll(k);
		for (m of moar) {
			if (! $$__Models.has(m)) {
				addModel(m, 110);
			}
		}
	}
	for (h of $$__Params.getAll('h')) {
		if ($$__Models.has(h)) {
			$$__Models.delete(h);
		}
	}	
}
