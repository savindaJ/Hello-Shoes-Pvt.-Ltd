package lk.ijse.helloshoespvtapi.service;

/**
 * @author : savindaJ
 * @date : 5/20/2024
 * @since : 0.1.0
 **/
public interface EmailService {
    void sendSimpleMessage(String to, String subject, String text);
}
