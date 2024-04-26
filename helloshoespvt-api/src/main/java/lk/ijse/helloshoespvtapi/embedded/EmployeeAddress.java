package lk.ijse.helloshoespvtapi.embedded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.io.Serializable;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class EmployeeAddress implements Serializable {
    private String lane;
    private String mainCountry;
    private String mainCity;
    private String mainState;
    private String postalCode;
}
