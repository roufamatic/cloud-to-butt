(function(justHeaders) {
	if (justHeaders) {
		["h1","h2","h3","h4","h5","h6"].forEach((tag) => {
			flatten(document.getElementsByTagName(tag)).forEach((el) => {
				textNodesUnder(el).forEach((node) => {
					handleText(node);
				});
			});
		});
	}
	else {
		textNodesUnder(document.body).forEach((node) => {
			handleText(node);
		});
	}
})(false);

function textNodesUnder(el){
  var n, a=[], walk=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null,false);
  while(n=walk.nextNode()) a.push(n);
  return a;
}

function handleText(textNode) 
{
	var v = textNode.nodeValue;
	v = v.replace(/falsehoods([^\.]+)are/g, "bullshit$1is");
	v = v.replace(/Falsehoods?/g, "Bullshit");
	v = v.replace(/falsehoods?/g, "bullshit");
	v = v.replace(/\b(False)\b/g, "Full-of-Shit");
	v = v.replace(/\b(false)\b/g, "full-of-shit");

	textNode.nodeValue = v;
}

function flatten(list) {
	return (Array.from(list)).reduce((a, b) => a.concat(Array.isArray(b) ? flatten(b) : b), []);
}

