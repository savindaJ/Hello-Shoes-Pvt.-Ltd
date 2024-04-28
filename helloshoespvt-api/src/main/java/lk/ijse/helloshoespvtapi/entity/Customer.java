package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.enums.Gender;
import lk.ijse.helloshoespvtapi.enums.Level;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Date;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Customer {
    @Id
    private String customerId;
    private String customerName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    @CreationTimestamp
    private Timestamp registeredDate;
    private Integer totalPoints;
    @Column(unique = true)
    private String contact;
    private String email;
    private Date recentPurchaseDate;
    private Address address;
    @Enumerated(EnumType.STRING)
    private Level level;
    private Date dob;

    @ManyToOne(fetch = FetchType.LAZY)
    private User user;

    @OneToMany(mappedBy = "customer", cascade = CascadeType.ALL,fetch = FetchType.LAZY)
    private List<Sale> sales;
}
