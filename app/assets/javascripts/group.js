$(function() {
var searchList = $('#user-search-result');
  function appendUser(user) {
    var htmlUserList = `<div class="chat-group-user clearfix">
                          <p class="chat-group-user__name">${user.name}</p>
                          <a class="user-search-add chat-group-user__btn chat-group-user__btn--add" data-user-id=${user.id} data-user-name=${user.name}>追加</a>
                      </div>`
    searchList.append(htmlUserList);
  }
var addUserList = $('#chat-group-users');
  function appendAddUser(id, name) {
    var htmlAddUser = `<div class='chat-group-user chat-group-user clearfix js-chat-member' id='chat-group-user-${id}'>
                          <input name='group[user_ids][]' type='hidden' value=${id}>
                          <p class='chat-group-user__name'>${name}</p>
                          <a class='user-search-remove chat-group-user__btn chat-group-user__btn--remove js-remove-btn'>削除</a>
                      </div>`
    addUserList.append(htmlAddUser);
  }
  function appendNoUser(user) {
    var html = `<div class="chat-group-user clearfix">${user}</div>`
    searchList.append(html);
  }
// 検索
  $(".search__query").on("keyup", function(e) {
    e.preventDefault();
    var input = $(this).val();
    $.ajax({
      type: 'GET',
      url: '/users',
      data: { keyword: input },
      dataType: 'json'
    })
    .done(function(users) {
      $('#user-search-result').empty();
      if (users.length !== 0){
        users.forEach(function(user){
          appendUser(user);
        });
      } else {
        appendNoUser("一致するユーザーはいません");
      }
    })
    .fail(function() {
      alert('error');
    });
  });
// 追加
  $('#user-search-result').on('click','.user-search-add', function(){
    var id = $(this).data("user-id");
    var name = $(this).data("user-name");
    $(this).parent().remove();
      $.ajax({
        type: 'GET',
        url: '/users',
        dataType: 'json'
    })
// 削除
    .done(function(users) {
      appendAddUser(id, name);
      $(this).parent().remove();
    })
    .fail(function() {
      alert('error');
    });
    $('#chat-group-users').on('click','.user-search-remove', function(){
      $(this).parent().remove();
   });
  });
});
