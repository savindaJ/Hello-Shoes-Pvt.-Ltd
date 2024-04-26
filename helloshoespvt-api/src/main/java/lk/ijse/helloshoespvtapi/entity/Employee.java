package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.enums.Gender;
import lk.ijse.helloshoespvtapi.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.util.Date;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Entity
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Employee {
    @Id
    private String empId;
    private String empName;
    @Enumerated(EnumType.STRING)
    private Gender gender;
    private String emergencyContact;
    private String EmergencyInfo;
    @Enumerated(EnumType.STRING)
    private Role role;
    private String profilePic;
    private String status;
    @Column(unique = true)
    private String email;
    private String contact;
    private Boolean isActive;
    private String designation;
    private Date dob;
    private Address address;
    @CreationTimestamp
    private Timestamp regDate;

    @OneToOne(mappedBy = "employee")
    private User user;

    @OneToOne
    @JoinColumn(name = "branch_id", referencedColumnName = "branchId", insertable = false, updatable = false)
    private Branch branch;
}
