drop database if exists yourseasons;
create database yourseasons;
use yourseasons;

create table best_color_set
(
    best_color_set_id  bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    color_set_id       bigint,
    primary key (best_color_set_id)
);

create table closed_day
(
    closed_day_id      bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    date               date    not null,
    consultant_id      bigint,
    primary key (closed_day_id)
);

create table color
(
    color_id           bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean      not null,
    last_modified_date timestamp,
    hex                varchar(255) not null,
    tone_id            bigint       not null,
    primary key (color_id)
);

create table color_color_set
(
    color_color_set_id bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    color_id           bigint,
    color_set_id       bigint,
    primary key (color_color_set_id)
);

create table color_set
(
    color_set_id       bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    primary key (color_set_id)
);

create table consultant
(
    consultant_id      bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean      not null,
    last_modified_date timestamp,
    birth              date         not null,
    contact            varchar(13)  not null,
    email              varchar(255) not null,
    image_url          varchar(255),
    name               varchar(20)  not null,
    nickname           varchar(10)  not null,
    password           varchar(255) not null,
    consulting_count   integer      not null,
    consulting_file    varchar(255),
    cost               integer      not null,
    introduction       varchar(255),
    license_number     varchar(255) not null,
    review_count       integer      not null,
    star_average       double       not null,
    license_id         bigint       not null,
    primary key (consultant_id)
);

create table consulting
(
    consulting_id        bigint auto_increment
,
    created_date         timestamp,
    deleted_date         timestamp,
    is_active            boolean      not null,
    last_modified_date   timestamp,
    has_review           boolean      not null,
    session_id           varchar(255) not null,
    consultant_id        bigint,
    consulting_result_id bigint,
    customer_id          bigint,
    primary key (consulting_id)
);

create table consulting_result
(
    consulting_result_id bigint auto_increment
,
    created_date         timestamp,
    deleted_date         timestamp,
    is_active            boolean not null,
    last_modified_date   timestamp,
    consulting_comment   varchar(255),
    consulting_file      varchar(255),
    best_color_set_id    bigint,
    tone_id              bigint,
    worst_color_set_id   bigint,
    primary key (consulting_result_id)
);

create table customer
(
    customer_id        bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean      not null,
    last_modified_date timestamp,
    birth              date         not null,
    contact            varchar(13)  not null,
    email              varchar(255) not null,
    image_url          varchar(255),
    name               varchar(20)  not null,
    nickname           varchar(10)  not null,
    password           varchar(255) not null,
    primary key (customer_id)
);

create table license
(
    license_id         bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    name               varchar(255),
    primary key (license_id)
);

create table percentage
(
    percentage_id             bigint auto_increment
,
    created_date              timestamp,
    deleted_date              timestamp,
    is_active                 boolean not null,
    last_modified_date        timestamp,
    percentage                integer not null,
    self_consulting_result_id bigint,
    tone_id                   bigint,
    primary key (percentage_id)
);

create table reservation
(
    reservation_id     bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    date               date    not null,
    request            varchar(255),
    time               time    not null,
    consultant_id      bigint,
    customer_id        bigint,
    primary key (reservation_id)
);

create table review
(
    review_id          bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    comment            varchar(255),
    star               integer not null,
    consultant_id      bigint,
    consulting_id      bigint,
    customer_id        bigint,
    primary key (review_id)
);

create table self_consulting
(
    self_consulting_id        bigint auto_increment
,
    created_date              timestamp,
    deleted_date              timestamp,
    is_active                 boolean not null,
    last_modified_date        timestamp,
    session_id                varchar(255),
    customer_id               bigint,
    self_consulting_result_id bigint,
    primary key (self_consulting_id)
);

create table self_consulting_result
(
    self_consulting_result_id bigint auto_increment
,
    created_date              timestamp,
    deleted_date              timestamp,
    is_active                 boolean not null,
    last_modified_date        timestamp,
    best_color_set_id         bigint,
    tone_id                   bigint,
    worst_color_set_id        bigint,
    primary key (self_consulting_result_id)
);

create table tone
(
    tone_id            bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean      not null,
    last_modified_date timestamp,
    name               varchar(255) not null,
    primary key (tone_id)
);

create table worst_color_set
(
    worst_color_set_id bigint auto_increment
,
    created_date       timestamp,
    deleted_date       timestamp,
    is_active          boolean not null,
    last_modified_date timestamp,
    color_set_id       bigint,
    primary key (worst_color_set_id)
);

alter table best_color_set
    add constraint FKaljur5sqpv6xggw2kb3xq20j2
        foreign key (color_set_id)
            references color_set (color_set_id);

alter table closed_day
    add constraint FK77p6pltbghlcj899ygi51aw6f
        foreign key (consultant_id)
            references consultant (consultant_id);

alter table color
    add constraint FKetiu5d3jswcrcdkcp9ewodcx6
        foreign key (tone_id)
            references tone (tone_id);

alter table color_color_set
    add constraint FK5rp0rsaxu0uhtghyiewcotfvg
        foreign key (color_id)
            references color (color_id);

alter table color_color_set
    add constraint FKydxl5ge57nj0icfq9no66ga0
        foreign key (color_set_id)
            references color_set (color_set_id);

alter table consultant
    add constraint FK595qx6ti33l8xbmcdoa95gwoj
        foreign key (license_id)
            references license (license_id);

alter table consulting
    add constraint FK8n0r58ytiq56b4gur4ciif51v
        foreign key (consultant_id)
            references consultant (consultant_id);

alter table consulting
    add constraint FKhphv8gpxexqqns44aged2ccfj
        foreign key (consulting_result_id)
            references consulting_result (consulting_result_id);

alter table consulting
    add constraint FKqm57lbg32xdqe2xvx5q6db23d
        foreign key (customer_id)
            references customer (customer_id);

