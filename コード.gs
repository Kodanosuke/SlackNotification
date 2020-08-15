function main() {
  
  const ss = SpreadsheetApp.getActiveSpreadsheet()
  const sheet = ss.getSheetByName("シート1")
  
  const token = sheet.getRange("A2").getValue()
  const room = sheet.getRange("C2").getValue()
  const folderID = sheet.getRange("E2").getValue()
  
  const pastItems = sheet.getRange(sheet.getLastRow(), 1).getValue()
  
  const latestFile = getLatestFile(folderID);
  
  if(latestFile != pastItems){
  
  const text = getTXT(folderID)
  
  const postURL = "https://slack.com/api/chat.postMessage"
  var payload = {
    "token" : token,
    "channel" : room,
    "text" : String(text[0])
  };
  
  var params = {
    "method" : "post",
    "payload" : payload
  };
  
  // Slackに投稿する
  UrlFetchApp.fetch(postURL, params);
  
  //送信したファイルをシートに記載
    sheet.getRange(sheet.getLastRow()+1, 1).setValue(latestFile)
  
  }
}

function getLatestFile(folderID){
  const folder = DriveApp.getFolderById(folderID)
  const files = folder.getFiles();
  
   const list = [];
  
  
  while(files.hasNext()) {
    var buff = files.next();
    var mime = buff.getMimeType()
    if(mime ==  "text/plain"){
      
      var test = Utilities.formatDate(buff.getDateCreated(), "JST", "yyyyMMddHHmm");
      list.push([test,buff.getName()])
      
    }     
  };
  list.sort(function(a,b){return(b[0] - a[0]);});
  
  return list[0][1]
  

}

function getTXT(folderID){
  
  const folder = DriveApp.getFolderById(folderID)
  const files = folder.getFiles();
  const list_name = [];
  const list_url = [];
  const list_mime = [];
  const list = [];
  
  
  while(files.hasNext()) {
    var buff = files.next();
    var mime = buff.getMimeType()
    if(mime ==  "text/plain"){
      
      var test = Utilities.formatDate(buff.getDateCreated(), "JST", "yyyyMMddHHmm");
      list.push([test,buff.getName()])
      
    }     
  };
  list.sort(function(a,b){return(b[0] - a[0]);});
  
  const contents = folder.getFilesByName(list[0][1]).next().getBlob().getDataAsString("sjis").split("/[\s]+/");
  
  return contents
}