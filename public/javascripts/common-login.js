$(() => {
    $('.common-login').click(function(){
        var btnLabel = $('.common-login').text().trim();

        if (btnLabel == '로그인') {
            location.href="/fb/auth";
        } else {
            location.href="/logout"
        }        
    });
});