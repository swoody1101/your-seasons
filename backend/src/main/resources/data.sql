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
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'bestcon@gmail.com', '$2a$10$rgj2kAIxW60uphgR/rJRROVuuWJw6vJTERDFHQuQKWTcJu4KNvNmu', '이컨설', '1987-01-24', '베스트 컨설턴트', '010-4444-4444', '안녕하세요, 인생 퍼스널 컬러를 찾아드릴게요!', 50000, 3.25, 4, 6, '', 1, '1234', 1);  -- 비밀번호 1234
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'anjolryeo@gmail.com', '$2a$10$qyKQQEKVRiluruNO4wqU1.N/XvvrXi8ySYmhDj0eon.1rP18GgvGK', '안지용', '1994-08-30', '안졸리나 졸리', '010-5555-5555', 'MZ 킬러 안졸리나 졸리입니다!', 40000, 0.0, 0, 2, '', 1, '5678AW132', 1); -- 비밀번호 an0000
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'consultant@gmail.com', '$2a$10$zAp1/9nXSHE7/T/5u/uY4OR/qwKdpALgp68g8CnkpJy2NKaoxE8QO', '김컨설', '1990-01-01', '히사시부리', '010-1111-1111', '새로 등록한 컨설턴트입니다!', 80000, 0.0, 0, 0, '', 1, 'AT5AW132', 1); -- 비밀번호 password
insert into consultant(created_date, last_modified_date, email, password, name, birth, nickname, contact, introduction, cost, star_average, review_count, consulting_count, consulting_file, license_id, license_number, is_active) values (now(), now(), 'apple@gmail.com', '$2a$10$J51/ObConUCCN2wqgR9ciu4CUPzTnaXMZqYA2vhXsOXl9jbc7ltdS', '김사과', '1993-03-03', '나는사과가조아', '010-4545-4545', '사과를 좋아하는 나는 사과톤!', 100000, 5.0, 1, 1, '', 1, '0000SEFS1', 1); -- 비밀번호 apple

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

-- 톤
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '봄 브라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '봄 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '봄 라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '여름 라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '여름 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '여름 소프트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '가을 소프트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '가을 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '가을 다크', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '겨울 브라이트', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '겨울 트루', 1);
insert into tone(created_date, last_modified_date, name, is_active) values (now(), now(), '겨울 다크', 1);

-- 컬러
-- 컬러
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FDF0B1', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F9C5C7', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B8D66A', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F85C49', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F44C2C', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F17E8B', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#EE3A50', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F16F8F', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#53C8E5', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#CB1F5F', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#0052C6', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F4A518', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3B8E45', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8063CD', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A8DDE1', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C4B8B9', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#368BEA', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FF9E1C', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D36CAE', 1, 1); -- 봄 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FEE9CF', 1, 1); -- 봄 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FFE4D1', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FCD5C3', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FCD2A0', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D8A07B', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#BCB5A3', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C2D558', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#88C76E', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3A7C3F', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#0E5E41', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#858D38', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F99686', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F76452', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#EF6260', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F13D58', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#EA2336', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#85A6EB', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#607FD9', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B488BD', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#7659AB', 1, 2); -- 봄 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#592A86', 1, 2); -- 봄 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FAE6DB', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F7BCAE', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FDA59B', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FBA2B8', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F2578F', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F9A688', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F4734B', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F1725F', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F03E3C', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F36072', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FCD667', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FDC66C', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FCA845', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B9D983', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#6DB359', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#88BEE4', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5B9ED5', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#71BCDC', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9089D7', 1, 3); -- 봄 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#4564BE', 1, 3); -- 봄 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#E5E3D7', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C1BFB3', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#847D77', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B1B7B7', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#7E959D', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#927879', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5A4D4D', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F5A8BA', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FD80A8', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#DD5885', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#90ACDB', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#38619F', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#155B8F', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1BA685', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#207E76', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9783C9', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#554880', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#84CAEC', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#6AB8E6', 1, 4); -- 여름 라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5378BF', 1, 4); -- 여름 라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#DCDACD', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D1CCC6', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A0A797', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#7F8177', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5B5851', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A4B1B7', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#798A9C', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#4F8794', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2E6E7A', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#42474D', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FFC3D7', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D68AA8', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B75C87', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#852F54', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#4B497B', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#64AACB', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#538DB3', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#346EA0', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9EA7D2', 1, 5); -- 여름 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#7C7FB2', 1, 5); -- 여름 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#DDDECC', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C7C5B9', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9C8F89', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#513D3F', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#413F40', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F4B9BD', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C48C8F', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B38285', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8C475E', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8B475E', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8892B5', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#596178', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#54495A', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#60947D', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#37574C', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#79BCC5', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#527A92', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2F4553', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#E3D99E', 1, 6); -- 여름 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D8CB87', 1, 6); -- 여름 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#E0DDCC', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C5C0AA', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B5B196', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#99968D', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#66635C', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#DDAA7A', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#957A5E', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#705743', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A9A781', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#85936F', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C45657', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A6474B', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#862A37', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#17635F', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1C3F29', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8792C0', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#55608E', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#184A73', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2E3352', 1, 7); -- 가을 소프트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3C4446', 1, 7); -- 가을 소프트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#E2D1B7', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D0C5B1', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#878974', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#AF9270', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#4B453E', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D7957B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A86354', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#854543', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#694E31', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#45282C', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D47E4B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B8463B', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D22E35', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#872F2E', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3B2027', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#6F5F2D', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1E3628', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#453852', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1C7385', 1, 8); -- 가을 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1A4653', 1, 8); -- 가을 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C5BEB6', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#CFBBA3', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D3A87B', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B88E56', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C3795E', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8E9D5A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5F663D', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2B3228', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2B6654', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1D3C37', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9B3E49', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#6F282E', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#4A2129', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#BD334A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#743435', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#392934', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1C3432', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#22405A', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#393027', 1, 9); -- 가을 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#252525', 1, 9); -- 가을 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#000000', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B9BFBD', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#151314', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2057A7', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1B305F', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#EC7CBE', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C64796', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#832A6A', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#602F67', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9B2849', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#52D4E1', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#B3E4DE', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D7D1ED', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3ED284', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1FA793', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#624D9A', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2F2F6D', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FDD2ED', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#857DC6', 1, 10); -- 겨울 브라이트
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5D95D0', 1, 10); -- 겨울 브라이트

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F4F3F8', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3B4346', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#0E0E0E', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2F2B5B', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#20418E', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F5D4DF', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#C7D5F0', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#A8E9EF', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FFC1E8', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#FE98DA', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#38C372', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#107B5D', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#116872', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F95C9D', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#D6384E', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#5E3579', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1D3049', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1C372E', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#562239', 1, 11); -- 겨울 트루
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#3A2230', 1, 11); -- 겨울 트루

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#F5F3F8', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#CE3257', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#E67EA1', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#8E3450', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#361F27', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9E2632', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#612429', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#321F23', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#1C6A98', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#144F63', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#9A67A0', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#542C51', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2A1D24', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#145A40', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#283025', 1, 12); -- 겨울 다크

insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#302221', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#2C2131', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#17383F', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#22508E', 1, 12); -- 겨울 다크
insert into color(created_date, last_modified_date, hex, is_active, tone_id) values (now(), now(), '#183B35', 1, 12); -- 겨울 다크

-- 컬러셋
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 봄웜
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 여름쿨
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 가을웜
insert into color_set(created_date, last_modified_date, is_active) values (now(), now(), 1); -- 겨울쿨

-- 컬러컬러셋
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values (now(), now(), 1, 1, 1);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values (now(), now(), 1, 2, 2);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values (now(), now(), 1, 3, 3);
insert into color_color_set(created_date, last_modified_date, is_active, color_id, color_set_id) values (now(), now(), 1, 1, 4);

-- 베스트컬러셋
insert into best_color_set(created_date, last_modified_date, is_active, color_set_id) values (now(), now(), 1, 1);

-- 워스트컬러셋
insert into worst_color_set(created_date, last_modified_date, is_active, color_set_id) values (now(), now(), 1, 2);

-- 진단결과
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '봄 브라이트 톤으로 화사한 컬러를 선택하시고, 레이스가 잘 어울리십니다.', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '여름 쿨톤과 봄 웜톤의 중간 정도라고 할 수 있습니다. 여름 쿨톤쪽에 조금 더 가깝지만 봄 웜톤 화장품을 사용하셔도 잘 어울리실 겁니다.', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '보색은 피하시는 것이 좋을 것 같습니다.', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '무채색보다는 비비드한 컬러의 옷을 입으시는 것을 추천드립니다.', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '고객님! 결혼 축하드리고! 치크와 립은 꼭 연어색으로 하는 거 잊지 마세요!', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '증명사진 찍으실 때 연보라색 배경으로 찍으시면 인생사진 쌉가능!', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '골드보다는 실버 느낌의 볼드한 액세서리가 잘 어울리세요! 진주도 잘 어울리시구요!', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '맥 칠리보다는 루비우가 훨씬 더 고객님께 잘 받을 거에요', '', 1, 1, 1, 1);
insert into test_result(created_date, last_modified_date, consulting_comment, consulting_file, is_active, best_color_set_id, worst_color_set_id, tone_id) values (now(), now(), '저는 사과톤이지만 고객님은 피치와 살구가 생각나는 봄 라이트톤이에요!', '', 1, 1, 1, 1);

-- 컨설팅
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 1, 0, 1, 1, 1);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 1, 0, 1, 1, 2);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 1, 0, 1, 1, 3);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 1, 0, 1, 1, 4);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 0, 0, 1, 1, 5);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'bestcon-gmail-com', 0, 0, 1, 1, 6);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'anjolryeo-gmail-com', 0, 0, 2, 2, 7);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'anjolryeo-gmail-com', 0, 0, 2, 2, 8);
insert into consulting(created_date, last_modified_date, session_id, has_review, is_active, customer_id, consultant_id, test_result_id) values (now(), now(), 'apple-gmail-com', 1, 0, 3, 4, 9);

-- 리뷰
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values (now(), now(), 1, '좋은 것  같기도...', 3, 1, 1, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values (now(), now(), 1, '이런 컨설팅은 태어나서 처음에요! 너무너무 좋으신 컨님! 강추해요!', 5, 1, 2, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values (now(), now(), 1, '저는 여태 겨울비비드인줄 알고 살았는데 가을 뮤트라니요? 이럴 수가 있나요? 약간 혼란스럽네요..', 1, 1, 3, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values (now(), now(), 1, '가을 뮤트라고 생각하고 있었는데 가을 뮤트라고 진단 받았어요! 화장품 새로 안사도 돼서 좋네요', 4, 1, 4, 1);
insert into review(created_date, last_modified_date, is_active, comment, star, consultant_id, consulting_id, customer_id) values (now(), now(), 1, '봄라이트하면 임윤아, 아이유 아닌가요? 제가 윤아와 아이유와 견준다니.. 후훗', 5, 4, 9, 3);