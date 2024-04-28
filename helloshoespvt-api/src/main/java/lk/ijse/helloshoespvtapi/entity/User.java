package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.enums.Role;
import lombok.*;

import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class User {
    @Id
    private String username;
    private String password;
    @Enumerated(EnumType.STRING)
    private Role role;

    @OneToOne
    @JoinColumn(name = "empId", referencedColumnName = "empId")
    private Employee employee;

    @OneToMany(mappedBy = "user")
    private List<Customer> customers;

    @OneToMany(mappedBy = "user", cascade = CascadeType.ALL)
    private List<Sale> sales;

    public User(String email, String password, Role role) {
        this.username = email;
        this.password = password;
        this.role = role;
    }
}
