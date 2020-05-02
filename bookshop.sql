/*
Navicat MySQL Data Transfer

Source Server         : mysql
Source Server Version : 50528
Source Host           : localhost:3306
Source Database       : bookshop

Target Server Type    : MYSQL
Target Server Version : 50528
File Encoding         : 65001

Date: 2020-05-02 17:37:23
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_addresses
-- ----------------------------
DROP TABLE IF EXISTS `t_addresses`;
CREATE TABLE `t_addresses` (
  `id` varchar(50) NOT NULL,
  `address` varchar(255) DEFAULT NULL,
  `phone_number` varchar(255) DEFAULT NULL,
  `receiver` varchar(255) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL,
  `is_default` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_addresses
-- ----------------------------
INSERT INTO `t_addresses` VALUES ('2169e5c0-8a26-11ea-8b53-fdbe16dbe69f', '北京', '123123', '张三', '84bcdb00-87d3-11ea-a00d-d72091ed12fb', '1');
INSERT INTO `t_addresses` VALUES ('b303e2d0-8a29-11ea-84d0-638bad660eea', '北京', '13222222222', '掌机', '84bcdb00-87d3-11ea-a00d-d72091ed12fb', '0');
INSERT INTO `t_addresses` VALUES ('d79fc000-8aa1-11ea-80ed-8d3a9e5b36ab', '北京', '1231233221', '张三', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '1');
INSERT INTO `t_addresses` VALUES ('e3011c50-8aa1-11ea-80ed-8d3a9e5b36ab', '天津', '45652123212', '天津', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '0');

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
INSERT INTO `t_books` VALUES ('232-285f0-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('7a6f5bf0-8c42-11ea-a38b-b3c2ca76f603', '西游记', '讲述了师徒四人西天取经的股故事', '21.00', '23.00', '64be1350-8c42-11ea-a38b-b3c2ca76f603.jpg', '吴承恩', '清华出版社', '3', '2020-02-03', 'TR122', '小说', 'c86cb100-84a8-11ea-ace8-0965f77b9385', '现在下单反10元', '1', '2020-05-02 06:59:33', '0');
INSERT INTO `t_books` VALUES ('c9ec7af0-8c42-11ea-be3c-e9eeee3c35be', '我爱我你', '啊啊啊', '12.00', '12.00', 'c3718b70-8c42-11ea-be3c-e9eeee3c35be.jpg', '11', '1', '22', '2020-05-04', '22', '小说', 'c86cb100-84a8-11ea-ace8-0965f77b9385', '21', '1', '2020-05-02 07:01:47', '0');
INSERT INTO `t_books` VALUES ('d7f94830-8c42-11ea-be3c-e9eeee3c35be', '12我去', '驱蚊器无', '12.00', '12.00', 'cef5d910-8c42-11ea-be3c-e9eeee3c35be.jpg', '我', '去玩', '1', '2020-05-09', '驱蚊器', '小说', 'c86cb100-84a8-11ea-ace8-0965f77b9385', '1', '1', '2020-05-02 07:02:10', '0');
INSERT INTO `t_books` VALUES ('e2097fa0-212-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-285f0-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-285f0-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-54-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-76-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-767-11ea-9bc8-3', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
INSERT INTO `t_books` VALUES ('e2097fa0-85f0-11ea-9bc8-4d6231e080324', 'java高级程序设计', '一本神器的编程书籍', '21.00', '22.00', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '鲁迅', '清华', '2', '2020-04-09', 'YT-121', 'java', '1e143910-84aa-11ea-ace8-0965f77b9385', '今天下单，预计明天送到您手', '1', '2020-04-24 06:00:21', null);
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
INSERT INTO `t_carts` VALUES ('400e4870-8c58-11ea-8ca8-4dc9515aedca', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '1', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_carts` VALUES ('77707a90-8a23-11ea-b8f5-89d0c4120d5e', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '1', '84bcdb00-87d3-11ea-a00d-d72091ed12fb');
INSERT INTO `t_carts` VALUES ('7b0f2520-8a23-11ea-b8f5-89d0c4120d5e', '02e6cff0-86f2-11ea-b160-11d584c041e7', '1', '84bcdb00-87d3-11ea-a00d-d72091ed12fb');

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
INSERT INTO `t_chapters` VALUES ('297a1050-8c4c-11ea-b4c6-bfa80d3883d9', '121', '第一张', '', '');
INSERT INTO `t_chapters` VALUES ('313ebde0-8c4c-11ea-b4c6-bfa80d3883d9', '121', null, '<p>我是第一张的内容</p>', '297a1050-8c4c-11ea-b4c6-bfa80d3883d9');
INSERT INTO `t_chapters` VALUES ('35738df0-8c4c-11ea-b4c6-bfa80d3883d9', '121', null, '<p>第二节</p>', '297a1050-8c4c-11ea-b4c6-bfa80d3883d9');
INSERT INTO `t_chapters` VALUES ('38d137e0-8c4c-11ea-b4c6-bfa80d3883d9', '121', null, '<p>第三节</p>', '297a1050-8c4c-11ea-b4c6-bfa80d3883d9');

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
  `comment_order_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_comments
-- ----------------------------
INSERT INTO `t_comments` VALUES ('1', '不好1', '2020-04-08 00:00:00', '3', '张三', '12', '12', '', '12', null);
INSERT INTO `t_comments` VALUES ('11', '不好1', '2020-04-08 00:00:00', '3', '张三', '12', '12', '好', '12', null);
INSERT INTO `t_comments` VALUES ('aa1f02a0-8bb2-11ea-b12b-55515a17f88b', '还不错', '2020-05-01 13:50:06', '5', '小可爱', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '不错就好', 'java高级程序设计', 'd04f5d91-8b9d-11ea-b9f8-ef412176d14d');

-- ----------------------------
-- Table structure for t_likes
-- ----------------------------
DROP TABLE IF EXISTS `t_likes`;
CREATE TABLE `t_likes` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(255) DEFAULT NULL,
  `member_id` varchar(50) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_likes
-- ----------------------------
INSERT INTO `t_likes` VALUES ('173847e0-8acb-11ea-8571-6333ff01385a', '02e6cff0-86f2-11ea-b160-11d584c041e7', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_likes` VALUES ('182b3360-8acb-11ea-8571-6333ff01385a', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_likes` VALUES ('66f5b870-8bc1-11ea-b65a-710e29a192d5', '1632c520-85f1-11ea-9bc8-4d631e080324', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');

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
INSERT INTO `t_members` VALUES ('8ff8afe0-8881-11ea-835f-b73e5caaaadc', '123', '小可爱', '123212121', null, '0', '1', '18515385141');

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
  `order_address` varchar(255) DEFAULT NULL COMMENT '地址信息',
  `order_express` varchar(255) DEFAULT NULL COMMENT '快递信息',
  `order_number` varchar(100) DEFAULT NULL,
  `express_number` varchar(100) DEFAULT NULL,
  `order_cancel_reason` varchar(255) NOT NULL COMMENT '取消订单原因',
  `return_express_number` varchar(100) DEFAULT NULL COMMENT '退货物流快递单号',
  `return_express` varchar(255) DEFAULT NULL COMMENT '退货快递公司',
  `order_delete` varchar(2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_orders
-- ----------------------------
INSERT INTO `t_orders` VALUES ('31fa7311-8aa7-11ea-86ea-6fa2334c82b7', '618.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-04-30 05:55:29', '1', 'undefined,undefined,undefined收', '', '31fa7310-8aa7-11ea-86ea-6fa2334c82b7', '', '', '', '', null);
INSERT INTO `t_orders` VALUES ('42f39f11-8b9d-11ea-b9f8-ef412176d14d', '828.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-05-01 11:16:53', '7', '北京,1231233221,张三收', '顺丰', '42f39f10-8b9d-11ea-b9f8-ef412176d14d', '1231212', '', '', '', null);
INSERT INTO `t_orders` VALUES ('4bbf3551-8b9d-11ea-b9f8-ef412176d14d', '828.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-05-01 11:17:08', '5', '北京,1231233221,张三收', '', '4bbf3550-8b9d-11ea-b9f8-ef412176d14d', '', '', '', '', null);
INSERT INTO `t_orders` VALUES ('519c49f1-8aa7-11ea-86ea-6fa2334c82b7', '618.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-04-30 05:56:22', '9', '北京,1231233221,张三收', '顺丰', '519c49f0-8aa7-11ea-86ea-6fa2334c82b7', '121212121212', '', '', '', null);
INSERT INTO `t_orders` VALUES ('6b2dc731-8b9d-11ea-b9f8-ef412176d14d', '828.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-05-01 11:18:01', '7', '北京,1231233221,张三收', '', '6b2dc730-8b9d-11ea-b9f8-ef412176d14d', '', '不好', '', '', null);
INSERT INTO `t_orders` VALUES ('d04f5d91-8b9d-11ea-b9f8-ef412176d14d', '828.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-05-01 11:20:50', '4', '北京,1231233221,张三收', '', 'd04f5d90-8b9d-11ea-b9f8-ef412176d14d', '', '', '', '', null);
INSERT INTO `t_orders` VALUES ('f2d1c481-8bb0-11ea-b1a0-214101830534', '42.00', '8ff8afe0-8881-11ea-835f-b73e5caaaadc', '小可爱', '2020-05-01 13:37:49', '9', '北京,1231233221,张三收', '韵达', 'f2d1c480-8bb0-11ea-b1a0-214101830534', '123456', '不想要了', '2345678', '顺丰', '');

-- ----------------------------
-- Table structure for t_order_books
-- ----------------------------
DROP TABLE IF EXISTS `t_order_books`;
CREATE TABLE `t_order_books` (
  `id` varchar(50) NOT NULL,
  `book_id` varchar(50) DEFAULT NULL,
  `buy_num` int(11) DEFAULT NULL,
  `book_name` varchar(255) DEFAULT NULL,
  `book_img` varchar(255) DEFAULT NULL,
  `book_price` decimal(10,2) DEFAULT NULL,
  `order_number` varchar(50) DEFAULT NULL,
  `price_total` decimal(10,2) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order_books
-- ----------------------------
INSERT INTO `t_order_books` VALUES ('32048530-8aa7-11ea-86ea-6fa2334c82b7', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', '31fa7310-8aa7-11ea-86ea-6fa2334c82b7', '608.00');
INSERT INTO `t_order_books` VALUES ('42f573d0-8b9d-11ea-b9f8-ef412176d14d', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', '42f39f10-8b9d-11ea-b9f8-ef412176d14d', '608.00');
INSERT INTO `t_order_books` VALUES ('42f59ae0-8b9d-11ea-b9f8-ef412176d14d', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '10', 'java高级程序设计', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '21.00', '42f39f10-8b9d-11ea-b9f8-ef412176d14d', '210.00');
INSERT INTO `t_order_books` VALUES ('4bbfd190-8b9d-11ea-b9f8-ef412176d14d', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', '4bbf3550-8b9d-11ea-b9f8-ef412176d14d', '608.00');
INSERT INTO `t_order_books` VALUES ('4bbff8a0-8b9d-11ea-b9f8-ef412176d14d', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '10', 'java高级程序设计', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '21.00', '4bbf3550-8b9d-11ea-b9f8-ef412176d14d', '210.00');
INSERT INTO `t_order_books` VALUES ('51acebc0-8aa7-11ea-86ea-6fa2334c82b7', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', '519c49f0-8aa7-11ea-86ea-6fa2334c82b7', '608.00');
INSERT INTO `t_order_books` VALUES ('6b2f26c0-8b9d-11ea-b9f8-ef412176d14d', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', '6b2dc730-8b9d-11ea-b9f8-ef412176d14d', '608.00');
INSERT INTO `t_order_books` VALUES ('6b2f26c1-8b9d-11ea-b9f8-ef412176d14d', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '10', 'java高级程序设计', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '21.00', '6b2dc730-8b9d-11ea-b9f8-ef412176d14d', '210.00');
INSERT INTO `t_order_books` VALUES ('d04ff9d0-8b9d-11ea-b9f8-ef412176d14d', '02e6cff0-86f2-11ea-b160-11d584c041e7', '19', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', 'd04f5d90-8b9d-11ea-b9f8-ef412176d14d', '608.00');
INSERT INTO `t_order_books` VALUES ('d05020e0-8b9d-11ea-b9f8-ef412176d14d', 'e2097fa0-85f0-11ea-9bc8-4d631e080324', '10', 'java高级程序设计', '7a659ed0-862a-11ea-aee4-6d45bffdf750.jpg', '21.00', 'd04f5d90-8b9d-11ea-b9f8-ef412176d14d', '210.00');
INSERT INTO `t_order_books` VALUES ('f2d2aee0-8bb0-11ea-b1a0-214101830534', '02e6cff0-86f2-11ea-b160-11d584c041e7', '1', 'js高级', 'ed08aaf0-86f1-11ea-b160-11d584c041e7.png', '32.00', 'f2d1c480-8bb0-11ea-b1a0-214101830534', '32.00');

-- ----------------------------
-- Table structure for t_order_records
-- ----------------------------
DROP TABLE IF EXISTS `t_order_records`;
CREATE TABLE `t_order_records` (
  `id` varchar(50) NOT NULL,
  `record` varchar(255) DEFAULT NULL,
  `record_time` datetime DEFAULT NULL,
  `order_id` varchar(50) DEFAULT NULL,
  `record_user` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_order_records
-- ----------------------------
INSERT INTO `t_order_records` VALUES ('12dc04b0-8bb2-11ea-b12b-55515a17f88b', '已收货', '2020-05-01 13:45:52', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('13601b10-8bad-11ea-bdbd-01509faf1741', '申请退货并退款', '2020-05-01 13:10:05', '6b2dc731-8b9d-11ea-b9f8-ef412176d14d', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('23a49690-8bb2-11ea-b12b-55515a17f88b', '申请退货并退款', '2020-05-01 13:46:20', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('2a5478c0-8bb2-11ea-b12b-55515a17f88b', '申请退单成功', '2020-05-01 13:46:31', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '管理员');
INSERT INTO `t_order_records` VALUES ('32048531-8aa7-11ea-86ea-6fa2334c82b7', '创建订单', '2020-04-30 05:55:29', '31fa7311-8aa7-11ea-86ea-6fa2334c82b7', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('32d99020-8bb2-11ea-b12b-55515a17f88b', '退货中', '2020-05-01 13:46:46', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('35ab9150-8bb1-11ea-b1a0-214101830534', '已发货', '2020-05-01 13:39:41', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '管理员');
INSERT INTO `t_order_records` VALUES ('37907ac0-8bad-11ea-bdbd-01509faf1741', '申请退单成功', '2020-05-01 13:11:06', '6b2dc731-8b9d-11ea-b9f8-ef412176d14d', '管理员');
INSERT INTO `t_order_records` VALUES ('3ec7c320-8bb2-11ea-b12b-55515a17f88b', '已完成', '2020-05-01 13:47:06', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '管理员');
INSERT INTO `t_order_records` VALUES ('42f59ae1-8b9d-11ea-b9f8-ef412176d14d', '创建订单', '2020-05-01 11:16:53', '42f39f11-8b9d-11ea-b9f8-ef412176d14d', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('4bbff8a1-8b9d-11ea-b9f8-ef412176d14d', '创建订单', '2020-05-01 11:17:08', '4bbf3551-8b9d-11ea-b9f8-ef412176d14d', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('51acebc1-8aa7-11ea-86ea-6fa2334c82b7', '创建订单', '2020-04-30 05:56:22', '519c49f1-8aa7-11ea-86ea-6fa2334c82b7', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('6b2f4dd0-8b9d-11ea-b9f8-ef412176d14d', '创建订单', '2020-05-01 11:18:01', '6b2dc731-8b9d-11ea-b9f8-ef412176d14d', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('d05020e1-8b9d-11ea-b9f8-ef412176d14d', '创建订单', '2020-05-01 11:20:50', 'd04f5d91-8b9d-11ea-b9f8-ef412176d14d', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');
INSERT INTO `t_order_records` VALUES ('d226bb00-8bb0-11ea-b1a0-214101830534', '申请退单成功', '2020-05-01 13:36:54', '42f39f11-8b9d-11ea-b9f8-ef412176d14d', '管理员');
INSERT INTO `t_order_records` VALUES ('d625e4d0-8b9f-11ea-b9f8-ef412176d14d', '已发货', '2020-05-01 11:35:19', '42f39f11-8b9d-11ea-b9f8-ef412176d14d', '管理员');
INSERT INTO `t_order_records` VALUES ('ecff0420-8ab9-11ea-ad8f-3d5375cb2821', '已发货', '2020-04-30 08:09:33', '519c49f1-8aa7-11ea-86ea-6fa2334c82b7', '管理员');
INSERT INTO `t_order_records` VALUES ('f2d2aee1-8bb0-11ea-b1a0-214101830534', '创建订单', '2020-05-01 13:37:49', 'f2d1c481-8bb0-11ea-b1a0-214101830534', '8ff8afe0-8881-11ea-835f-b73e5caaaadc');

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
INSERT INTO `t_reads` VALUES ('121', '西游记', '吴承恩', '2020-04-01 00:00:00', '1', '29', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('232', '西游记', '吴承恩', '2020-04-01 00:00:00', '1', '1', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('343', '西游记', '吴承恩', '2020-04-01 00:00:00', '1', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('4e09f430-86b1-11ea-b100-6b0d232c6f30', '鬼吹灯少时诵诗书所所所所所所所所所所少时诵诗书首饰上', '天下霸唱', '2020-04-09 00:00:00', '1', '7', '一本关于盗墓的书籍', '460111b0-86b1-11ea-b100-6b0d232c6f30.png', '1');
INSERT INTO `t_reads` VALUES ('565', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('656', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-121-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-878-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-9ee17-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-9ee7-4', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-9ee7-545', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-11ea-9ee7-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('aed01020-86e7-qw9ee7-f5370f0e843c', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('df', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '3', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('ere', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('erewq', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');
INSERT INTO `t_reads` VALUES ('sds', '西游记', '吴承恩', '2020-04-01 00:00:00', '0', '0', '西天取经的故事', 'a963aa70-86e7-11ea-9ee7-f5370f0e843c.png', '1');

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
