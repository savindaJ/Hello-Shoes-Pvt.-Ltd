package lk.ijse.helloshoespvtapi.entity;

import jakarta.persistence.*;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Time;
import java.sql.Timestamp;
import java.util.List;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Data
@Entity
@AllArgsConstructor
@NoArgsConstructor
public class Branch {
    @Id
    private String branchId;
    @Column(unique = true)
    private String branchName;
    private String branchContact;
    private String branchManager;
    private Address address;
    private Integer noOfEmployees;
    @CreationTimestamp
    private Timestamp createdDate;

    @OneToMany(mappedBy = "branch", cascade = CascadeType.ALL)
    private List<Employee> employees;
}
