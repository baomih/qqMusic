$(function() {
        //返回顶部
        $(window).scroll(function() {
            if ($(window).scrollTop() >= 100) {
                $(".btn_backtop").stop().fadeIn();
            } else {
                $(".btn_backtop").stop().fadeOut();
            }
        });
        //顶部搜索弹框
        $('.shuru').on('focus', function() {
            $('.search_list').slideDown()
        })
        $('.shuru').on('blur', function() {
                $('.search_list').slideUp()
            })
            // 渲染历史
        var historyListJSON = sessionStorage.getItem('historyList') || '[]'
        var historyListArr = JSON.parse(historyListJSON)
        var render = function() {
            var $html = ''
            historyListArr.forEach(function(item, i) {
                $html = '<li><a href="">' + item + '<i class="iconfont icon-shanchu1" data-index="' + i + '"></i></a></li>'
            })
            $('.search_history ul').append($html)
        }
        render()

        //搜索历史
        $('.search').on('click', function() {
            var history = []
            var value = $.trim($('.shuru').val()) || '国风美少年'
            historyListArr.push(value)
            sessionStorage.setItem('historyList', JSON.stringify(historyListArr))
            render()
        })
        $('.icon-shanchu1').on('click', function() {
            var i = $(this).data('index')
            historyListArr.splice(i, 1)
            sessionStorage.setItem('historyList', JSON.stringify(historyListArr))
            render()
        })
        $('.icon-shanchu').on('click', function() {
            historyListArr = []
            sessionStorage.setItem('historyList', JSON.stringify(historyListArr))
            render()
            return false
        })

        // 公共图片动画
        $('.img_mask').on('mouseover', function() {
            $(this).siblings('img').stop().css({ 'transform': 'scale(1.1)', 'transform-oragin': '50% 50%', 'transition': 'transform .25s' })
            $(this).css('background', 'rgba(0,0,0,.2)')
            $(this).siblings('.play_btn').stop().css({ 'transform': 'scale(1)', 'transform-oragin': '50% 50%', 'transition': 'transform .25s' })
            return false
        })
        $('.img_mask').on('mouseout', function() {
                $(this).siblings('img').stop().css({ 'transform': 'scale(1)', 'transform-oragin': '50% 50%', 'transition': 'transform .25s' })
                $(this).css('background', 'rgba(0,0,0,.0)')
                $(this).siblings('.play_btn').stop().css({ 'transform': 'scale(0)', 'transform-oragin': '50% 50%', 'transition': 'transform .25s' })
                return false
            })
            //歌单推荐=====================================
            // 箭头隐藏与出现
        arrowToggle($('.tuijian_box'))
            //点击左右箭头切换图片
        var $tj_triggerElem = $('.tuijian_box .arrow span')
        var $tj_objectElem = $('.tuijian_box .banner ul')
        var $tj_moveWidth = $('.tuijian .banner').width() + 16
        var $tj_totalnum = 2
        var $tj_pagination = $('.tuijian .pagination span')
        lunbo($tj_triggerElem, $tj_objectElem, $tj_moveWidth, $tj_totalnum, $tj_pagination)
            // 点击页码标识
        paginationAnimate($tj_pagination, $tj_objectElem)
            // 新歌首发===================================
            // 箭头隐藏与出现
        arrowToggle($('.shoufa_box'))
            //首发轮播图
        var $sf_triggerElem = $('.shoufa_box .arrow span')
        var $sf_objectElem = $('.shoufa_box .banner ul')
        var $sf_moveWidth = $('.shoufa .banner').width()
        var $sf_totalnum = 4
        var $sf_pagination = $('.shoufa .pagination span')
        lunbo($sf_triggerElem, $sf_objectElem, $sf_moveWidth, $sf_totalnum, $sf_pagination)
            // 点击页码标识
        paginationAnimate($sf_pagination, $sf_objectElem)
            // 精彩推荐================================
        arrowToggle($('.jingcai_box'))
        var $jc_triggerElem = $('.jingcai_box .arrow span')
        var $jc_objectElem = $('.jingcai_box .banner ul')
        var $jc_moveWidth = $('.jingcai .banner').width()
        var $jc_totalnum = 3
        var $jc_pagination = $('.jingcai .pagination span')
        lunbo($jc_triggerElem, $jc_objectElem, $jc_moveWidth, $jc_totalnum, $jc_pagination)
            // 点击页码标识
        paginationAnimate($jc_pagination, $jc_objectElem)
            //新碟首发====================
        arrowToggle($('.newdish_box'))
        var $nd_triggerElem = $('.newdish_box .arrow span')
        var $nd_objectElem = $('.newdish_box .banner ul')
        var $nd_moveWidth = $('.newdish .banner').width()
        var $nd_totalnum = 4
        var $nd_pagination = $('.newdish .pagination span')
        lunbo($nd_triggerElem, $nd_objectElem, $nd_moveWidth, $nd_totalnum, $nd_pagination)
            // 点击页码标识
        paginationAnimate($nd_pagination, $nd_objectElem)
    })
    //triggerElem 点击谁触发，有左右键，class为left,right
    //objectElem 谁要移动
    //moveWidth 每一次移动的距离
    //totalnum 一共有多少张
    //pagination页码标识集合
function lunbo(triggerElem, objectElem, moveWidth, totalnum, pagination) {
    var flag = true
    var i = 1
    triggerElem.on('click', function() {
        if (flag) {
            if ($(this).hasClass('right')) {
                i++
                if (i > totalnum + 1) {
                    i = 1
                    pagination.eq(i - 1).addClass('now').end().eq(i - 1).siblings().removeClass('now')
                    objectElem.css('left', '' + (-moveWidth) + 'px').animate({ 'left': -moveWidth * (i + 1) }, 500, 'linear', function() {
                        flag = true
                    })
                    return
                }
                pagination.eq(i - 1).addClass('now').end().eq(i - 1).siblings().removeClass('now')
                objectElem.animate({ 'left': -moveWidth * i }, 500, 'linear', function() {
                    flag = true
                })
            }
            if ($(this).hasClass('left')) {
                i--
                if (i < 0) {
                    i = totalnum
                    pagination.eq(i - 1).addClass('now').end().eq(i - 1).siblings().removeClass('now')
                    objectElem.css('left', '' + (-moveWidth * totalnum) + 'px').animate({ 'left': -moveWidth * (totalnum - 1) }, 500, 'linear', function() {
                        flag = true
                    })
                    return
                }
                pagination.eq(i - 1).addClass('now').end().eq(i - 1).siblings().removeClass('now')
                objectElem.animate({ 'left': -moveWidth * i }, 500, 'linear', function() {
                    flag = true
                })
            }
        }
    })
}
// 箭头的隐藏与出现
//moveElem 移动到谁身上触发
function arrowToggle(moveElem) {
    moveElem.on('mouseover', function() {
        $(this).find('.arrow .left').stop().animate({ left: -77 }, 100, 'linear')
        $(this).find('.arrow .right').stop().animate({ right: -77 }, 100, 'linear')
    })
    moveElem.on('mouseout', function() {
        $(this).find('.arrow .left').stop().animate({ left: -140 }, 100, 'linear')
        $(this).find('.arrow .right').stop().animate({ right: -140 }, 100, 'linear')
    })
}
//标识动画
//pagination页码标识集合
//objectElem 谁要移动
function paginationAnimate(pagination, objectElem) {
    pagination.on('click', function() {
        $(this).addClass('now')
        $(this).siblings().removeClass('now')
        var i = $(this).index() + 1
        objectElem.animate({ 'left': -1199 * i }, 500, 'linear')
    })
}
