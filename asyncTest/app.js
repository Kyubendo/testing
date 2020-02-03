function loadScript(src, callback) {
  let script = document.createElement('script');
  script.src = src;
  script.onload = () => callback(src);

  document.head.append(script);
}

loadScript('script.js', scrName => {
  changeDiv(scrName);
  loadScript('script2.js', scrName => {
    changeDiv2(scrName);
  });
});

function loadScriptPr(src) {
  return new Promise((resolve, reject) => {
    let script = document.createElement('script');
    script.src = src;
    script.onload = () => resolve(src);
    document.head.append(script);
  });
}

loadScriptPr('script.js')
  .then(scrName => {changeDiv(scrName);
  return loadScript('script2.js')})
  .then(srcName => {changeDiv2(srcName);
  return loadScript('script3.js')})
  .then(srcName => {changeDiv3(srcName)});
