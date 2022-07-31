-- 고객
insert into customer(created_date, last_modified_date, email, password, name, birth, nickname, contact, is_active) values (now(), now(), 'ssafy12@naver.com', '$2a$10$Wo4tufbWPSbs4//LlQYg4OZJTxGK0D2NX6Ys6OwWvNziIMVwRLRmi', '김싸피', '1994-08-31', '치당', '010-1111-1111', 1); -- 비밀번호 1234
insert into customer(created_date, last_modified_date, email, password, name, birth, nickname, contact, is_active) values (now(), now(), 'hello99@naver.com', '$2a$10$kjUmmqHBaGSehVcsy6Ikmu99gIj3P0CnhaOBrZ6vcSmL0.O50HegG', '박인사', '1999-02-05', '봉쥬르', '010-2222-2222', 1); -- 비밀번호 hi1234
insert into customer(created_date, last_modified_date, email, password, name, birth, nickname, contact, is_active) values (now(), now(), 'ansi@ssafy.com', '$2a$10$9Hf028.NDOlrPslwfQwaT.4rRWWLUvbNNLSEIMUFfGi.h7qbftAyq', '안승진', '1992-07-22', 'anveloper', '010-9999-9999', 1);  -- 비밀번호 ansi1212

-- 자격증
insert into license(created_date, last_modified_date, name, is_active) values (now(), now(), '컬러리스트산업기사', 1);
insert into license(created_date, last_modified_date, name, is_active) values (now(), now(), '컬러리스트기사', 1);
insert into license(created_date, last_modified_date, name, is_active) values (now(), now(), 'NPO 국제 퍼스널컬러', 1);
insert into license(created_date, last_modified_date, name, is_active) values (now(), now(), 'NCNS 퍼스널컬러', 1);
insert into license(created_date, last_modified_date, name, is_active) values (now(), now(), '퍼스널컬러코디네이터', 1);

-- 컨설턴트
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'bestcon@gmail.com', '$2a$10$rgj2kAIxW60uphgR/rJRROVuuWJw6vJTERDFHQuQKWTcJu4KNvNmu', '이컨설', '1987-01-24', '베스트 컨설턴트', '010-4444-4444', '안녕하세요, 인생 퍼스널 컬러를 찾아드릴게요!', '50,000', 0.0, 0, '', 1, '1234', 1);  -- 비밀번호 1234
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'anjolryeo@gmail.com', '$2a$10$qyKQQEKVRiluruNO4wqU1.N/XvvrXi8ySYmhDj0eon.1rP18GgvGK', '안지용', '1994-08-30', '안졸리나 졸리', '010-5555-5555', 'MZ 킬러 안졸리나 졸리입니다!', '40,000', 3.8, 1, '', 1, '5678AW132', 1); -- 비밀번호 an0000

-- 휴무일
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-21', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-22', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-23', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-24', 1, 1);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-06', 1, 2);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-13', 1, 2);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-20', 1, 2);
insert into closed_day(created_date, last_modified_date, date, is_active, consultant_id) values (now(), now(), '2022-07-27', 1, 2);

-- 예약
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values (now(), now(), '2022-07-20', '18:00:00', '', 1, 1, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values (now(), now(), '2022-07-20', '17:00:00', '웨딩 메이크업 받기 위한 퍼스널 컬러 진단 희망합니다.', 1, 2, 1);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values (now(), now(), '2022-08-31', '15:00:00', '잘 부탁드려요~', 1, 2, 2);
insert into reservation(created_date, last_modified_date, date, time, request, is_active, customer_id, consultant_id) values (now(), now(), '2022-08-01', '18:00:00', '퍼스널 컬러 너무 궁금해요ㅜ', 1, 3, 2);

-- 컬러셋
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 봄웜
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 여름쿨
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 가을웜
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 겨울쿨

-- 톤
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '봄웜', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '여름쿨', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '가을웜', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '겨울쿨', 1);

-- 컬러
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), 'ffe4e1', 1, 1, 1); -- 봄웜
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), 'faebd7', 1, 1, 1); -- 봄웜
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), 'cbbeb5', 1, 1, 1); -- 봄웜
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), 'ff8e7f', 1, 1, 1); -- 봄웜
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), 'ffcb6b', 1, 2, 2); -- 여름쿨
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), '89a5ea', 1, 2, 2); -- 여름쿨
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), '59227c', 1, 2, 2); -- 여름쿨
insert into color(created_date, last_modified_date, hex, is_active, tone_id, color_set_id) values (now(), now(), '800000', 1, 4, 4); -- 겨울쿨

-- 베스트컬러셋
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values (now(), now(), 1, 1);

-- 워스트컬러셋
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values (now(), now(), 1, 2);

-- 진단결과
insert into test_result(created_date, last_modified_date, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '', 1, 1, 1, 1);

-- 전문가진단
insert into consulting(created_date, last_modified_date, consulting_comment, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), '봄 브라이트 톤으로 화사한 컬러를 선택하시고, 레이스가 잘 어울리십니다.', 0, 1, 1, 1, 1);
