package lk.ijse.helloshoespvtapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.enums.Gender;
import lk.ijse.helloshoespvtapi.enums.Role;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Date;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeDTO {
    private String empId;
    private String empName;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Gender gender;
    private String emergencyContact;
    private String EmergencyInfo;
    private String status;
    private String email;
    private String contact;
    private String designation;
    private Date dob;
    private Address address;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private Role role;
    private String profilePic;
    private Boolean isActive;
    private String branchId;
    private String branchName;
}
