function main() {
  

const token = "xoxp-1275887529575-1290836170403-1303339492913-84f1a6ddf4dddf62c073f2c0eba8ee59"
const room = "coconala"

const folderID = "1XEjv8hPC7IT4GXJw0avH2HqcliZEusL2"
const text = getTXT(folderID)

const postURL = "https://slack.com/api/chat.postMessage"
  var payload = {
    "token" : token,
    "channel" : room,
    "text" : text
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(postURL, params);


}

function getTXT(folderID){

  const folder = DriveApp.getFolderById(folderID)
  const files = folder.getFiles();
  const list_name = [];
  const list_url = [];
  const list = [];
  const hiduke = [];
 
  while(files.hasNext()) {
    var buff = files.next();
    list.push([buff.getName(), buff.getUrl()]);
    //list_name = {name: buff.getName(), url: buff.getUrl()};
    hiduke.push(new Date(buff.getName().substr(1,15)))
    
  };
  
  hiduke.sort(function(a,b) {
    return (a.date < b.date ? 1 : -1);
});
   
  var test = "test"
  

}