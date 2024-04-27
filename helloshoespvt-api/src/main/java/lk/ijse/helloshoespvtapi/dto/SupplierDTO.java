package lk.ijse.helloshoespvtapi.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import lk.ijse.helloshoespvtapi.embedded.Address;
import lk.ijse.helloshoespvtapi.embedded.Contact;
import lk.ijse.helloshoespvtapi.enums.SupplierCategory;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

/**
 * @author : savindaJ
 * @date : 4/27/2024
 * @since : 0.1.0
 **/
@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupplierDTO {
    private String supplierCode;
    private String supplierName;
    @JsonFormat(shape = JsonFormat.Shape.STRING)
    private SupplierCategory supplierCategory;
    private Contact contact;
    private String email;
    private Boolean isActive;
    private Address address;
    private String originCountry;
}
