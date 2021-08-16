package com.ssafy.closer.model.service;

import com.sun.istack.NotNull;
import com.sun.istack.Nullable;
import io.jsonwebtoken.*;
import lombok.extern.slf4j.Slf4j;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import javax.crypto.spec.SecretKeySpec;
import java.nio.charset.StandardCharsets;
import java.security.Key;
import java.util.Calendar;
import java.util.Date;
import java.util.GregorianCalendar;
import java.util.Map;

@Service
@Slf4j
public class JwtService {

    private static final Logger logger = LoggerFactory.getLogger(JwtService.class);

    @Value("${jwt.salt}")
    private String salt;

    @Value("${jwt.expmin}")
    private Long expireMin;

    /**
     * 로그인 성공시 사용자 정보를 기반으로 JWTToken을 생성해서 반환.
     *
     * @param userId
     * @return
     */
    public String create(final String userId) {
        logger.debug("JWT token create start");

        // 1. JWT토큰을 만들어줄 빌더를 선언.
        final JwtBuilder builder = Jwts.builder();

        // JWT Token = Header + PayLoad + Signature
        // 2. Header 설정
        builder.setHeaderParam("typ", "JWT"); // 토큰 타입으로 고정 값

        // 3. Payload 설정 - claim 정보 포함
        builder.claim("user_id", userId); // 토큰 payload에 유저 아이디만 넣는다.

        // 4. Signature - Secret Key를 이용해 암호화한다
        builder.signWith(SignatureAlgorithm.HS256, salt.getBytes());

        // 5. 직렬화처리
        final String jwt = builder.compact();
        logger.debug("토큰 생성 완료 - " + jwt);
        return jwt;
    }

    public String chatcreate(final String userId) {
        return createToken(userId,null,null);
    }


    /**
     * 전달받은 토큰이 제대로 생성된건지 확인하고 문제가 있다면 예외발생
     *
     * @param jwt
     */
    public void checkValid(final String jwt) {
        System.out.println("JwtService : 토큰 점검 / " + jwt);
        Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
    }

    /**
     * jwt 토큰을 분석해서 필요한 정보를 반환
     *
     * @param jwt
     * @return
     */
    public Map<String, Object> get(final String jwt) {
        Jws<Claims> claims = null;
        try {
            claims = Jwts.parser().setSigningKey(salt.getBytes()).parseClaimsJws(jwt);
        } catch (final Exception e) {
            throw new RuntimeException();
        }

        System.out.println("JwtService : claims / " + claims);
        return claims.getBody();
    }

    ///////////////////////////////////////////////////////////////////////
    @NotNull
    public static String createToken(
            @NotNull String userId, @Nullable Date expiresAt, @Nullable Date issuedAt) {
        String apiSecret = "khjmr5fft6getdd9a4ww9c7y4f5pgmuq436sqrv9hjcn6ehsssxa5uj4x8229w5r";
        Key signingKey =
                new SecretKeySpec(
                        apiSecret.getBytes(StandardCharsets.UTF_8), SignatureAlgorithm.HS256.getJcaName());
        if (issuedAt == null) {
            GregorianCalendar calendar = new GregorianCalendar();
            calendar.add(Calendar.SECOND, -5);
            issuedAt = calendar.getTime();
        }
        System.out.println("create inside");
        return Jwts.builder()
                .claim("user_id", userId)
                .signWith(SignatureAlgorithm.HS256, signingKey)
                .compact();
    }


}