alter table consulting_result
    add constraint FKiys7egpencj9oktn720eeqc5o
        foreign key (best_color_set_id)
            references best_color_set (best_color_set_id);

alter table consulting_result
    add constraint FKry2ymddkfm5cj1yrd3cvurgk9
        foreign key (tone_id)
            references tone (tone_id);

alter table consulting_result
    add constraint FKh2nju2ayh08a1awh8fmo35wlg
        foreign key (worst_color_set_id)
            references worst_color_set (worst_color_set_id);

alter table percentage
    add constraint FKdclog3qd59eif860sprmdbtlc
        foreign key (self_consulting_result_id)
            references self_consulting_result (self_consulting_result_id);

alter table percentage
    add constraint FK634foggfmsg0namn97barb5b6
        foreign key (tone_id)
            references tone (tone_id);

alter table reservation
    add constraint FKht3kul1nsfswx3xalirmiyx48
        foreign key (consultant_id)
            references consultant (consultant_id);

alter table reservation
    add constraint FK41v6ueo0hiran65w8y1cta2c2
        foreign key (customer_id)
            references customer (customer_id);

alter table review
    add constraint FKdptf33snf2adt859n8r3x48r0
        foreign key (consultant_id)
            references consultant (consultant_id);

alter table review
    add constraint FKj9jafw5xjx9pfpigblrcjufqk
        foreign key (consulting_id)
            references consulting (consulting_id);

alter table review
    add constraint FKgce54o0p6uugoc2tev4awewly
        foreign key (customer_id)
            references customer (customer_id);

alter table self_consulting
    add constraint FKegglj2kmixn79s8kbkkwed22x
        foreign key (customer_id)
            references customer (customer_id);

alter table self_consulting
    add constraint FK1jotuyiqj0tpay9ct59folt6u
        foreign key (self_consulting_result_id)
            references self_consulting_result (self_consulting_result_id);

alter table self_consulting_result
    add constraint FKof3d9xv7072v6cm691qxff5t0
        foreign key (best_color_set_id)
            references best_color_set (best_color_set_id);

alter table self_consulting_result
    add constraint FKf46hv5dfda3m316op0hauo9ie
        foreign key (tone_id)
            references tone (tone_id);

alter table self_consulting_result
    add constraint FKlshic35ncb6v7udahswi3tpfx
        foreign key (worst_color_set_id)
            references worst_color_set (worst_color_set_id);

alter table worst_color_set
    add constraint FKee5rv6go7va96swdb9d26shbl
        foreign key (color_set_id)
            references color_set (color_set_id);

-- 고객
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-01 22:00:00', '2022-07-01 22:00:00', '/images/default/avatar20.png', 'ssafy12@naver.com', '$2a$10$Wo4tufbWPSbs4//LlQYg4OZJTxGK0D2NX6Ys6OwWvNziIMVwRLRmi', '전수빈', '1994-08-31', '전수빈', '010-1111-1111', 1); -- 비밀번호 1234
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-03 22:00:00', '2022-07-03 22:00:00', '/images/default/avatar22.png', 'hello99@naver.com', '$2a$10$kjUmmqHBaGSehVcsy6Ikmu99gIj3P0CnhaOBrZ6vcSmL0.O50HegG', '전지수', '1999-02-05', '전지수', '010-2222-2222', 1); -- 비밀번호 hi1234
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-06 22:00:00', '2022-07-06 22:00:00', '/images/default/avatar30.png', 'ansi@ssafy.com', '$2a$10$9Hf028.NDOlrPslwfQwaT.4rRWWLUvbNNLSEIMUFfGi.h7qbftAyq', '김지수', '1992-07-22', '김지수', '010-9999-9999', 1);  -- 비밀번호 ansi1212
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-08 22:00:00', '2022-07-08 22:00:00', '/images/default/avatar32.png', 'ysgwon@naver.com', '$2a$10$YiTBk/9ZU8MF.wvdW02ATOWOLdYduYe3wW73kRsr9L/Bjpc/WUoJK', '권예슬', '1992-07-22', '권예슬', '010-1111-1111', 1);  -- 비밀번호 asdfasdf
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar09.png', 'ahyeonJ@gmail.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '정아현', '1999-01-01', '정아현', '010-2222-2222', 1);  -- 비밀번호 useruser

insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar26.png', 'park@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '박성현', '1999-01-01', '박성현', '010-3333-3333', 1);  -- 비밀번호 useruser
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar29.png', 'jeong@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '박정현', '1999-01-01', '박정현', '010-4444-4444', 1);  -- 비밀번호 useruser
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar21.png', 'win@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '이긴호', '1999-01-01', '이긴호', '010-3333-3333', 1);  -- 비밀번호 useruser
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar13.png', 'hyoek@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '박준혁', '1999-01-01', '박준혁', '010-3333-3333', 1);  -- 비밀번호 useruser
insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar19.png', 'seo@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '박서은', '1999-01-01', '박서은', '010-3333-3333', 1);  -- 비밀번호 useruser

insert into customer(created_date, last_modified_date, image_url, email, password, name, birth, nickname, contact, is_active) values ('2022-07-10 22:00:00', '2022-07-10 22:00:00', '/images/default/avatar22.png', 'yuji@naver.com', '$2a$10$JASiZGS6dP.iFMBO7ckNqusv2LSUXnfJQ5GE2x3MePMpayFs9Y47W', '성유지', '1999-01-01', '성유지', '010-3333-3333', 1);  -- 비밀번호 useruser

