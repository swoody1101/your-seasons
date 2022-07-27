-- 고객
insert into customer(email, password, name, birth, nickname, contact, is_active) values ('ssafy12@naver.com', '1234', '김싸피', now(), '치당', '010-1111-1111', 1);
insert into customer(email, password, name, birth, nickname, contact, is_active) values ('hello99@naver.com', 'hi0000', '박인사', now(), '봉쥬르', '010-2222-2222', 1);
insert into customer(email, password, name, birth, nickname, contact, is_active) values ('ansi@ssafy.com', 'ansi1212', '안승진', now(), 'anveloper', '010-9999-9999', 1);

-- 자격증
insert into license(name, is_active) values ('컬러리스트산업기사', 1);
insert into license(name, is_active) values ('컬러리스트기사', 1);
insert into license(name, is_active) values ('NPO 국제 퍼스널컬러', 1);
insert into license(name, is_active) values ('NCNS 퍼스널컬러', 1);
insert into license(name, is_active) values ('퍼스널컬러코디네이터', 1);

-- 컨설턴트
insert into consultant(email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_file, license_id, license_number, is_active) values ('bestcon@gmail.com', '1234', '이컨설', now(), '베스트컨설턴트', '010-3333-3333', '안녕하세요, 인생 퍼스널 컬러를 찾아드릴게요!', '50,000', 0.0, 0, '', 1, '1234', 1);
insert into consultant(email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_file, license_id, license_number, is_active) values ('anjolryeo@gmail.com', 'an0000', '안지용', now(), '안졸리나졸리', '010-4444-4444', 'MZ 킬러 안졸리나 졸리입니다!', '40,000', 3.8, 1, '', 1, '5678', 1);

-- 휴무일
insert into closed_day(date, is_active, consultant_id) values ('2022-07-21', 1, 1);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-22', 1, 1);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-23', 1, 1);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-24', 1, 1);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-06', 1, 2);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-13', 1, 2);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-20', 1, 2);
insert into closed_day(date, is_active, consultant_id) values ('2022-07-27', 1, 2);

-- 예약
insert into reservation(date, time, request, is_active, customer_id, consultant_id) values ('2022-07-20', '18:00:00', '', 1, 1, 1);
insert into reservation(date, time, request, is_active, customer_id, consultant_id) values ('2022-07-20', '17:00:00', '웨딩 메이크업 받기 위한 퍼스널 컬러 진단 희망합니다.', 1, 2, 1);
insert into reservation(date, time, request, is_active, customer_id, consultant_id) values ('2022-08-31', '15:00:00', '잘 부탁드려요~', 1, 2, 2);
insert into reservation(date, time, request, is_active, customer_id, consultant_id) values ('2022-08-01', '18:00:00', '퍼스널 컬러 너무 궁금해요ㅜ', 1, 3, 2);

-- 컬러셋
insert into color_set(is_active) values (1); -- 봄웜
insert into color_set(is_active) values (1); -- 여름쿨
insert into color_set(is_active) values (1); -- 가을웜
insert into color_set(is_active) values (1); -- 겨울쿨

-- 톤
insert into tone(name, is_active) values ('봄웜', 1);
insert into tone(name, is_active) values ('여름쿨', 1);
insert into tone(name, is_active) values ('가을웜', 1);
insert into tone(name, is_active) values ('겨울쿨', 1);

-- 컬러
insert into color(hex, is_active, tone_id, color_set_id) values ('ffe4e1', 1, 1, 1); -- 봄웜
insert into color(hex, is_active, tone_id, color_set_id) values ('faebd7', 1, 1, 1); -- 봄웜
insert into color(hex, is_active, tone_id, color_set_id) values ('cbbeb5', 1, 1, 1); -- 봄웜
insert into color(hex, is_active, tone_id, color_set_id) values ('ff8e7f', 1, 1, 1); -- 가을웜
insert into color(hex, is_active, tone_id, color_set_id) values ('ffcb6b', 1, 2, 2); -- 여름쿨
insert into color(hex, is_active, tone_id, color_set_id) values ('89a5ea', 1, 2, 2); -- 여름쿨
insert into color(hex, is_active, tone_id, color_set_id) values ('59227c', 1, 2, 2); -- 겨울쿨
insert into color(hex, is_active, tone_id, color_set_id) values ('800000', 1, 4, 4); -- 겨울쿨

-- 베스트컬러셋
insert into best_color_set(is_active, color_set_id) values (1, 1);

-- 워스트컬러셋
insert into worst_color_set(is_active, color_set_id) values (1, 2);

-- 진단결과
insert into test_result(consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values ('', 1, 1, 1, 1);

-- 전문가진단
insert into consulting(consulting_comment, has_review, is_active, customer_id, consultant_id, test_result_id) values ('봄 브라이트 톤으로 화사한 컬러를 선택하시고, 레이스가 잘 어울리십니다.', 0, 1, 1, 1, 1);
