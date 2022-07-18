package com.ssafy.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.ssafy.util.JWTUtil;

@RestController
@RequestMapping("/user")
public class ApiUserController {
	
	private static ArrayList<Member> instance;

	public static ArrayList<Member> getInstance() {
		if (instance == null) {
			instance = new ArrayList<>();
			System.out.println("??");
		}
		return instance;
	}

	@Autowired
	private JWTUtil jwtUtil;

	@PostMapping("/signup")
	public ResponseEntity<String> signUp(@RequestBody Member member) {
		HttpStatus status = HttpStatus.OK;
		ArrayList<Member> tmp = getInstance();

		tmp.add(member);// DB 대신

		for (Member m : tmp)
			System.out.println(m.toString());
		return new ResponseEntity<String>("test", status);
	}

	@PostMapping("/login")
	public ResponseEntity<Map<String, Object>> login(@RequestBody Member member) {
		HttpStatus status = HttpStatus.OK;
		HashMap<String, Object> result = new HashMap<>();
		ArrayList<Member> tmp = getInstance(); // DB 대신..
		for (Member m : tmp) { // 임시 데이터로 송신 여부만 확인...
			if (m.userId.equals(member.userId))
				if (m.password.equals(member.password)) {
					try { // 입력된 ID랑 PW가 맞을 때 토큰 만들어서 반환
						result.put("token", jwtUtil.createToken("userId", member.getUserId()));
					} catch (Exception e) {
//						status = HttpStatus.ACCEPTED;
					}
					return new ResponseEntity<Map<String, Object>>(result, status);
				}
		}

		status = HttpStatus.CONFLICT;
		return new ResponseEntity<Map<String, Object>>(result, status);
	}

	static class Member { // test용 class
		private String userId;
		private String password;
		private String nickname;
		private String email;

		public Member() {

		}

		public Member(String userId, String password, String nickname, String email) {
			this.userId = userId;
			this.password = password;
			this.nickname = nickname;
			this.email = email;
		}

		public String getUserId() {
			return userId;
		}

		public void setUserId(String userId) {
			this.userId = userId;
		}

		public String getPassword() {
			return password;
		}

		public void setPassword(String password) {
			this.password = password;
		}

		public String getNickname() {
			return nickname;
		}

		public void setNickname(String nickname) {
			this.nickname = nickname;
		}

		public String getEmail() {
			return email;
		}

		public void setEmail(String email) {
			this.email = email;
		}

		@Override
		public String toString() {
			return "Member [userId=" + userId + ", password=" + password + ", nickname=" + nickname + ", email=" + email
					+ "]";
		}

	}

}
