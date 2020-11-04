$(() => {
    
    // Loop over them and prevent submission
    var validation = Array.prototype.filter.call(forms, function(form) {
        form.addEventListener('submit', function(event) {
          if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
          }
          form.classList.add('was-validated');
        }, false);
    });
    $('#btn-add-campaign').on('click', (e) => {
    
        if (!e.isDefaultPrevented()) {
            // Event addCampaign
            addCampaign();

            return false;
        }
    });
});

const addCampaign = () => {
    $('#form_campaign').submit();
}

$(function(){
    var next = 0;
    $(document).on('click', '.btn-add',(e)=>{
        e.preventDefault();

        next += 1;

        var html = `
        <div class="entry input-group">
            <div class="col-md-12 mb-3">
                <label class="mr-2" for="variant">테스트변수 </label><span class="input-group-btn">
                <button class="btn btn-success btn-sm btn-add"><span>+</span></button></span>
                <input class="form-control" type="text" name="testVar[${next}][var]" id="variant" placeholder="ex) 완성컷,등장컷" value="value" required="required" />
            </div>
        </div>
        `;
        var controlForm = $('.controls'),
            currentEntry = $(e.target).parents('.entry:first'),
            // newEntry = $(currentEntry.clone()).appendTo(controlForm);
            newEntry = $(html).appendTo(controlForm);
            
        newEntry.find('input').val('');
        controlForm.removeClass('my-4').addClass('my-4');
        controlForm.find('.entry:not(:last) .btn-add')
            .removeClass('btn-add').addClass('btn-remove')
            .removeClass('btn-success').addClass('btn-danger')
            .html('<span>-</span>');
    }).on('click','.btn-remove', (e)=>{
        $(this).parents('.entry:first').remove();
    
        e.preventDefault();
    
        return false;
    }); 
});