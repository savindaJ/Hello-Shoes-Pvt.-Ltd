package lk.ijse.helloshoespvtapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.Column;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.enums.Gender;
import lk.ijse.helloshoespvtapi.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;

/**
 * @author : savindaJ
 * @date : 4/28/2024
 * @since : 0.1.0
 **/
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class CustomerDTO {
    private String userEmail;
    private String customerId;
    private String customerName;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Gender gender;
    private Integer totalPoints;
    private String contact;
    private String email;
    private Date recentPurchaseDate;
    private Address address;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Level level;
    private Date dob;
}