-- 자격증
insert into license(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '컬러리스트산업기사', 1);
insert into license(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '컬러리스트기사', 1);
insert into license(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', 'NPO 국제 퍼스널컬러', 1);
insert into license(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', 'NCNS 퍼스널컬러', 1);
insert into license(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '퍼스널컬러코디네이터', 1);

-- 컨설턴트
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', 'bestcon@gmail.com', '$2a$10$rgj2kAIxW60uphgR/rJRROVuuWJw6vJTERDFHQuQKWTcJu4KNvNmu', '솜상진', '1994-08-30', '솜상진', '010-3231-8412', '안녕하세요, 모든 연예인의 퍼스널 컬러를 꿰뚫고 있는 솜상진 컨설턴트입니다!', 50000, 4.5, 6, 6, '/images/default/avatar01.png', 1, '1234', 1);  -- 비밀번호 1234
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-22 22:00:00', '2022-06-22 22:00:00', 'anjolryeo@gmail.com', '$2a$10$qyKQQEKVRiluruNO4wqU1.N/XvvrXi8ySYmhDj0eon.1rP18GgvGK', '박태이', '1994-08-31', '박태이', '010-6486-4928', 'MZ 킬러 박태이 컨설턴트입니다! 제가 여러분의 메이크업, 코디 모두 책임질게요!', 40000, 4.0, 1, 2, '/images/default/avatar03.png', 2, '5678AW132', 1); -- 비밀번호 an0000
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-28 22:00:00', '2022-06-28 22:00:00', 'consultant@gmail.com', '$2a$10$zAp1/9nXSHE7/T/5u/uY4OR/qwKdpALgp68g8CnkpJy2NKaoxE8QO', '이상우', '1995-11-01', '이상우', '010-1111-1111', '여러분 퍼스널컬러 진단은 꼭 저에게 받으셔야 해요! 제가 패션 테러리스트 전현무의 퍼스널 컬러를 알아냈습니다!', 80000, 3.0, 1, 1, '/images/default/avatar02.png', 3, 'AT5AW132', 1); -- 비밀번호 password
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'apple@gmail.com', '$2a$10$J51/ObConUCCN2wqgR9ciu4CUPzTnaXMZqYA2vhXsOXl9jbc7ltdS', '한기철', '1993-03-03', '한기철', '010-5910-7340', '저는 고객님의 퍼스널 컬러를 꼭 알아내고자 하는 집! 요! 함!이 있습니다.', 100000, 4.0, 1, 1, '/images/default/avatar12.png', 4, '0000SEFS1', 1); -- 비밀번호 apple
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'hite@naver.com', '$2a$10$4H4T4Yb0dwTnsZ3/b5soZexDim.ZGII99E7Q6rXNuKMaUAzdxR//y', '안성진', '1992-07-22', '안성진', '010-3333-3333', '안녕하세요 저는 안성진 컨설턴트라고 합니다! 잘 부탁드립니다!', 30000, 3.0, 1, 1, '/images/default/avatar05.png', 1, 'Q12SEFD132SG5', 1); -- 비밀번호 asdfasdf

insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-28 22:00:00', '2022-06-28 22:00:00', 'eo@gmail.com', '$2a$10$zAp1/9nXSHE7/T/5u/uY4OR/qwKdpALgp68g8CnkpJy2NKaoxE8QO', '어정윤', '1995-11-01', '어정윤', '010-1234-1123', '우리 모두에겐 치명적인 매력이 있어요. 제가 그 매력 찾아드릴게요!', 50000, 3.0, 1, 1, '/images/default/avatar16.png', 3, 'AT5AW132', 1); -- 비밀번호 password
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-28 22:00:00', '2022-06-28 22:00:00', 'bean@gmail.com', '$2a$10$zAp1/9nXSHE7/T/5u/uY4OR/qwKdpALgp68g8CnkpJy2NKaoxE8QO', '박다빈', '1995-11-01', '박다빈', '010-1243-2342', '퍼스널 컬러계의 다이너마이트! 이제 여러분의 인기는 다이너마이트처럼 폭발할 거에요!', 80000, 3.0, 1, 1, '/images/default/avatar24.png', 3, 'AT5AW1252', 1); -- 비밀번호 password
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'con@naver.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '유현수', '1994-04-04', '유현수', '010-4444-4444', '저는 여러분의 브랜딩을 책임질 유현수 컨설턴트입니다! 저에게 컨설팅을 받으시면 절대 후회하지 않으실 거에요', 70000, 4.0, 1, 1, '/images/default/avatar01.png', 1, 'AG037BSE235', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'sin@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '신형식', '1994-05-05', '신형식', '010-5555-5555', '저는 버그를 잡듯 여러분의 퍼스널컬러를 잡아버리겠습니다!', 50000, 4.0, 1, 1, '/images/default/avatar07.png', 1, '1234ASDFSG', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'yong@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '정용기', '1994-05-05', '정용기', '010-6666-6666', '안녕하세요 정용기 컨설턴트입니다', 70000, 4.0, 1, 1, '/images/default/avatar31.png', 1, '1234ASDFSG2', 1); -- 비밀번호 useruser

insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'nam@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '남하영', '1994-05-05', '남하영', '010-7777-7777', '안녕하세요 남하영 컨설턴트입니다', 40000, 4.0, 1, 1, '/images/default/avatar09.png', 1, '1234ASDFSG3', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'sub@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '박동섭', '1994-05-05', '박동섭', '010-8888-8888', '안녕하세요 박동섭 컨설턴트입니다', 30000, 4.0, 1, 1, '/images/default/avatar10.png', 1, '1234ASDFSG4', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'jeong@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '정재윤', '1994-05-05', '정재윤', '010-9999-9999', '안녕하세요 정재윤 컨설턴트입니다', 40000, 4.0, 1, 1, '/images/default/avatar29.png', 1, '1234ASDFSG5', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'yun@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '김정윤', '1994-05-05', '김정윤', '010-1212-1212', '안녕하세요 김정윤 컨설턴트입니다', 100000, 4.0, 1, 1, '/images/default/avatar19.png', 1, '1234ASDFSG6', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'hyun@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '김현주', '1994-05-05', '김현주', '010-2323-2323', '안녕하세요 김현주 컨설턴트입니다', 90000, 3.0, 1, 1, '/images/default/avatar24.png', 1, '1234ASDFSG7', 1); -- 비밀번호 useruser

insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'hwan@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '황수환', '1994-05-05', '황수환', '010-3434-3434', '안녕하세요 황수환 컨설턴트입니다', 50000, 3.0, 1, 1, '/images/default/avatar13.png', 1, '1234ASDFSG8', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'park@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '박재현', '1994-05-05', '박재현', '010-4545-4545', '안녕하세요 박재현 컨설턴트입니다', 30000, 3.0, 1, 1, '/images/default/avatar15.png', 1, '1234ASDFSG9', 1); -- 비밀번호 useruser
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, image_url, license_id, license_number, is_active) values ('2022-06-29 22:00:00', '2022-06-29 22:00:00', 'minjeong@gmail.com', '$2a$10$AUYhLT2o//eFq8GFWV0RauQk1Z/hxsysp1eL6zSzwXgfouUM3cbPO', '유민정', '1994-05-05', '유민정', '010-5656-9999', '안녕하세요 유민정 컨설턴트입니다', 40000, 4.0, 1, 1, '/images/default/avatar11.png', 1, '1234ASDFSG5', 1); -- 비밀번호 useruser

-- 휴무일
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-07-30', 1, 1); -- bestcon의 휴무일
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-07-31', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-07', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-08', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-15', 1, 1);

insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-20', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-21', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-27', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-20 23:00:00', '2022-06-20 23:00:00', '2022-08-28', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-07-30', 2, 1); -- 안졸리나 졸리의 휴무일

insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-07-31', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-07', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-08', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-15', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-20', 2, 1);

insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-21', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-27', 2, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values ('2022-06-22 23:00:00', '2022-06-22 23:00:00', '2022-08-28', 2, 1);

-- 예약
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:00:00', '2022-08-12 14:00:00', '2022-08-18', '11:00:00', '저에게 맞는 화장품을 찾고 싶어요!', 1, 2, 2);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-18', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 2, 3);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-22', '18:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-23', '18:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-24', '18:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-25', '18:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-26', '18:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '13:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-29', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-30', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-30', '14:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-30', '15:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-30', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-30', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-31', '9:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-31', '10:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-31', '11:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-31', '16:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values ('2022-08-12 14:30:00', '2022-08-12 14:30:00', '2022-08-31', '17:00:00', '제게 맞는 화장품과 코디를 추천받고 싶습니다!', 1, 1, 1);

-- 톤
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '봄 브라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '봄 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '봄 라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '여름 라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '여름 트루', 1);

insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '여름 소프트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '가을 소프트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '가을 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '가을 다크', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '겨울 브라이트', 1);

insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '겨울 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '겨울 다크', 1);

-- 컬러
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FDF0B1', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F9C5C7', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B8D66A', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F85C49', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F44C2C', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F17E8B', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#EE3A50', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F16F8F', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#53C8E5', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#CB1F5F', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#0052C6', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F4A518', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3B8E45', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8063CD', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A8DDE1', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C4B8B9', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#368BEA', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FF9E1C', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D36CAE', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FEE9CF', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FFE4D1', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FCD5C3', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FCD2A0', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D8A07B', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#BCB5A3', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C2D558', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#88C76E', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3A7C3F', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#0E5E41', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#858D38', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F99686', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F76452', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#EF6260', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F13D58', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#EA2336', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#85A6EB', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#607FD9', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B488BD', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#7659AB', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#592A86', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FAE6DB', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F7BCAE', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FDA59B', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FBA2B8', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F2578F', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F9A688', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F4734B', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F1725F', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F03E3C', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F36072', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FCD667', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FDC66C', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FCA845', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B9D983', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#6DB359', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#88BEE4', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5B9ED5', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#71BCDC', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9089D7', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#4564BE', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#E5E3D7', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C1BFB3', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#847D77', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B1B7B7', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#7E959D', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#927879', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5A4D4D', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F5A8BA', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FD80A8', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#DD5885', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#90ACDB', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#38619F', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#155B8F', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1BA685', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#207E76', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9783C9', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#554880', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#84CAEC', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#6AB8E6', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5378BF', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#DCDACD', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D1CCC6', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A0A797', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#7F8177', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5B5851', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A4B1B7', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#798A9C', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#4F8794', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2E6E7A', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#42474D', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FFC3D7', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D68AA8', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B75C87', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#852F54', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#4B497B', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#64AACB', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#538DB3', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#346EA0', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9EA7D2', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#7C7FB2', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#DDDECC', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C7C5B9', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9C8F89', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#513D3F', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#413F40', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F4B9BD', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C48C8F', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B38285', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8C475E', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8B475E', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8892B5', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#596178', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#54495A', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#60947D', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#37574C', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#79BCC5', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#527A92', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2F4553', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#E3D99E', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D8CB87', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#E0DDCC', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C5C0AA', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B5B196', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#99968D', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#66635C', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#DDAA7A', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#957A5E', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#705743', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A9A781', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#85936F', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C45657', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A6474B', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#862A37', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#17635F', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1C3F29', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8792C0', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#55608E', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#184A73', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2E3352', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3C4446', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#E2D1B7', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D0C5B1', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#878974', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#AF9270', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#4B453E', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D7957B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A86354', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#854543', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#694E31', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#45282C', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D47E4B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B8463B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D22E35', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#872F2E', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3B2027', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#6F5F2D', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1E3628', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#453852', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1C7385', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1A4653', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C5BEB6', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#CFBBA3', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D3A87B', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B88E56', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C3795E', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8E9D5A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5F663D', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2B3228', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2B6654', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1D3C37', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9B3E49', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#6F282E', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#4A2129', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#BD334A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#743435', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#392934', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1C3432', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#22405A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#393027', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#252525', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#000000', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B9BFBD', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#151314', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2057A7', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1B305F', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#EC7CBE', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C64796', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#832A6A', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#602F67', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9B2849', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#52D4E1', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#B3E4DE', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D7D1ED', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3ED284', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1FA793', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#624D9A', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2F2F6D', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FDD2ED', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#857DC6', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5D95D0', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F4F3F8', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3B4346', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#0E0E0E', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2F2B5B', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#20418E', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F5D4DF', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#C7D5F0', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#A8E9EF', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FFC1E8', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#FE98DA', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#38C372', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#107B5D', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#116872', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F95C9D', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#D6384E', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#5E3579', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1D3049', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1C372E', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#562239', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#3A2230', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#F5F3F8', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#CE3257', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#E67EA1', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#8E3450', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#361F27', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9E2632', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#612429', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#321F23', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#1C6A98', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#144F63', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#9A67A0', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#542C51', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2A1D24', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#145A40', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#283025', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#302221', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#2C2131', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#17383F', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#22508E', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values ('2022-01-01 00:00:00', '2022-01-01 00:00:00', '#183B35', 1, 12); -- 겨울 다크

