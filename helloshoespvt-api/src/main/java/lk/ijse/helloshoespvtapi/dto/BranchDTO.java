package lk.ijse.helloshoespvtapi.dto;

import jakarta.persistence.Column;
import jakarta.persistence.Id;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class BranchDTO {
    private String branchId;
    private String branchName;
    private String branchContact;
    private Address address;
    private Date openDate;
}
