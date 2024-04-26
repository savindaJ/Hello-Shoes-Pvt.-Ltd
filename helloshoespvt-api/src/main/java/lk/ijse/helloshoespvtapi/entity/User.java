package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Entity
@Data
@Builder
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
}
