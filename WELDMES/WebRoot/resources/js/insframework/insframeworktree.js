$(function(){
	insftrameworkTree();
})
function insftrameworkTree(){
	 $("#myTree").tree({  
         url:'insframework/getConmpany',//请求路径
         onLoadSuccess:function(node,data){  
              var tree = $(this);  
              if(data){  
                  $(data).each(function(index,d) {  
                      if (this.state=='closed') {  
                          tree.tree('expandAll');  
                      }  
                  });  
              }  
         }
     });
}