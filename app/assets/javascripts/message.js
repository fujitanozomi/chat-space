$(function(){
  function buildHTML(message){
    if(message.image){
      image = `<img src=${message.image} width="250" height="150">`;
      }else{
      image = "";
    }
    var html = `<div class="one-message">
                  <div class="one-message__writer-name">
                    ${message.name}
                  </div>
                  <div class="one-message__written-time">
                    ${message.created_at}
                  </div>
                  <div class="one-message__written-message">
                    ${message.content}
                    <br>
                    ${image}
                  </div>
                </div>`
    return html;
  }
  function pagereset(){
    $('.form__submit-button').prop('disabled', false);
  }
  $('#new_message').on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,
      type: "POST",
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.messages-list').append(html);
      $('.form__type-message').val('');
      $('.form__image').val('');
      $('.messages-list').animate({ scrollTop: $('.messages-list')[0].scrollHeight });
      pagereset();
    })
    .fail(function(){
      alert('error');
    })
  });
});
