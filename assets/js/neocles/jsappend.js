$("#tache").click(function(){
    if(!$("#chem1").length){
        $("#chem").append(                   
		$(          
        '<input type="text" name="chem1" id="chem1" required>',
		));
      }else{
		if($("#chem1").length){
			$('#chem1').remove();
		}
	}
  });
  $("#tache1").click(function(){
    if(!$("#chem5").length){
        $("#chem2").append(                   
		$(          
        '<input type="text" name="chem" id="chem5" required>',
		));
      }else{
		if($("#chem5").length){
			$('#chem5').remove();
		}
	}
  });