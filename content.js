const injectScript = (file) => {
    var th = document.getElementsByTagName('body')[0];
    var s = document.createElement('script');
    s.setAttribute('type', 'text/javascript');
    s.setAttribute('src',  chrome.runtime.getURL(`${file}.js`));    
    th.appendChild(s);
}
injectScript('extranet_scoped_script');