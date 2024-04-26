package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.OneToOne;
import lk.ijse.helloshoespvtapi.embedded.EmployeeAddress;
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
    private Gender gender;
    private String emergencyContact;
    private String EmergencyInfo;
    private Role role;
    private String profilePic;
    private String status;
    @Column(unique = true)
    private String email;
    private String contact;
    private Boolean isActive;
    private String designation;
    private Date dob;
    private EmployeeAddress employeeAddress;
    @CreationTimestamp
    private Timestamp regDate;

    @OneToOne(mappedBy = "employee")
    private User user;
}
