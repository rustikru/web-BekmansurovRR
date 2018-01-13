$(document).ready(function () {
    /**
     * аякс добавление в корзину
     */
    $('.to_cart').click(function(){
        $this = $(this);
        $.get('/ajax/cart.php',{variant : $this.data('id')},function (data) {
            $('#add-basket .modal-body').html(data.large);
            $('#little_cart').html(data.small);
            $('#add-basket').modal();
        });

        return false;
    });

    /**
     * удаление из корзины на большом попапе корзины
     */
    $('#add-basket').on('click','.large-basket-remove',function(){
        var link = $this.attr('href');
        $.get(link,function(){
            location.reload();
        });
        return false;
    });

    /**
     * быстрая покупка - вызов модального окна
     */
    $('.fast_buy').click(function () {
        $this = $(this);
        $.get('/ajax/product_info.php',{variant : $this.data('id')},function (data) {
            var modal = $('#fast-click');
            modal.find('.add-basket-preview img').attr('src',data.image);
            modal.find('.add-basket-title').html(data.title);
            modal.find('.product-price').html(data.price + ',-');
            modal.find('#fast-click-variant').attr('name','amounts[' + $this.data('id') + ']');
            modal.modal();
        })
    });

    /**
     * ajax удаление товара из корзины
     */
    $('.basket-item-clear').click(function () {
        var $this = $(this);
        var link = $this.find('a').attr('href');
        $.get(link,function(data){
            $this.parent().hide('slow', function(){ $this.parent().remove(); });
            $('#little_cart').html(data.small);
            $('.basket-price-total').html(data.total+',-');
        });
        return false;
    });

    /**
     * выбор доставки
     */
    $('#type-delivery').change(function () {
       if ($('input[name=delivery_id]:checked').val() == 2){
           $('input[name=delivery_id][value=1]').click();
       }
    });
    $('#type-pickup').change(function () {
        $('#type-delivery').prop('checked',false);
        $('label[for=type-delivery]').removeClass('ui-state-active');

    });

    /**
     * форма трейдина
     */
    $('#trade-in-form').submit(function () {
        var data = $(this).serialize();
        $.ajax({
            url : "/ajax/callback.php",
            data : data,
            dataType : 'json',
            success : function (data) {
                if (data.type == 'confirm'){
                    $('.form-feedback').html(data.msg);
                }
            }
        });
        return false;
    });

    /**
     * Success callback popup
      */
    var callbackForm =  $('#callback-wrap form');
    callbackForm.on('submit', function(e){
        var $this = $(this);
        e.preventDefault();
        var data = $(this).serialize();
        $.ajax({
            url: "/ajax/telfin.php",
            data: data,
            dataType: 'json',
            success: function(data){
                $this.hide();
                $('.success-callback').addClass('__visible');
            },
        });
        return false;
    });

    $('.product-info input').on('change',function () {
        var variantId = $(this).val();
        $('.product-action .to_cart').data('id',variantId);
        $('.product-action .fast_buy').data('id',variantId);

    });

    /**
     * фильтры каталога
     */
    $('.catalog-sort > select').on('selectmenuchange', function() {
        window.location = $(this).val();
    });
    $('body').click(function(){
        $('#tooltip').fadeOut();
    });

    $('#filter_form .filter-info-text input').keyup(function () {
        $this = $(this);
        $list = $this.parents('.catalog-filter-list');
        getFilter($list);
    });
    
    $('#filter_form input').change(function () {
        $this = $(this);
        if ($this.parent().hasClass('filter-info-text')) return false;
        $list = $this.parents('.catalog-filter-list');
        getFilter($list);
    });
    
    /*$('#filter_form .js-filter-clear').click(function () {
        $this = $(this);
        getFilter($this);
    });*/

    /*$('#filter_form [data-filter-slider-element~="line"]').noUiSlider.on('update', function(){
        $this = $(this);
        $list = $this.parents('.catalog-filter-list');
        getFilter($list);
    });*/
    
    $('#tooltip a').click(function(){
        $listContainer = $("#catalog-product-list");
        $listContainer.fadeTo(200, 0.10);
        getFilter();
        $('#tooltip').fadeOut();
    });

    var getFilter = function ( $list, $action ) {
        //собираем фильтры
        var form = $('#filter_form');
        if ($list){
            form.find('[name="cnt"]').val(1);
        } else {
            form.find('[name="cnt"]').val(0);
        }

        var action  = form.attr('action');
        if (!$list && $action){
            action = $action;
        }
        $.get(action,form.serialize(),function (data) {
            if ($list){
                var tooltip = $('#tooltip');
                tooltip.find('span').html(data);
                tooltip.css({display:"none"}).fadeIn(400);
                tooltip.css({top:$list.offset().top + 20, left:$list.offset().left + 20});
            } else {
                $listContainer = $("#catalog-product-list");
                $listContainer.fadeTo(600, 1);
                $listContainer.html(data);
                $listContainer.find('.pagination > a').click(function () {
                    getFilter(false, $(this).attr('href'));
                    return false;
                });
            }     
        });

        return false;
    }

    //КЛАДР на корзине
    if (typeof initDelivery !== "undefined"){
        initDelivery();
    }




});