-- 컬러셋
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);

insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);

insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);

insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1);

-- 컬러컬러셋
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 121, 1);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 122, 1);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 123, 1);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 124, 1);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 125, 1);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 181, 2);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 182, 2);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 183, 2);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 184, 2);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 185, 2);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 126, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 127, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 128, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 129, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 130, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 101, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 102, 3);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 201, 4);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 202, 4);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 203, 4);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 1, 5);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 2, 5);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 3, 5);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 4, 5);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 5, 5);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 61, 6);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 62, 6);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 63, 6);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 64, 6);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 65, 6);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 186, 7);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 187, 7);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 188, 7);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 189, 7);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 190, 7);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 41, 8);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 42, 8);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 43, 8);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 44, 8);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 45, 8);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 206, 9);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 207, 9);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 208, 9);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 209, 9);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 210, 9);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 141, 10);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 142, 10);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 143, 10);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 144, 10);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 145, 10);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 46, 11);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 47, 11);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 48, 11);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 49, 11);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 50, 11);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 131, 12);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 132, 12);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 133, 12);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 134, 12);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 135, 12);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 46, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 48, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 50, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 51, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 52, 13);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 53, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 54, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 55, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 56, 13);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 57, 13);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 146, 14);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 147, 14);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 148, 14);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 149, 14);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 150, 14);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 111, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 112, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 113, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 114, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 115, 15);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 116, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 117, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 81, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 82, 15);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 83, 15);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 221, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 222, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 223, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 224, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 225, 16);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 226, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 227, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 228, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 229, 16);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 230, 16);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 91, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 92, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 93, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 94, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 95, 17);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 96, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 101, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 102, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 103, 17);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 104, 17);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 231, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 232, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 233, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 234, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 235, 18);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 236, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 237, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 238, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 239, 18);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 240, 18);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 81, 19);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 82, 19);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 83, 19);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 84, 19);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 85, 19);

insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 231, 20);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 232, 20);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 233, 20);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 234, 20);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 235, 20);

-- 베스트컬러셋
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 1);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 3);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 5);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 7);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 9);

insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 11);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 13);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 15);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 17);
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 19);

-- 워스트컬러셋
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', 1, 2);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', 1, 4);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', 1, 6);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', 1, 8);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', 1, 10);

insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', 1, 12);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', 1, 14);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 16);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 18);
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values ('2022-07-23 16:00:00', '2022-07-23 16:00:00', 1, 20);

