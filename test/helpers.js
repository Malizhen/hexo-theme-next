// 此文件包含对工具函数的单元测试
define([
  'intern!object',
  'intern/chai!assert',
  'intern/order!source/js/src/utils.js' // 加载测试工具
], function (registerSuite, assert) {
  // 定义测试套件
  registerSuite({
    name: 'helpers',

    // 在每个测试开始前初始化环境
    beforeEach: function () {
      // 模拟浏览器对象
      window = {
        navigator: {
          userAgent: ''
        }
      };
      // 模拟屏幕信息
      screen = {
        width: 0
      };

      // 快速设置不同设备环境
      minic = {
        // 模拟桌面设备
        desktop: function (screenWidth) {
          window.navigator.userAgent = 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/43.0.2357.130 Safari/537.36';
          screen.width = screenWidth || 992;
        },
        // 模拟平板设备
        tablet: function (screenWidth) {
          window.navigator.userAgent = 'Mozilla/5.0 (iPad; CPU OS 4_3_5 like Mac OS X; en-us) AppleWebKit/533.17.9 (KHTML, like Gecko) Version/5.0.2 Mobile/8L1 Safari/6533.18.5';
          screen.width = screenWidth || 750;
        },
        // 模拟移动设备
        mobile: function (screenWidth) {
          window.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 8_0 like Mac OS X) AppleWebKit/600.1.3 (KHTML, like Gecko) Version/8.0 Mobile/12A4345d Safari/600.1.4';
          screen.width = screenWidth || 767;
        }
      };
    },

    // 检测是否为移动端浏览器
    '#hasMobileUA': {
      'should be true': function () {
        minic.mobile();
        assert.isTrue( hasMobileUA() );
        minic.tablet();
        assert.isTrue( hasMobileUA() );
      },

      'should be false': function () {
        minic.desktop();
        assert.isFalse( hasMobileUA() );
      }
    },


    // 判断是否为桌面端
    '#isDesktop': {
      'should be true': function () {
        minic.desktop(992);
        assert.isTrue( isDesktop() );

        minic.desktop(1200);
        assert.isTrue( isDesktop() );
      },
      'should be false': function () {
        minic.mobile();
        assert.isFalse( isDesktop() );

        minic.tablet(992);
        assert.isFalse( isDesktop() );
      }
    },

    // 判断是否为平板
    '#isTablet': {
      'should be true': function () {
        minic.tablet(900);
        assert.isTrue( isTablet() );

        minic.tablet(780);
        assert.isTrue( isTablet() );
      },
      'should be false': function () {
        minic.desktop(500);
        assert.isFalse( isTablet() );

        minic.tablet(1000);
        assert.isFalse( isTablet() );

        minic.tablet(500);
        assert.isFalse( isTablet() );
      }
    },

    // 判断是否为移动端
    '#isMobile': {
      'should be true': function () {
        minic.mobile();
        assert.isTrue( isMobile() );

        minic.mobile(700);
        assert.isTrue( isMobile() );
      },
      'should be false': function () {
        minic.desktop();
        assert.isFalse( isMobile() );

        minic.tablet();
        assert.isFalse( isMobile() );

        minic.mobile(1000);
        assert.isFalse( isMobile() );
      }
    },

    // 测试选择器转义函数
    '#escapeSelector': function () {
      var selectors = ['(something', '.something', '$something'];
      selectors.forEach(function (s) {
        assert.equal( escapeSelector(s), '\\' + s );
      });
    },

    // 展示侧边栏的函数（暂未实现测试）
    '#displaySidebar': function () {},

    // 判断主题是否为 Mist
    '#isMist': {
      beforeEach: function () {
        CONFIG = {
          scheme: ''
        };
      },
      'should be true': function () {
        CONFIG.scheme = 'Mist';
        assert.isTrue( isMist() );
      },
      'should be false': function () {
        CONFIG.scheme = 'Minimal';
        assert.isFalse( isMist() );
      }
    }

  });
});
