const $$__Channels = new Map(); // model.name -> channelBox
const $$__Active = new Map(); // model.name -> img
const $$__Offline = new Map(); // model.name
const $$__ImgSizeHistory = new Map(); // model.name -> [imgSize]

const $$__imgHistMax = 4;

function scanChannel(modelName, imgBox) {	
	let imgScan = fetch(channelActiveUrl(modelName))
		.then(
			function(response) {
				return response.blob();
			}
		).then(
			function(blob) {
				return blob.size;
			}
		);
	
	return imgScan.then(
			function(imgSize) {				
				let imgSizeArr;
				if ($$__ImgSizeHistory.has(modelName)) {
					imgSizeArr = $$__ImgSizeHistory.get(modelName);
					if (imgSizeArr.length >= $$__imgHistMax) {
						imgSizeArr.shift();
					}
					imgSizeArr.push(imgSize);
				} else {
					imgSizeArr = [imgSize];
				}
				$$__ImgSizeHistory.set(modelName, imgSizeArr);
				
				console.log("[" + Date.now() + "] " + modelName + " -> " + imgSizeArr);

				let isStreaming = (
					(imgSizeArr.length < $$__imgHistMax)
					|| (! imgSizeArr.every(s => (s === imgSize)))
				);

				if (isStreaming && (! isOfflineImage(imgSize))) {
					if (! $$__Active.has(modelName)) {
						$$__Active.set(modelName, imgBox);
						turnOn(modelName, $$__Channels.get(modelName));
						imgBox.src = channelActiveUrl(modelName);
						pulseThrobber();
					}
					if ($$__Offline.has(modelName)) {
						$$__Offline.delete(modelName);
					}
				} else {
					$$__Offline.set(modelName, imgBox);
					$$__Active.delete(modelName);
					turnOff($$__Channels.get(modelName));
					// pulseThrobber();
				}
			}
		);
}

function refreshChannel(img, modelName, map) {
	img.src = channelActiveUrl(modelName);
}

function refreshing() {
	$$__Active.forEach(refreshChannel);
}

function check(img, modelName, imgMap) {
	scanChannel(modelName, img);
}

function checking(map) {
	map.forEach(check);
}

function renderChannel(model, modelName, models) {
	if (! $$__Channels.has(modelName)) {
		let tvBox = document.getElementById("main");
	
		let channelBox;
		if ($$__Params.getAll('shuffle').length > 0) {
			let shuffledPriority = Math.floor(Math.random() * 100) + model.priority;
			console.log(modelName + " -> " + shuffledPriority);
			channelBox = createChannelBox(model, shuffledPriority);
		} else {
			channelBox = createChannelBox(model);
		}
	
		let anchor = createAnchor(modelName);
		let img = createImg(modelName);
	
		anchor.appendChild(img);
		channelBox.appendChild(anchor);
		tvBox.appendChild(channelBox);
	
		$$__Channels.set(modelName, channelBox);
		scanChannel(modelName, img);
	}
}

const $$__Tempus = document.getElementById("timestamp");
function fugit() {
	$$__Tempus.innerHTML = Date.now();
}

function tempusFugit() {
	if ($$__Active.size == 0) {
		if ($$__Tempus.style.display != 'inline') {
			$$__Tempus.style.display = 'inline';
		}
		fugit();
	} else {
		if ($$__Tempus.style.display != 'none') {
			$$__Tempus.style.display = 'none';
		}
	}
}

const $$__Throbber = document.getElementById("throbber");
function toggleThrobber(display) {
	$$__Throbber.style.display = display;
}
function pulseThrobber() {
	toggleThrobber('block');
	setTimeout(toggleThrobber, 1024, 'none');
}

function renderChannels() {
	$$__Models.forEach(renderChannel);
}

setInterval(refreshing, 256);

setInterval(checking, 4096, $$__Active);

setInterval(checking, 32768, $$__Offline);

setInterval(tempusFugit, 1024);

renderChannels();
setInterval(renderChannels, 1024);

// setTimeout(toggleThrobber, 1024, 'none');
pulseThrobber();