-- 컨설턴트 진단결과
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-15 16:00:00', '2022-07-15 16:00:00', '가을 소프트 타입이어서 베이지나 아이보리색의 톤온톤 코디가 가장 잘 어울리실 거에요~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 1, 1, 7);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', '고객님은 여름 소프트까지 소화가능한 가을 소프트 타입이세요! 고명도 + 저채도의 톤이 가장 잘 맞아요!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 2, 2, 7);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-08-01 20:00:00', '2022-08-01 20:00:00', '고객님을 보면 봄날의 햇살이 생각나네요 봄 브라이트세요!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 3, 3, 1);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-10 14:00:00', '2022-07-10 14:00:00', '봉쥬르 고객님! 여태까지 웜톤인줄 아셨다구요? 아니에요 아니에요~ 고객님은 채도가 높은 색이 잘 어울리시는 겨울 브라이트 톤이세요! 이젠 맥 칠리 대신 맥 루비우 바르기로 약속!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-15 19:00:00', '2022-07-15 19:00:00', '봉쥬르님은 확실히 쿨톤이세요! 쨍한 색감이 잘 어울리시거든요! 제가 본 봉쥬르님의 톤은 겨울 트루이십니다! 봉쥬르님은 탁한 색감을 쓰시면 안돼요! 말린 장미 노노 MLBB 노노!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 5, 5, 11);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-13 20:00:00', '2022-07-13 20:00:00', '금발은 절대 하시면 안돼요! 오히려 노안이 될 수 있어요! 본연의 머리색을 그대로 유지하시는 게 베스트입니다!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 6, 6, 3);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 17:00:00', '2022-07-23 17:00:00', '그윽한 음영 메이크업보다는 핑크핑크한 메이크업이 잘 어울리세요! 치크는 크리니크의 멜론팝 추천드려요~!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 7, 7, 3);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', '가을 소프트하면 이성경이죠! 화장 세게 하지 마시고 음영 위주로만 하세요!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 1, 1, 7);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', '윤아나 아이유를 보면서 화장과 코디를 참고하시면 좋을 거에요!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 3, 3, 1);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', '고객님은 겨울 쿨톤 노노! 쿨톤이긴 하지만 여름 트루톤에요! 빨간 립스틱은 다 넣어두시고 핑크 립스틱 사기로 약속~!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 10, 10, 5);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-23 11:00:00', '2022-07-23 11:00:00', '고객님은 실버 악세서리 추천 드립니다~ 쿨톤이세요~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 14:00:00', '2022-07-24 14:00:00', '고객님은 코랄이 너무 잘 어울리세요~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 15:00:00', '2022-07-24 15:00:00', '밝은 코랄 분홍색이 너무 잘 어울리세요~ 취업사진 뒷 배경은 밝은 분홍색으로 픽스~!!!(찡긋)', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 16:00:00', '2022-07-24 16:00:00', '고객님의 퍼스널컬러는 봄브라이트시고, 특히 밝은 노란색이 너무너무 잘 어울리세요~!! 결혼식 부케는 채도가 높은 노란색으로 추천드립니다~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 17:00:00', '2022-07-24 17:00:00', '고객님의 헤어 색은 브라운보다는 애쉬 계열의 색이 훨씬 잘 어울리세요~ 다음에 헤어 컬러는 코토리베이지 어떠실까요?', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 18:00:00', '2022-07-24 18:00:00', '고객님! 고객님은 검은색 뿔테안경보다 투명한 흰색 뿔테가 훨씬 귀엽게 잘 어울리세요~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 쨍한 색이 엄청 잘 어울려요!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님의 퍼스널 컬러는 봄 브라이트 입니다. 봄 브라이트는 또렷하고 생기 있는 이미지가 강하며, 비비드한 고명도 고채도의 색채가 잘 어울리세요.', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 1, 2, 1);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '아이 메이크업은 연하게, 립을 돋보이게 오랜지와 핑크가 믹스된 컬러 립을 추천드립니다!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 3, 4, 2);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님의 퍼스널 컬러는 겨울 딥 입니다. 메인 컬러는 파랑색과 검은색이 정말 고급스럽게 잘 어울리세요!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 5, 6, 3);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 가을 딥 아니시구~ 여름 쿨 페일이세요~ 올 여름에는 퍼스널컬러에 맞게 채도가 낮은 파스텔 색은 어떠실까용~?!?!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 7, 8, 4);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '봄 라이트 타입으로 봄~여름에 옷 입기 제일 좋은 계절입니다! 표백된 것 같은 백색보다는 살짝 따뜻한 기운이 감도는 아이보리 새을 추천드려요! 소중한 후기 부탁드립니다~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 1, 4, 5);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님 대비감이 많지 않게 명도는 높으나 채도는 낮은 파스텔 계열이 정말 잘 어을리세요!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 6);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 쨍한 색이 엄청 잘 어울려요!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 7);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 다크한 색상이 정말 잘 어울리십니다~ 그윽한 음영 매이크업에 도전해서 섹시한 느낌을 살리시면 더 좋을 것 같습니다~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 8);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 비비드한 색이 엄청 잘 어울려요!! 이번 시즌의 핫한 컬러 보테가 그린에 도전해 보시는 것은 어떨까요?', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님의 웜톤 피부를 더 자연스럽고 세련되게 만들어줄 샤넬뷰티의 골드 언더톤 립&네일 추천드립니다~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 여름 브라이트 이세요. 취업사진 배경은 꼭 꼭 밝은 하늘색 약속해요! 이번에는 꼭 취뽀하시길 바랍니다~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '메이크업은 부드럽게~, 립을 돋보이게 코랄과 핑크가 믹스된 컬러 립을 추천드립니다!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);
insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님은 부드러운 코랄 색상이 엄청 잘 어울리세요!!', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);

insert into consulting_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-24 19:00:00', '2022-07-24 19:00:00', '고객님 가을 뮤트톤으로 옐로우 베이스와 회색의 조합 컬러 팔레트가 잘 어울리십니다. 찰떡 립으로는 맥의 27, 35번 립 추천드려용~', '/home/ubuntuimg/2022-08-18T14:19:51.627consulting results.jpg', 1, 4, 4, 10);

