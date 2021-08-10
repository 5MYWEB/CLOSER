package com.ssafy.closer.model.service;

import com.sun.xml.messaging.saaj.packaging.mime.MessagingException;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;
import org.springframework.ws.mime.MimeMessage;

import java.io.File;

@Service
public class MailServiceImpl implements MailService{
    // org.springframework.mail.javamail.JavaMailSender
    private JavaMailSender javaMailSender;

    public void setJavaMailSender(JavaMailSender javaMailSender) {
        this.javaMailSender = javaMailSender;
    }

    @Override
    public boolean send(String subject, String text, String from, String to, String filePath) {
        // javax.mail.internet.MimeMessage
        MimeMessage message = (MimeMessage) javaMailSender.createMimeMessage();

        try {
            // org.springframework.mail.javamail.MimeMessageHelper
            MimeMessageHelper helper = new MimeMessageHelper((javax.mail.internet.MimeMessage) message, true, "UTF-8");
            helper.setSubject(subject);
            helper.setText(text, true);
            helper.setFrom(from);
            helper.setTo(to);

            // 첨부 파일 처리
            if (filePath != null) {
                File file = new File(filePath);
                if (file.exists()) {
                    helper.addAttachment(file.getName(), new File(filePath));
                }
            }

            javaMailSender.send((javax.mail.internet.MimeMessage) message);
            return true;
        } catch (javax.mail.MessagingException e) {
            e.printStackTrace();
        }

        return false;
    }
}
