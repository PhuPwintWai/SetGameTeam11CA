var source;
$(function() {
    
    source = new EventSource("api/chatroom");
    source.onmessage = function(event) {
        console.log("got message");
        var chat = JSON.parse(event.data);
        var $messages = $("#messages");
        console.log(">> msg = " + JSON.stringify(chat));
        $messages.text(chat.name + ": " + chat.image1 +" " +chat.image2 + " " + chat.image3 + " " + "\n" 
                + $messages.text());
        //
    }

   var count =0;
   var img =[];
$(".sendid").on("click",(function(){
    if(count === 3)
    {    count=0;
        
    }
    
    img[count] = this.id;
    
    count++;
  
}));

$("#btnsubmit").on("click",(function(){
    for(var i=0;i<3;i++)
        console.log(img[i]);
    $.get("/SetGameTeam11CA/newMessage", { 
           name: $("#name").val(),
           image1: img[0],
           image2: img[1],
           image3: img[2]
           
       }).done(function() {
          $("#name").text=" ";
          img[0].value = '';
          img[1].value = '';
          img[2].value = '';
       });
   })); 


})