-- 컨설팅
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-15 15:00:00', '2022-07-15 16:00:00', '2022-07-15 16:00:00', 'bestcon-gmail-com', 1, 0, 1, 1, 1);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 10:00:00', '2022-07-23 11:00:00', '2022-07-23 11:00:00', 'anjolryeo-gmail-com', 1, 0, 1, 2, 2);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-08-01 19:00:00', '2022-08-01 20:00:00', '2022-08-01 20:00:00', 'consultant-gmail-com', 1, 0, 1, 3, 3);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-10 13:00:00', '2022-07-10 14:00:00', '2022-07-10 14:00:00', 'apple-gmail-com', 1, 0, 2, 4, 4);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-15 18:00:00', '2022-07-15 19:00:00', '2022-07-15 19:00:00', 'bestcon-gmail-com', 0, 0, 2, 1, 5);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-13 19:00:00', '2022-07-13 20:00:00', '2022-07-13 20:00:00', 'bestcon-gmail-com', 1, 0, 3, 1, 6);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 16:00:00', '2022-07-23 17:00:00', '2022-07-23 17:00:00', 'anjolryeo-gmail-com', 0, 0, 3, 2, 7);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 10:00:00', '2022-07-23 11:00:00', '2022-07-23 11:00:00', 'bestcon-gmail-com', 1, 0, 2, 1, 8);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 13:00:00', '2022-07-23 14:00:00', '2022-07-23 14:00:00', 'bestcon-gmail-com', 1, 0, 3, 1, 9);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 15:00:00', '2022-07-23 16:00:00', '2022-07-23 16:00:00', 'bestcon-gmail-com', 1, 0, 4, 1, 10);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-23 17:00:00', '2022-07-23 18:00:00', '2022-07-23 18:00:00', 'bestcon-gmail-com', 1, 0, 5, 1, 11);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 13:00:00', '2022-07-24 14:00:00', '2022-07-24 14:00:00', 'bestcon-gmail-com', 1, 0, 6, 1, 12);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 14:00:00', '2022-07-24 15:00:00', '2022-07-24 15:00:00', 'bestcon-gmail-com', 1, 0, 7, 1, 13);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 15:00:00', '2022-07-24 16:00:00', '2022-07-24 16:00:00', 'bestcon-gmail-com', 1, 0, 8, 1, 14);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 16:00:00', '2022-07-24 17:00:00', '2022-07-24 17:00:00', 'bestcon-gmail-com', 1, 0, 9, 1, 15);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 17:00:00', '2022-07-24 18:00:00', '2022-07-24 18:00:00', 'bestcon-gmail-com', 1, 0, 10, 1, 16);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-24 18:00:00', '2022-07-24 19:00:00', '2022-07-24 19:00:00', 'bestcon-gmail-com', 1, 0, 11, 1, 17);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'hite-naver-com', 1, 0, 1, 5, 18);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'eo-gmail-com', 1, 0, 2, 6, 19);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'bean-gmail-com', 1, 0, 3, 7, 20);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'con-naver-com', 1, 0, 4, 8, 21);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'sin-gmail-com', 1, 0, 5, 9, 22);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'yong-gmail-com', 1, 0, 6, 10, 23);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'nam-gmail-com', 1, 0, 7, 11, 24);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'sub-gmail-com', 1, 0, 8, 12, 25);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'jeong-gmail-com', 1, 0, 9, 13, 26);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'yun-gmail-com', 1, 0, 10, 14, 27);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-25 11:00:00', '2022-07-25 11:00:00', 'hyun-gmail-com', 1, 0, 11, 15, 28);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-26 11:00:00', '2022-07-26 11:00:00', 'hwan-gmail-com', 1, 0, 1, 16, 29);
insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-26 11:00:00', '2022-07-26 11:00:00', 'park-gamil-com', 1, 0, 2, 17, 30);

insert into consulting(created_date, last_modified_date, deleted_date, session_id, has_review, is_active, customer_id, consultant_id, consulting_result_id) values ('2022-07-25 10:00:00', '2022-07-26 11:00:00', '2022-07-26 11:00:00', 'minjeong-gmail-com', 1, 0, 3, 18, 31);

-- 자가 진단결과
insert into self_consulting_result(created_date, last_modified_date, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 8, 8, 6);
insert into self_consulting_result(created_date, last_modified_date, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 9, 9, 5);

-- 자가 진단
insert into self_consulting(created_date, last_modified_date, is_active, customer_id, self_consulting_result_id) values ('2022-07-10 22:00:00', '2022-07-10 22:20:00', 0, 1, 1);
insert into self_consulting(created_date, last_modified_date, is_active, customer_id, self_consulting_result_id) values ('2022-07-30 22:00:00', '2022-07-30 22:20:00', 0, 1, 2);

-- 퍼센티지
insert into percentage(created_date, last_modified_date, is_active, tone_id, percentage, self_consulting_result_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 6, 70, 1);
insert into percentage(created_date, last_modified_date, is_active, tone_id, percentage, self_consulting_result_id) values ('2022-07-10 22:20:00', '2022-07-10 22:20:00', 1, 5, 30, 1);
insert into percentage(created_date, last_modified_date, is_active, tone_id, percentage, self_consulting_result_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 5, 60, 2);
insert into percentage(created_date, last_modified_date, is_active, tone_id, percentage, self_consulting_result_id) values ('2022-07-30 22:20:00', '2022-07-30 22:20:00', 1, 6, 40, 2);

-- 리뷰
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-15 16:30:00', '2022-07-15 16:30:00', 1, '연예인들이 그렇게 솜상진 컨설턴트님만 찾는 이유를 알겠어요! 퍼스널 컬러를 하나 알았다고 이렇게 예뻐질 수 있나요? 다이어트보다 효과가 좋아요!', 5, 1, 1, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-23 13:00:00', '2022-07-23 13:00:00', 1, '첫 컨설팅과 비슷한 결과가 나왔어요! 두번이나 같은 결과가 나오니까 이제 믿을 수 있을 것 같아요!', 4, 2, 2, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-08-01 20:20:00', '2022-08-01 20:20:00', 1, '경험삼아 해보기 좋은 진단이었습니다! 감사해요! ㅎㅎ', 3, 3, 3, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-11 22:00:00', '2022-07-11 22:00:00', 1, '여태 제가 웜톤인 줄 알고 살았는데, 쿨톤이었어요! 저의 톤체성을 찾아주신 한기철 컨설턴트님 너무 감사드려요! ', 4, 4, 4, 2);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-13 20:30:00', '2022-07-13 20:30:00', 1, '여태까지 제가 금발만 고집했었는데, 금발은 안 어울린다고 말씀하셔서 아쉽긴 하지만.. 정확한 진단 감사합니다!', 4, 1, 6, 3);

insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-23 11:30:00', '2022-07-23 11:30:00', 1, '상진님.. 진짜 상진님에게서 컨설팅 받은 뒤로 인생이 달라졌어요! 자신감이 생겼다니까요?', 5, 1, 8, 2);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-23 14:30:00', '2022-07-23 14:30:00', 1, '진짜 여러분… 진단 웨 안 바다,,? 상진님한테 꼭 받으세요!! 진짜 사람 인상이 달라지고 제2의 인생을 살게 된다니까요? ', 4, 1, 9, 3);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-23 16:30:00', '2022-07-23 16:30:00', 1, '저 여태껏 솔직히 겨울 다크인줄 알고 빨간 립스틱 바르고 다녔는데, 상진님한테 여름 라이트톤 진단받고 여리여리한 핑크색 립스틱 샀는데!! 진짜 너무 예뻐요!!! 진작 받을 걸 그랬어요!!!', 5, 1, 10, 4);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-23 18:30:00', '2022-07-23 18:30:00', 1, '아니 진짜 미쳤어요 동네 사람들 모두모두 상진 컨설턴트님에게 컨설팅 받으세요!! 컬러 진단뿐만 아니라 화장품 추천, 코디 추천, 헤어를 어떻게 스타일링하면 좋을지까지 다 알려주세요! 거의 내 스타일리스트, 코디네이터인줄..!', 4, 1, 11, 5);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 14:30:00', '2022-07-24 14:30:00', 1, '요즘 퍼스널 컬러라는 게 유행이라길래 재미삼아 한번 해봤는데 좋네요 ㅋㅋㅋ 컨설턴트님이 추천하신 색깔로 쇼핑 좀 하겠습니다~', 5, 1, 12, 6);

insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 15:30:00', '2022-07-24 15:30:00', 1, '여자친구의 추천으로 받아봤는데 많은 도움 되었습니다~ 다음엔 여자친구와 같이 2:1로 컨설팅 할 수 있는 서비스도 생기면 좋을 것 같아요!', 4, 1, 13, 7);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 16:30:00', '2022-07-24 16:30:00', 1, '취업을 위해서 증명사진을 찍으려고 하는데 뒷 배경을 제 퍼스널 컬러로 하고 싶어서 진단을 받아봤습니다! 좋은 결과 있으면 좋겠네요', 5, 1, 14, 8);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 17:30:00', '2022-07-24 17:30:00', 1, '제가 낯을 많이 가리는 편인데, 어색하지 않게 시간을 잘 이끌어 가주셔서 감사해요~! ', 4, 1, 15, 9);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 18:30:00', '2022-07-24 18:30:00', 1, '무료 진단 쿠폰이 생겨서 받아봤는데 색다른 경험이어서 매우 즐거웠습니다! 이전 후기 보니까 저도 진단받은 컬러로 증명사진 찍어봐야겠어요. 감사해요!', 5, 1, 16, 10);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-24 19:30:00', '2022-07-24 19:30:00', 1, '컨설턴트님~ 오늘 너무 즐거웠어요~ 다양한 꿀팁도 전수해주시고~! 최고입니다! 친구들도 퍼스널 컬러에 관심이 많은데 컨설턴트님 꼭 추천드려야겠어요!', 4, 1, 17, 11);

insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '제 퍼스널컬러도 찰떡같이 찾아주시고, 정말 친절하게 설명해주십니다. 감사합니다~', 3, 5, 18, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '컨설팅 시간이 오버되면서까지 궁금한 것들 자세히 안내받아서 정말 좋았습니다~~', 3, 6, 19, 2);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '진짜 하길 정말 잘한 것 같아요! 처음 생각했던 내 이미지와 직접 천을 대봤을 때의 이미지가 이렇게도 다를 수 있구나 깨달았습니다!!', 3, 7, 20, 3);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '제 퍼스널컬러에 맞춰 악세서리, 헤어스타일, 특히 화장품!! 설명 너무 잘 해주셔서 감사합니다~', 4, 8, 21, 4);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '컨설팅 받으면서 너무 친절하게 잘 설명해주시고 한시간 내내 너무 재미있었어요!', 4, 9, 22, 5);

insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '직접 메이크업을 받지는 않았지만 꼭 받은 것 같은 이 느낌은 뭐죠!?? 그동안 제 톤이 무엇인지도 모르고 무작정 화장했는데 궁금증이 해결되어 너무 홀가분합니다~', 4, 10, 23, 6);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '퍼스널 컬러 진단받으면 헤어 컬러도 달라진다고 해서 염색 앞두고 했는데 진짜 좋은 시간이었습니다.', 4, 11, 24, 7);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '너무나도 신기하고 재미있는 나의 퍼스널컬러 찾기 시간이었습니다.', 4, 12, 25, 8);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '컨설턴트님이 꼼꼼하고 세심하게 상담해 주셔서 엄청 놀랐습니다~ 좋은 시간이었어요 감사합니다~~', 4, 13, 26, 9);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '저는 여태 퍼스널 컬러와 안 어울리는 립을 사용하고 있었네요 컨설턴트님 덕분에 알게 되었습니다! 제 퍼스널 컬러에 맞는 립도 추천받고 너무 유익한 시간이었습니다.', 4, 14, 27, 10);

insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '퍼스널컬러 컨설팅이 비용이 비싸 몇 년 동안 고민만 했었는데 이렇게 좋은 가격에 디테일한 컨설팅을 집에서 편하게 받을 수 있어 좋았어요!', 3, 15, 28, 11);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '퍼스널컬러 진단도 잘 해주시고 화장품 추천도 해주셔서 좋았어요!! 천 대봤을때 확 달라지는 게 느껴져서 신기하기도 했습니다. 진행 매끄럽게 잘 해주시고 앞으로 진단해주신 컬러대로 메이크업 하려고요!', 3, 16, 29, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '평소 긴간민가한 저만의 화장법으로 메이크업을 하고 다녔는데 제게 맞지 않는다는 느낌은 항상 가지고 있었는데, 오늘 제대로 알고 가서 너무 좋습니다~', 3, 17, 30, 2);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values ('2022-07-27 11:30:00', '2022-07-27 11:30:00', 1, '정말 너무 저렴한 가격에 제 퍼스널 컬러를 찾을 수 있었습니다 도움 주신 컨설터느님 정말 감사합니다~', 4, 18, 31, 3);