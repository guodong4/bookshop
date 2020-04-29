/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : bookshop

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2020-04-29 18:32:21
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_address
-- ----------------------------
DROP TABLE IF EXISTS `t_address`;
CREATE TABLE `t_address` (
  `id` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL,
  `is_default` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_address
-- ----------------------------

-- ----------------------------
-- Table structure for t_ads
-- ----------------------------
DROP TABLE IF EXISTS `t_ads`;
CREATE TABLE `t_ads` (
  `id` varchar(50) NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  `type` varchar(2) DEFAULT NULL COMMENT '1 长图广告   2 小图广告',
  `desc` varchar(255) DEFAULT NULL COMMENT '广告描述',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_ads
-- ----------------------------
INSERT INTO `t_ads` VALUES ('f347b0b0-8632-11ea-8294-95087c904e0e', 'f165d150-8632-11ea-8294-95087c904e0e.jpg', 'www.baidu.com', '1', '1', '隔壁养猪场');

-- ----------------------------
-- Table structure for t_bookimgs
-- ----------------------------
DROP TABLE IF EXISTS `t_bookimgs`;
CREATE TABLE `t_bookimgs` (
  `id` varchar(50) NOT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `file_desc` varchar(255) DEFAULT NULL COMMENT '附件说明',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_bookimgs
-- ----------------------------

-- ----------------------------
-- Table structure for t_books
-- ----------------------------
DROP TABLE IF EXISTS `t_books`;
CREATE TABLE `t_books` (
  `id` varchar(50) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  `book_price` decimal(10,2) DEFAULT NULL,
  `book_old_price` decimal(10,2) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `book_author` varchar(255) DEFAULT NULL,
  `book_press` varchar(255) DEFAULT NULL COMMENT '出版社',
  `book_stock` int(11) DEFAULT NULL COMMENT '库存',
  `book_press_time` date DEFAULT NULL COMMENT '出版时间',
  `book_code` varchar(255) DEFAULT NULL COMMENT '商品编码',
  `book_type_text` varchar(255) DEFAULT NULL COMMENT '类型文字',
  `book_type` varchar(255) DEFAULT NULL COMMENT '图书类别',
  `book_remarks` varchar(255) DEFAULT NULL,
  `book_status` varchar(2) DEFAULT NULL COMMENT '上架状态',
  `book_publish_time` datetime DEFAULT NULL,
  `seller_num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_books
-- ----------------------------
INSERT INTO `t_books` VALUES ('02e6cff0-86f2-11ea-b160-11d584c041e7', 'js高级', 'js前端', '32.00', '421.00', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '苏大', '负担', '1', '2020-04-15', 'SD2121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '下单送卢品', '1', '2020-04-25 12:40:57', null);
INSERT INTO `t_books` VALUES ('1632c520-85f1-11ea-9bc8-4d631e080324', '金瓶梅', '一本激情的书籍', '31.00', '33.00', '6ba33d30-862a-11ea-aee4-6d45bffdf750.png', '古龙', '北大', '1', '2020-04-23', 'UY-21', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '这几天下雨，发货时间可能会延迟3-5天', '1', '2020-04-24 10:01:49', null);
INSERT INTO `t_books` VALUES ('e2097fa0-85f0-11ea-9bc8-4d631e080324', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);

-- ----------------------------
-- Table structure for t_book_fileimgs
-- ----------------------------
DROP TABLE IF EXISTS `t_book_fileimgs`;
CREATE TABLE `t_book_fileimgs` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `img_path` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_book_fileimgs
-- ----------------------------
INSERT INTO `t_book_fileimgs` VALUES ('299d4f50-8573-11ea-b4bd-9327e6b426d3', 'b49b70c0-855d-11ea-ab01-a1d986ad3197', '289d6b80-8573-11ea-b4bd-9327e6b426d3.jpg');
INSERT INTO `t_book_fileimgs` VALUES ('b38069f0-8875-11ea-a8c6-ddd767946584', '1632c520-85f1-11ea-9bc8-4d631e080324', 'b25ecd50-8875-11ea-a8c6-ddd767946584.png');
INSERT INTO `t_book_fileimgs` VALUES ('b38265c0-8875-11ea-a8c6-ddd767946584', '1632c520-85f1-11ea-9bc8-4d631e080324', 'b2631310-8875-11ea-a8c6-ddd767946584.png');
INSERT INTO `t_book_fileimgs` VALUES ('b3830200-8875-11ea-a8c6-ddd767946584', '1632c520-85f1-11ea-9bc8-4d631e080324', 'b2716af0-8875-11ea-a8c6-ddd767946584.png');
INSERT INTO `t_book_fileimgs` VALUES ('b3835020-8875-11ea-a8c6-ddd767946584', '1632c520-85f1-11ea-9bc8-4d631e080324', 'b273dbf0-8875-11ea-a8c6-ddd767946584.png');

-- ----------------------------
-- Table structure for t_book_types
-- ----------------------------
DROP TABLE IF EXISTS `t_book_types`;
CREATE TABLE `t_book_types` (
  `id` varchar(50) NOT NULL,
  `type` varchar(255) DEFAULT NULL,
  `parent` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_book_types
-- ----------------------------
INSERT INTO `t_book_types` VALUES ('1e143910-84aa-11ea-ace8-0965f77b9385', 'java', '38267cc0-84a8-11ea-ace8-0965f77b9385');
INSERT INTO `t_book_types` VALUES ('38267cc0-84a8-11ea-ace8-0965f77b9385', '编程', null);
INSERT INTO `t_book_types` VALUES ('41247e10-85ef-11ea-8212-e5cea0e27396', 'java', '141db2b0-85ef-11ea-8212-e5cea0e27396');
INSERT INTO `t_book_types` VALUES ('71ccb7d0-84aa-11ea-ace8-0965f77b9385', 'php', '38267cc0-84a8-11ea-ace8-0965f77b9385');
INSERT INTO `t_book_types` VALUES ('92841d60-84aa-11ea-ace8-0965f77b9385', 'node', '38267cc0-84a8-11ea-ace8-0965f77b9385');
INSERT INTO `t_book_types` VALUES ('c86cb100-84a8-11ea-ace8-0965f77b9385', '小说', null);

-- ----------------------------
-- Table structure for t_carts
-- ----------------------------
DROP TABLE IF EXISTS `t_carts`;
CREATE TABLE `t_carts` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `number` int(11) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_carts
-- ----------------------------
INSERT INTO `t_carts` VALUES ('1b2420e0-8882-11ea-835f-b73e5caaaadc', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_carts` VALUES ('eba15ce0-89dd-11ea-8f01-c9e7a0d210b4', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '2', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');

-- ----------------------------
-- Table structure for t_chapters
-- ----------------------------
DROP TABLE IF EXISTS `t_chapters`;
CREATE TABLE `t_chapters` (
  `id` varchar(50) NOT NULL,
  `read_id` varchar(50) DEFAULT NULL,
  `chapter` varchar(255) DEFAULT NULL,
  `content` longtext,
  `parent` varchar(50) DEFAULT '',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_chapters
-- ----------------------------

-- ----------------------------
-- Table structure for t_comments
-- ----------------------------
DROP TABLE IF EXISTS `t_comments`;
CREATE TABLE `t_comments` (
  `id` varchar(50) NOT NULL,
  `comment` varchar(255) DEFAULT NULL,
  `comment_time` datetime DEFAULT NULL,
  `comment_star` int(10) DEFAULT NULL,
  `comment_member_name` varchar(255) DEFAULT NULL COMMENT '评论作者名',
  `comment_member_id` varchar(50) DEFAULT NULL COMMENT '评论作者id',
  `comment_book_id` varchar(50) DEFAULT NULL,
  `comment_replay` varchar(255) DEFAULT NULL COMMENT '回复',
  `comment_book_name` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_comments
-- ----------------------------
INSERT INTO `t_comments` VALUES ('1', '不好1', '2020-04-08 00:00:00', '3', '张三', '12', '12', '', '12');
INSERT INTO `t_comments` VALUES ('11', '不好1', '2020-04-08 00:00:00', '3', '张三', '12', '12', '好', '12');

-- ----------------------------
-- Table structure for t_like
-- ----------------------------
DROP TABLE IF EXISTS `t_like`;
CREATE TABLE `t_like` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_like
-- ----------------------------
INSERT INTO `t_like` VALUES ('1b2420e0-8882-11ea-835f-b73e5caaaadc', '02e6cff0-86f2-11ea-b160-11d584c041e7', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');

-- ----------------------------
-- Table structure for t_members
-- ----------------------------
DROP TABLE IF EXISTS `t_members`;
CREATE TABLE `t_members` (
  `id` varchar(50) NOT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `idcard` varchar(50) DEFAULT NULL,
  `birthday` date DEFAULT NULL,
  `sex` varchar(2) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL COMMENT '0 封号 1 正常',
  `telphone` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_members
-- ----------------------------
INSERT INTO `t_members` VALUES ('8ff8afe0-8881-11ea-835f-b73e5caaaadc', '123', '小可爱', '123212121', null, '0', null, '18515385141');

-- ----------------------------
-- Table structure for t_modules
-- ----------------------------
DROP TABLE IF EXISTS `t_modules`;
CREATE TABLE `t_modules` (
  `id` varchar(50) NOT NULL,
  `modulename` varchar(255) DEFAULT NULL,
  `parent` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_modules
-- ----------------------------
INSERT INTO `t_modules` VALUES ('1', '网站管理', null);
INSERT INTO `t_modules` VALUES ('1-1', '轮播图管理', '1');
INSERT INTO `t_modules` VALUES ('1-2', '今日特价', '1');
INSERT INTO `t_modules` VALUES ('1-3', '广告位', '1');
INSERT INTO `t_modules` VALUES ('2', '图书管理', null);
INSERT INTO `t_modules` VALUES ('3', '订单管理', null);
INSERT INTO `t_modules` VALUES ('4', '评论管理', null);
INSERT INTO `t_modules` VALUES ('5', '会员管理', null);
INSERT INTO `t_modules` VALUES ('6', '系统管理', null);
INSERT INTO `t_modules` VALUES ('6-1', '管理员管理', '6');
INSERT INTO `t_modules` VALUES ('6-2', '修改密码', '6');
INSERT INTO `t_modules` VALUES ('7', '分类管理', null);
INSERT INTO `t_modules` VALUES ('8', '阅读管理', null);

-- ----------------------------
-- Table structure for t_orders
-- ----------------------------
DROP TABLE IF EXISTS `t_orders`;
CREATE TABLE `t_orders` (
  `id` varchar(50) NOT NULL,
  `order_price` decimal(10,2) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL COMMENT '用户ID',
  `member_name` varchar(255) DEFAULT NULL,
  `order_time` datetime DEFAULT NULL,
  `order_status` varchar(2) DEFAULT NULL,
  `order_address` varchar(50) DEFAULT NULL COMMENT '地址信息',
  `order_express` varchar(255) DEFAULT NULL COMMENT '快递信息',
  `order_number` varchar(100) DEFAULT NULL,
  `express_number` varchar(100) DEFAULT NULL,
  `order_cancel_reason` varchar(255) DEFAULT NULL COMMENT '取消订单原因',
  `return_express_number` varchar(100) DEFAULT NULL COMMENT '退货物流快递单号',
  `return_express` varchar(255) DEFAULT NULL COMMENT '退货快递公司',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_orders
-- ----------------------------

-- ----------------------------
-- Table structure for t_order_book
-- ----------------------------
DROP TABLE IF EXISTS `t_order_book`;
CREATE TABLE `t_order_book` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `buy_num` int(11) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `book_price` decimal(10,2) DEFAULT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `price_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order_book
-- ----------------------------

-- ----------------------------
-- Table structure for t_order_record
-- ----------------------------
DROP TABLE IF EXISTS `t_order_record`;
CREATE TABLE `t_order_record` (
  `id` varchar(50) NOT NULL,
  `record` varchar(255) DEFAULT NULL,
  `record_time` datetime DEFAULT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `record_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order_record
-- ----------------------------

-- ----------------------------
-- Table structure for t_reads
-- ----------------------------
DROP TABLE IF EXISTS `t_reads`;
CREATE TABLE `t_reads` (
  `id` varchar(50) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `author` varchar(50) DEFAULT NULL,
  `publish_time` datetime DEFAULT NULL,
  `type` varchar(2) DEFAULT NULL COMMENT '0 游客  1 会员 ',
  `read_num` int(11) DEFAULT NULL COMMENT '点击量',
  `desc` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_reads
-- ----------------------------
INSERT INTO `t_reads` VALUES ('4e09f430-86b1-11ea-b100-6b0d232c6f30', '鬼吹灯', '天下霸唱', '2020-04-09 00:00:00', '0', '0', '一本关于盗墓的书籍', '460111b0-86b1-11ea-b100-6b0d232c6f30.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-9ee7-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', null);

-- ----------------------------
-- Table structure for t_swoings
-- ----------------------------
DROP TABLE IF EXISTS `t_swoings`;
CREATE TABLE `t_swoings` (
  `id` varchar(50) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `banner_img` varchar(255) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_swoings
-- ----------------------------
INSERT INTO `t_swoings` VALUES ('26f82200-870a-11ea-8a6f-d7cd3c4b10bb', 'java高级程序设计', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '25050490-870a-11ea-8a6f-d7cd3c4b10bb.png', '1', '一本神器的编程书籍');
INSERT INTO `t_swoings` VALUES ('92ee6be0-85f2-11ea-8384-1f06e02d063d', '金瓶梅', '1632c520-85f1-11ea-9bc8-4d631e080324', '5ce1c3e0-8704-11ea-b9b9-75a074b11c8b.png', '1', '一本激情的书籍');

-- ----------------------------
-- Table structure for t_today_specials
-- ----------------------------
DROP TABLE IF EXISTS `t_today_specials`;
CREATE TABLE `t_today_specials` (
  `id` varchar(50) NOT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `status` varchar(2) DEFAULT NULL,
  `book_desc` varchar(255) DEFAULT NULL,
  `book_price` decimal(10,2) DEFAULT NULL,
  `book_old_price` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_today_specials
-- ----------------------------
INSERT INTO `t_today_specials` VALUES ('49e30190-8787-11ea-89ae-d32698359435', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '02e6cff0-86f2-11ea-b160-11d584c041e7', '1', 'js前端', '32.00', '421.00');
INSERT INTO `t_today_specials` VALUES ('4d8c8190-8787-11ea-89ae-d32698359435', 'java高级程序设计', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '1', '一本神器的编程书籍', '21.00', '22.00');
INSERT INTO `t_today_specials` VALUES ('56c99e50-8787-11ea-89ae-d32698359435', '金瓶梅', '6ba33d30-862a-11ea-aee4-6d45bffdf750.png', '1632c520-85f1-11ea-9bc8-4d631e080324', '1', '一本激情的书籍', '31.00', '33.00');
INSERT INTO `t_today_specials` VALUES ('5b4c4040-8787-11ea-89ae-d32698359435', '金瓶梅', '6ba33d30-862a-11ea-aee4-6d45bffdf750.png', '1632c520-85f1-11ea-9bc8-4d631e080324', '0', '一本激情的书籍', '31.00', '33.00');
INSERT INTO `t_today_specials` VALUES ('c6344000-8783-11ea-8695-0d244ee2e194', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '02e6cff0-86f2-11ea-b160-11d584c041e7', '1', 'js前端', '32.00', '421.00');

-- ----------------------------
-- Table structure for t_users
-- ----------------------------
DROP TABLE IF EXISTS `t_users`;
CREATE TABLE `t_users` (
  `id` varchar(50) NOT NULL,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `nickname` varchar(255) DEFAULT NULL,
  `age` varchar(11) DEFAULT NULL,
  `telphone` varchar(255) DEFAULT NULL,
  `systemrule` varchar(255) DEFAULT NULL COMMENT '系统权限',
  `idcard` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_users
-- ----------------------------
INSERT INTO `t_users` VALUES ('1', 'admin', '123', '张三', '12', '1222211', '2,3,4,5,6,6-1,6-2,1,1-1,1-2,1-3,7', '12121');
INSERT INTO `t_users` VALUES ('2d54d290-8211-11ea-b348-455da8f7ea11', 'system', '123', '李四', '11', '13111111111', '1,1-1,1-2,1-3,2,3,4,5,6,6-1,6-2,7,8', '121221198902111122');
INSERT INTO `t_users` VALUES ('65d43650-8212-11ea-8b1f-d1d1dc03ba87', 'super', '123', '王五', '', '13333333333', '1,1-1,1-2,1-3', '141331188812111221');
