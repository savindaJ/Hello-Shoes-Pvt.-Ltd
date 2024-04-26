package lk.ijse.helloshoespvtapi.embedded;

import jakarta.persistence.Embeddable;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : savindaJ
 * @date : 4/26/2024
 * @since : 0.1.0
 **/
@Data
@Embeddable
@AllArgsConstructor
@NoArgsConstructor
public class Contact {
    private String mobile;
    private String land;
}
