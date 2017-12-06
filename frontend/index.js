$(function(){
    loadAllPost();
});

$('#search').click(function(){
    loadPostByUser();
});

function loadAllPost() {
    $('#posts').empty();
    //Get all posts
    var url = 'http://localhost:8080/api/posts';


    axios.get(url)
    .then(function (response) {
        $.get('post.mst', function(template) {
            for(i=0; i<response.data.length; i++){
                response.data[i].create_date = moment().format('LLL');
                var rendered = Mustache.render(template, response.data[i]);
                $('#posts').append(rendered);
            }
          });
    })
    .catch(function (error) {
      console.log(error);
    });
  
}

function loadPostByUser() {
    
    $('#posts').empty();

    var url = 'http://localhost:8080/api/posts/mypost';
    axios.get(url)
    .then(function (response) {
        $.get('post.mst', function(template) {
            for(i=0; i<response.data.length; i++){
                response.data[i].create_date = moment().format('LLL');
                var rendered = Mustache.render(template, response.data[i]);
                $('#posts').append(rendered);
            }
          });
    })
    .catch(function (error) {
      console.log(error);
    });
}
    

